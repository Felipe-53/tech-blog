_Resolvi dividir esse artigo em dois posts, um de teor mais teórico (este) e outro de mão no código. Dessa forma forma o leitor já familiarizado com os conceitos poderá ir direto ao post que trata do exemplo prático, [aqui](/artigos/conteinerizando-o-ambiente-de-desenvolvimento-com-docker-parte-2)._

## Funciona na minha máquina

Em um mundo ideal, o ambiente de desenvolvimento seria idêntico ao ambiente de produção. Por “ambiente” entende-se todo o aparato de software que faz com que uma aplicação funcione de maneira adequada. Isso inclui desde o sistema operacional que a aplicação habita, ao runtime das linguagens utilizadas, até serviços como banco de dados, web servers, etc. Se fosse possível reproduzir localmente o ambiente de produção, eliminaria-se a possibilidade de bugs relacionados a divergências dessa natureza.

O problema é que enquanto em produção uma aplicação roda em um ambiente controlado, em desenvolvimento o projeto roda na máquina local do desenvolvedor. E é improvável (senão impossível), que o desenvolvedor consiga reproduzir localmente de forma fiel o aparato de software usado em produção.

No meu caso pessoal, pouco tempo depois que comecei a desenvolver, ao tomar ciência de que em produção meu código (backend) seria invariavelmente executado no contexto de um servidor linux, me propus de imediato adotá-lo na minha máquina local. Até hoje uso Ubuntu no meu computador, o que acabou se mostrando uma escolha muito acertada, porque essa familiarização com o OS me ajudou bastante na hora de fazer os primeiros deploys (bastante manuais). Mas isso estava longe de resolver todos os problemas, como deve ficar evidente nas próximas linhas.

Imagine por um momento que estamos falando de um projeto que usa Node.js no backend, Nginx como web server e reverse-proxy e um banco de dados Postgres. Para trabalhar nesse projeto localmente, um colaborador novo precisaria ter todas essas dependências instaladas em sua máquina. Adicionalmente, precisaria verificar se dispõe das versões exatas usadas no projeto em questão. E depois rezar para que não venha a ter nenhum problema de incompatibilidade se estiver usando um OS diferente do de produção. Imagine agora que esse mesmo dev dá manutenção um uma aplicação legada que usa uma versão do banco de dados Postgres incompatível com a do projeto atual. Outro projeto usa MySQL e um outro MongoDB. Outro usa Apache ao invés de Nginx. Node na versão 10 vs. Node na versão 16 (alô [nvm](https://github.com/nvm-sh/nvm#intro)). O que fazer? Ter todas essas dependências localmente? Instalar e desinstalar versões diferentes a depender do que se está trabalhando no momento? Por fim, imagine que se tem dez desenvolvedores trabalhando nesse e em outros projetos, cada projeto dependendo de versões diferentes de software diferentes: em resumo, uma receita para o caos.

## A solução: containers

Containers são uma maneira de “empacotar” toda parafernalha de software necessária para rodar uma aplicação, desde o próprio sistema operacional até os programas e dependências utilizadas. Conteineres dão garantia de rodar sempre da mesma forma, independente de onde estejam, pois reproduzem seu ambiente de forma consistente, desde o nível do OS, conforme instruídos. Ao mesmo tempo, na perspectiva da máquina hospedeira, eles são apenas um processo, de forma que rodar e parar um conteiner é tão simples quanto abrir e fechar um navegador.

Diante dessas características, containers são a solução perfeita para eliminar problemas relacionados a inconsistências nos ambientes de dev vs. prod. Além disso, podem facilitar sobremaneira o trabalho dos devs, porque ao invés de ter que instalar localmente todas as dependências do projeto em que está trabalhando e configurá-las para que funcionem da forma correta, podem simplesmente construir o rodar um conteiner.

## Exemplo prático

No próximo post, vou mostrar na prática como isso funciona com Docker e Docker Compose, conteinerizando uma aplicação web simples com React no frontend, Node.js no backend, um banco de dados Postgres e Nginx como reverse-proxy.
