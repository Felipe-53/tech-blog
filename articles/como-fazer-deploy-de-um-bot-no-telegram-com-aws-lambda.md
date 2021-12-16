### Serveless Functions

Serveless functions (FaaS) são uma maneira de distribuir software sem gerenciar qualquer infraestrutura. A designação "serveless" pode ser enganadora, porque afinal de contas nosso código precisa ser executado em _alguma_ infraestrutura, o ponto em questão é que o gerenciamento dessa infraestrutura é completamente abstraído do usuário.

FaaS são uma das formas mais antigas de se conseguir isso (a AWS introduziu seu serviço, Lambda, no final de 2014) e uma das abstrações mais completas também: tudo o que é fornecido ao provedor é o código do que será executado. Essa abstração tem um custo, porém: apenas algumas opções de runtime estão disponíveis e em versões específicas. Existem maneiras de superar essa limitação, mas que estão fora do escopo deste artigo. Existem também outras soluções serveless baseadas em containers, que eliminam toda essa limitação, pois o código que será executado vem de uma imagem fornecida e completamente controlada pelo usuário. Destaco aqui a [AWS App Runner](https://aws.amazon.com/apprunner/) e [Google Cloud Run](https://cloud.google.com/run), duas soluções/servicos fantásticos. Em termos de custo, entretanto, FaaS ainda são mais atrativas, isso se o serviço ou funcionalidade que se está tentando implementar e distribuir for simples o suficiente para "caber" dentro do contexto da execução de uma função - como é no caso de um bot para plataformas como o Telegram: o bot é basicamente um webservice que é notificado quando mensagens (e outros eventos) são enviadas para o mesmo, e que pode também disparar mensagem através de chamadas de API. É sobre isso que vamos falar no próximo tópico.

### Telegram Bot

#### Como funciona

O Telegram tem uma API aberta para a criação e gerenciamento de bots dentro de sua plataforma. Funciona da seguinte maneira: o Telegram notifica um endpoint fornecido por você sobre quaisquer atualizações (mensagens e alguns outros eventos) enviadas ao seu robô. Essas notificações vêm na forma de uma requisição HTTP, método POST, para uma url previamente informada ao Telegram por você. Nessa requisição, estarão contidos todos os dados relativos à atualização em questão: no caso de uma mensagem, por exemplo, nome do usuário, horário, texto, etc., virão no `body` da requisição, formato JSON. Esse tipo de sistema de comunicação chama-se Webhook e é bastante usado para comunicação entre servidores (backend). Seu servidor pode então processar essa atualização da maneira que bem entender, podendo inclusive responder ao usuário com outra mensagem, através de uma chamada à API do Telegram.

#### Autenticação

A autenticação para chamadas na API do Telegram é feita através de tokens: cada bot criado recebe um token único que o identifica. Então em cada requisição, é necessário passar esse token da url, da seguinte forma:

```
https://api.telegram.org/bot<token>/METHOD_NAME
```

Uma referência completa à API do Telegram pode ser encontrada [aqui](https://core.telegram.org/bots/api). À primeira vista, pode parecer grande e não-intuitiva, mas uma vez familiarizado com a mesma, a documentação se mostra bastante precisa e completa. Eu irei destacar sessões específicas da documentação à medida que se mostrar pertinente.

A forma de autenticar as chamadas ao webhook (que fica aberto na internet, para que Telegram possa acessá-lo) fica a cargo do usuário. Como somos nós que fornecemos a url a ser chamada pelo Telegram, podemos incluir na mesma uma query string com o token do nosso robô. Como esse token só é de conhecimento nosso e do Telegram, a presença do mesmo na url garante que de fato é o Telegram e não um serviço malicioso.

### A função Lambda

#### `Handler`

Nesse projeto, nosso robô não fará nada particularmente útil. O objetivo aqui é mostrar como fazer o deploy desse robô em produção. Portanto, nosso robô apenas responderá com um "Hello, there" a cada mensagem enviada para o mesmo.

A função Lambda espera receber um arquivo chamado `index.js` que exporta uma função chamada `handler`. Aqui vamos usar TypeScript e será necessária uma etapa de transpilação para convertê-lo em JS. A função `handler` fica da seguinte forma:

```typescript
const handler: APIGatewayProxyHandler = async (event, context) => {
  // Handling Authentication
  try {
    assert(event.queryStringParameters?.token);
  } catch {
    return buildResponse({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
  const queryStringToken = event.queryStringParameters.token;

  try {
    assert(queryStringToken === botToken);
  } catch {
    return buildResponse({
      statusCode: 403,
      message: "Forbidden",
    });
  }

  assert(event.body, "Empty request body");
  const body = JSON.parse(event.body);

  // Take a look at the Telegram Bot Api to know more!
  // https://core.telegram.org/bots/api#update
  const chatId = body.message.chat.id;
  assert(typeof chatId === "number");

  const responseData = await sendMessageTo("Hello, there!", chatId);
  try {
    // Again, check Telegram Bot Api:
    // https://core.telegram.org/bots/api#making-requests
    // "The response contains a JSON object, which always has a Boolean field 'ok'"
    assert(responseData.ok === true);
  } catch {
    console.warn("Unsuccessful request", "Reponse:", "\n", responseData);
  }

  return buildResponse({
    statusCode: 200,
    message: "ok",
  });
};
```

A função `handler` recebe dois argumentos no momento de sua invocação pela AWS. Basicamente, como se pode imaginar, eles contêm informações sobre o evento que ocasionou o disparo da função e o contexto. É possível ver exatamente os dados que são passados na [documentação](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html), mas o TypeScript pode nos dar uma grande força aqui. Instalando a lib @types/aws-lambda, temos ajuda de _intellisense_ para os tipos dos argumentos, bem como do formato da resposta.

#### Autenticação

Na primeira parte da função, lidamos com a autenticação. O token do nosso bot é armazenado numa variável de ambiente que é definida no console da AWS (nunca se deve armazenar segredos em código, deve-se usar variáveis de ambiente). Portanto, nosso programa terá acesso a essa variável no momento da invocação.

Procuramos o token na query string e se o mesmo estiver ausente ou diferir do nosso token, retornamos um `401` ou `403`, respectivamente. Vamos mostrar mais adiante como passar ao Telegram a url que deve ser chamada quando um novo evento acontecer com o nosso robô.

#### Enviado mensagens

Enviar uma mensagem do nosso robô consiste em nada mais do que chamar um endpoint da API do Telegram. Para fazer as requisições estamos usando a lib [axios](https://github.com/axios/axios). O schema dessa requisição pode ser verificado [nesse ponto da documentação](https://core.telegram.org/bots/api#sendmessage). Estamos encapsulando essa lógica na função `sendMessageTo` destacada abaixo:

```typescript
async function sendMessageTo(message: string, chat_id: number) {
  const response = await axios({
    method: "POST",
    url: `https://api.telegram.org/bot${botToken}/sendMessage`,
    data: {
      text: message,
      chat_id,
    },
  });

  // the response payload
  return response.data;
}
```

### Subindo a função para a AWS

Tudo que precisamos fazer agora é subir o código para a AWS. Uma das maneiras de fazer isso (a mais simples) é comprimir a pasta que contém nosso projeto e fazer o upload da mesma através do console da AWS. Veja que é necessário incluir a pasta `node_modules`, que é onde estão nossas dependências.

Vê-se que esse é um método bastante manual e moroso, mas é também o mais simples. Penso em escrever um artigo sobre como construir uma pipeline CI/DC para funções Lambda no futuro, mas foge ao escopo desse projeto.

Note-se também que como se trata de um projeto TypeScript é necessário transpilá-lo antes de fazer o upload. Para evitar em parte o trabalho manual, criei o seguinte script que transpila e comprime o projeto:

```JSON
"scripts": {
    "build": "npx tsc && zip -r ../handler.zip *"
  }
