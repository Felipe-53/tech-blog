## Conteinerizando o ambiente de desenvolvimento com Docker - parte 2

_Nessa segunda parte, mostro na prática como conteinerizar o ambiente de desenvolvimento de uma aplicação simples que usa um banco de dados Postgres, Node.js no backend, frontend em React e Nginx como reverse-proxy_

## A aplicação e a stack utilizada

A aplicação em questão é bastante simples, para não desviar a atenção do foco principal. Trata-se de uma aplicação web que exibe um catálogo de produtos com nome, preço e descrição.

![App](https://tech-blog-assets.s3.sa-east-1.amazonaws.com/app.png)

Os dados ficam salvos num banco de dados Postgres e são acessados através de uma api feita em Node.js. O framework usado foi o [Fastify](https://www.fastify.io/) juntamente com o excelente ORM [Prisma](https://www.prisma.io/).

O frontend foi feito usando React no contexto do framework [Next.js](https://nextjs.org/).

Você pode conferir o repositório do projeto [aqui](https://github.com/Felipe-53/dev-env-with-docker)

Para fazer a ponte entre o backend e o frontend, aqui estamos usando Nginx como reverse-proxy. Seria possível também configurar o Next.js para fazer proxy das requisições destinadas ao backend. Porém, como é bastante desejável usar Nginx em produção, acho interessante usar também em desenvolvimento. Dessa forma, no mínimo, se ganha mais familiaridade com a ferramenta.

## Setup tradicional

Se não fôssemos usar containers, como já explicado na parte 1 desse artigo, precisaríamos ter instalados nas nossas máquinas, no mínimo:

- Node.js
- PostgreSQL
- Nginx

E todas essas dependências precisariam ser configuradas e inicializadas cuidadosamente para que o projeto funcionasse de forma correta.

O processo de conteinerização que vou apresentar em seguida pode parecer complicado à primeira vista. E de fato pode ser desnecessário se o projeto for muito simples ou se você está trabalhando sozinho. Porém eu teria me agradecido se tivesse feito isso com o projeto em que estou trabalhando atualmente, quando eu precisei trocar de máquina por um tempo enquanto a minha passava por manutenção. Mas sem mais demora, vamos ver como isso funciona.

## Conteinerização

Nosso projeto consistirá de quatro conteiners, conforme esquematizado na imagem abaixo:

![Diagrama](https://tech-blog-assets.s3.sa-east-1.amazonaws.com/schema.png)

Esses conteineres serão orquestrados usando o docker-compose, como será mostrado mais adiante. Mas antes disso, vejamos como construir as imagens de cada um desses conteiners.

### Estrutura do projeto

Nesse projeto, usei a seguinte estrutura:

```
├── backend
├── dev-env
└── frontend
```

Para fins de demonstração, os três diretórios estão sob um único controle de versão git. Na prática, é muito melhor que **cada projeto tenha seu próprio controle de versão**. Observe também que existe um diretório dedicado exclusivamente à construção do ambiente de desenvolvimento, o `dev-env`. Isso porque, de fato, toda lógica e instruções contidas nele não pertencem nem ao frontend nem ao backend, mas à orquestração do ambiente de desenvolvimento. É nessa pasta que viverá o arquivo `docker-compose.yaml` através do qual será feita a orquestração de todos os conteiners de uma maneira simples e prática. Vejamos construir as imagens para o frontend e backend.

## Dockerfile

Na raíz de ambos os projetos, criamos o arquivo dev.Dockerfile. O prefixo 'dev' serve para diferenciá-lo do Dockerfile de produção, que é diferente (não abordado nesse artigo, provavelmente no futuro escreverei a respeito).

Vamos ver como fica o Dockerfile do backend e a estrutura do projeto.

#### **Backend - folder structure**

```
├── dev.Dockerfile
├── package.json
├── package-lock.json
├── prisma
├── src
└── tsconfig.json
```

#### **Backend - dev.Dockerfile**

```Docker
FROM node:lts-alpine

WORKDIR /app

COPY ./prisma ./prisma

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

RUN npx prisma generate

EXPOSE 3500

# prisma studio
EXPOSE 5555

CMD ["npm", "run", "dev"]
```

A observação mais importante sobre esse arquivo é a de que não estamos copiando nessa imagem o código fonte do projeto. Isso porque a pasta que contém o código fonte `src` será montada no conteiner a partir da pasta `src` presente na nossa máquina.

Estamos falando de [Bind Mounts](https://docs.docker.com/storage/bind-mounts/), um recurso do Docker que permite montar em um container um diretório da nossa própria máquina, de forma que todas as mudanças que fazemos localmente ficam visíveis ao conteiner. É como se déssemos ao conteiner uma porta de acesso a um diretório local. E isso é perfeito para o ambiente de desenvolvimento, pois geralmente usamos ferramentas de _fast refresh_ para poder acompanhar em tempo real as mudanças feitas no código. A montagem é feita no momento da inicialização do container ou pode ser feita também no arquivo `docker-compose.yaml`, como mostraremos mais à frente.

Outra observação se refere a algumas linhas de código que têm o intuito de fazer o uso adequado do ORM Prisma. O comando `npx prisma generate` gera o código necessário para trabalhar com os _Models_ definidos no arquivo `schema.prisma`. Adicionalmente, expomos a `5555` para poder acessar o Prisma Studio, uma interface web que permite a visualização e edição dos dados do banco. Foge do escopo falar mais sobre Prisma, mas posso afirmar que foi a melhor experiência de desenvolvimento que tive com qualquer ORM.

#### **Frontend - folder structure**

```
├── dev.Dockerfile
├── next.config.js
├── next-env.d.ts
├── node_modules
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
├── src
├── styles
├── tailwind.config.js
└── tsconfig.json
```

#### **Frontend - dev.Dockerfile**

```Docker
FROM node:16-alpine

WORKDIR /app

COPY *.json ./
COPY *.js ./
COPY *.ts ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
```

O Dockerfile do frontend é ainda mais simples. Mais uma vez, o ponto de destaque é a omissão do fonte (contido na pasta `src`). A explicação é a mesma: essa pasta será montada no container para que possamos tirar vantagem do _fast refresh_ quando estivermos desenvolvendo.

### Banco de Dados e Nginx

#### Banco

A imagem do banco é a imagem oficial do Docker Hub. A única coisa necessária é configurar algumas variáveis de ambientes que determinam o nome do usuário, senha, banco padrão, etc. Como estamos falando de um ambiente de desenvolvimento, não é um problema deixá-las dentro do controle de versionamento.

#### Nginx

A imagem da Nginx tem o detalhe de precisar de um arquivo de configuração específico para o ambiente em questão. A ideia é direcionar todas as requisições prefixadas com `/api` para o backend e o resto para o frontend. Adicionalmente, no caso do frontend, é necessário estabelecer uma conexão Websocket, porque esse é mecanismo que possibilita o _fast refresh_. Basicamente, existe um servidor de desenvolvimento no project Next.js que observa mudanças nos arquivos. Quando há alguma alteração, o servidor envia ao browser essas mudanças via web socket.

Em suma, o arquivo de configuração nginx fica da seguinte forma:

```nginx
server {
  listen 5000;

  location / {
    proxy_pass http://frontend:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
  }

  location /api {
    proxy_pass http://api:3500;
  }
}
```

Outra observação a ser feita aqui é o uso de hostnames diferentes do tradicional `localhost`. Isso porque, como veremos em seguida, o Docker Compose cria um rede interna onde é atribuído a cada serviço o hostname que corresponde ao nome do mesmo.

### Docker Compose - orquestrando os containeres

O setup do ambiente de desenvolvimento encontra seu clímax e seu desfecho com o Docker Compose. Trata-se de uma ferramenta que serve para "amarrar" ou orquestrar conteiners de uma forma simples e prática. Tão simples, na verdade, que o único passo necessário é escrever um arquivo `.yaml` que descreve como os conteineres devem se comportar e interagir entre si.

Cada conteiner é definido como um serviço no arquivo, onde é possível especificar tudo que se define tradicionalmente com as opções do comando `docker run`. Aqui vamos nos concentrar nos seguintes pontos:

- Enrivonment Varibales
- Volumes
- Port Mapping
- Depencies

A melhor forma de abordar esses pontos é mostrar qual o papel deles dentro do projeto. Vamos comentar cada um dentro do contexto do arquivo em si, que segue abaixo:

```yaml
services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: database
    volumes:
      - db_data:/var/lib/postgresql/data

  api:
    depends_on:
      - db
    build:
      context: ../backend
      dockerfile: dev.Dockerfile
    image: dev-api
    env_file:
      - ../backend/.env
    volumes:
      - type: bind
        source: ../backend/src
        target: /app/src
    ports:
      - 3500:3500
      - 5555:5555 # enable prisma studio access

  frontend:
    depends_on:
      - api
    build:
      context: ../frontend
      dockerfile: dev.Dockerfile
    image: dev-frontend
    volumes:
      - type: bind
        source: ../frontend/src
        target: /app/src
      - type: bind
        source: ../frontend/public
        target: /app/public
      - type: bind
        source: ../frontend/styles
        target: /app/styles

  proxy:
    depends_on:
      - api
      - frontend
    build:
      context: ./
      dockerfile: proxy.Dockerfile
    image: dev-proxy
    ports:
      - 5000:5000
    logging:
      driver: none

volumes:
  db_data:
```

Ao todo, temos quatro serviços, como dito anteriormente.

#### db

A imagem do banco é construída a partir da imagem oficial do Postgres. Aqui definimos algumas variáveis de ambiente sob a chave `environment`. Essas variáveis são usadas para configurar o banco, de forma que possamos acessá-lo a partir da api.

Outro ponto a ser ressaltado é que o Docker Compose cria uma rede interna onde cada serviço ganha um hostname que corresponde ao seu nome, como já foi dito. O ORM prisma usado no backend se conecta ao banco através de URL de conexão. O formato geral desta url é o que segue:

```
postgresql://<USERNAME>:<PASSWORD>@<HOSTNAME>:<PORT>/<DATABASE>?schema=<SCHEMA>
```

No contexto do Docker Compose essa url fica, portanto, da seguinte forma:

```
postgresql://postgres:postgres@db:5432/database?schema=public
```

Por último, definimos um volume para persistir os dados escritos no banco sob a chave `volumes`. Note-se: por padrão os dados de um conteiner são efêmeros.**Docker Volumes** são usados para salvar na máquina hospedeira os dados escritos no conteiner. O que estamos usando aqui é o que se chama de **Named Volumes**. O destino dos dados na máquina hospedeira é determinado pelo Docker e pode ser acessado a partir do nome que damos ao volume, localizando-o com o comando `docker volume ls`. Os arquivos que estamos salvando aqui são os contidos no diretório `/var/lib/postgresql/data` - que é onde o container salva os dados do banco.

#### api

No serviço da api, especificamos sob a chave `build` qual imagem deve ser usada. Apontamos a imagem construída através do Dockerfile que escrevemos na sessão anterior.

O ponto a ser destacado nesse serviço é o Bind Mount feito da máquina local para o container. Como já explicado, é o que permite o fast refresh no contexto do desenvolvimento. Esse também é definido sobre a chave `volumes`, porque Bind Mounts são, afinal, um tipo de volume no Docker. Usamos a sintaxe extensa (verbosa) para que fique claro do que se trata:

```yaml
volumes:
  - type: bind
    source: ../backend/src
    target: /app/src
```

Ressalto também a chave `depends_on` que instrui o Docker Compose sobre a inicialização dos conteiners. Nesse caso estamos dizendo que o serviço `api` deve ser iniciado depois do serviço `db`. Um detalhe importante é que _inicializar_ o banco não quer dizer que o mesmo esteja pronto para receber conexões. Por isso, é necessário implementar uma lógica de conexão no backend. Se tiver interesse nesse ponto, dê uma olhada no [código](https://github.com/Felipe-53/dev-env-with-docker/blob/main/backend/src/startupHandlers.ts#L8).

Por último, fazemos o port mapping da porta 3500 e 5555, para poder acessar a api em isolamento (para fins de testes usando um client como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/)) e também para acessar o Prisma Studio.

#### frontend

Já falamos sobre todas as chaves abordadas nesse serviço. A única diferença aqui é que fazemos mais de um Bind Mount, para poder observar mudanças nos diretórios de interesse.

#### proxy

Por fim, temos o serviço `proxy`, que é responsável por direcionar o tráfego para o frontend ou para o backend. Abrimos a porta `5000` para aceitar conexões com o browser. Desabilitamos os logs na chave `logging` para não poluir o terminal.

A configuração é feita de acordo com o arquivo apresentado anteriormente. O Dockerfile é tão simples que não chegou a ser mencionado antes: substituímos o arquivo de configuração padrão por outro contendo as instruções adequadas, apresentadas aqui novamente:

```nginx
server {
  listen 5000;

  location / {
    proxy_pass http://frontend:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
  }

  location /api {
    proxy_pass http://api:3500;
  }
}
```

### Rodando o projeto

Tudo que é preciso para inicializar o projeto é ir na pasta `dev-env` e digitar no terminal:

```
docker-compose up
```

A opção `--build` pode ser usada se for necessário reconstruir alguma das imagens. A opção `-d` ou `--detach` pode ser usada para rodar a aplicação em segundo plano (por padrão, roda no terminal em que foi chamada)

O ambiente está agora plenamente configurado e é possível agora desenvolver localmente e ver as mudanças acontecerem em tempo real nos conteiners, graças aos Bind Mounts. A única dependência para reproduzir todo o ambiente de desenvolvimento agora é Docker.

### Conclusão

Pode parecer trabalhoso à primeira vista o setup do ambiente dev com Docker. Mas é um trabalho que se tem uma única vez. Agora tudo que é preciso para construir o ambiente é puxar os repositórios do github e rodar um comando 😍