```

Esse script cria o arquivo `index.js` e comprime nosso projeto na pasta `handler.zip` na raíz.

### Adicionando um _trigger_ à função

Uma função pode ser acionada por uma variedade imensa de eventos. No nosso caso, estamos interessados em invocá-la através da chamada de uma URL, nosso webhook. Para tanto, é necessário integrar nossa função Lambda com um serviço chamado API Gateway, que provê uma URL pública que direciona o tráfego para o nosso backend, nesse caso, nossa função. Esse é um processo um tanto moroso de descrever com palavras e imagens, portanto pretendo fazer um vídeo explicando com fazer isso passo-a-passo. A intenção aqui é a de dar uma visão geral do processo e, com sorte, o leitor conseguirá informações adicionais consultando a documentação. Nesse meio tempo, porém, fico à disposição para dar mais detalhes através do [e-mail](/sobre#me-encontre).

### Criando o robô e passando ao Telegram nosso webhook

#### Criando o robô

No Telegram se cria um robô... Através de um robô! Basta falar com o @botfather. No final do processo, seu robô será criado e você receberá seu token como output.

#### Informando o Telegram sobre nosso webhook

De posse do token, informamos ao Telegram da nossa URL (obtida através da integração do Lambda com o API Gateway) através de uma requisição ao endpoint `/setWebhook`. Para saber se o processo foi bem sucedido, podemos também consultar o `/getWebhookInfo`. Com esse propósito, criei uma pasta chamada `webhook-config`, que contém scripts para as duas finalidades. Mais uma vez fazemos uso de variáveis de ambiente para armazenar o `token` bem comom nossa `url`. Nesse caso, porém, armazenamos essa informação no arquivo `.env`. Segue o código e os scripts:

```typescript
import assert from "assert";
import axios from "axios";
import { config } from "dotenv";

const result = config();
if (result.error) {
  throw Error("failed to load .env file");
}

async function setWebhook() {
  const resp = await axios({
    url: buildTelegramUrlEndpoint("setWebhook"),
    method: "POST",
    data: {
      url: `${getWebhookUrl()}?token=${getToken()}`,
    },
  });

  console.log(resp.data);
}

async function getWebhookInfo() {
  const resp = await axios({
    url: buildTelegramUrlEndpoint("getWebhookInfo"),
    method: "GET",
  });

  console.log(resp.data);
}

const map = {
  setWebhook,
  getWebhookInfo,
};

async function main() {
  const option = process.argv[2];
  if (!option) {
    throw Error("Command line argument not provided");
  }
  assert(option === "setWebhook" || option === "getWebhookInfo");

  await map[option]();
}

function getToken() {
  if (!process.env.TOKEN) {
    throw Error("Failed to load TOKEN key from environment");
  }
  const botToken = process.env.TOKEN;
  return botToken;
}

function getWebhookUrl() {
  if (!process.env.WEBHOOK_URL) {
    throw Error("Failed to load WEBHOOK_URL key from environment");
  }
  const webhookUrl = process.env.WEBHOOK_URL;
  return webhookUrl;
}

function buildTelegramUrlEndpoint(endpoint: string) {
  const token = getToken();
  return `https://api.telegram.org/bot${token}/${endpoint}`;
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
```

```JSON
"scripts": {
    "set-webhook": "ts-node-dev ./index.ts setWebhook",
    "webhook-info": "ts-node-dev ./index.ts getWebhookInfo"
  },
```

### Conclusão

Vimos como usar o serviços Lambda e API Gateway para criar um bot usando a API do Telegram. Trata-se de um caso de uso perfeito para FaaS e a melhor parte de tudo é que a AWS nos dá, ao tempo em que escrevo esse artigo, **um milhão** de invocações de graça por mês para sempre. Isto é, conseguimos fazer o deploy de um bot com custo zero. Esse é certamente um excelente momento para ser desenvolvedor.
