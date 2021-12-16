### Serveless Functions

Serveless functions (FaaS) são uma maneira de distribuir software sem gerenciar qualquer infraestrutura. A designação "serveless" pode ser enganadora, porque a final de contas nosso código precisa ser executado em _alguma_ infraestrutura, o ponto em questão é que o gerenciamento dessa infraestrutura é completamente abstraído do usuário.

FaaS são uma das formas mais antigas de se conseguir isso (a AWS introduziu seu serviço, Lambda, no final de 2014) e uma das abstrações mais completas também: tudo o que é fornecido ao provedor é o código do que será executado. Essa abstração tem um custo, porém: apenas algumas opções de runtime estão disponíveis e em versões específicas. Existem maneiras de superar essa limitação, mas que estão fora do escopo desse artigo. Existem também outras soluções serveless que são baseadas em containers, que eliminam toda essa limitação, pois o código que será executado é baseado numa imagem fornecida e completamente controlada pelo usuário. Destaco aqui a [AWS App Runner](https://aws.amazon.com/apprunner/) e [Google Cloud Run](https://cloud.google.com/run), duas soluções/servicos fantásticos. Em termos de custo, entretanto, FaaS ainda são mais atrativas, isso se o serviço ou funcionalidade que se está tentando implementar e distrubuir for simples o suficiente para "caber" dentro do contexto da execução de uma função, como é o no caso de um bot para plataformas como o Telegram, que é basicamente um webservice que é notificado quando mensagem são enviadas para o mesmo e que pode também disparar mensagem através de chamadas de API. É sobre isso que vamos falar no próximo tópico.

### Telegram Bot

#### Como funciona

O Telegram tem uma API aberta para a criação e gerencimento de bots dentro de sua plataforma. Funciona da seguinte maneira: o Telegram notifica um endpoint fornecido por você sobre quaisquer atualizações (mensagens e alguns outros eventos) enviadas ao seu robô. Essas notificações vêm na forna de uma requisição HTTP, método POST, para uma url previamente informada ao Telegram por você. Nessa requesição, estarão contidas todos os dados relativos a atualização em questão: no caso de uma mensagem, por exemplo, nome do usuário, horário, texto, etc., virão no `body` da requisição. Esse tipo de sistema de comunicação chama-se Webhook e é bastante usado para comunicação entre servidores (backend). Seu servidor pode então processar essa atualização da maneira que bem entender, podendo inclusive responder ao usuário com outra mensagem, através de uma chamadas à API do Telegram.

#### Autenticação

A autenticação para chamadas na API do Telegram é feita através de tokens: cada bot criado recebe um token único que o identifica. Então em cada requisição, é necessário passar esse token da url, da seguinte forma:

```
https://api.telegram.org/bot<token>/METHOD_NAME
```

Uma referência completa à API do Telegram pode ser encontrada [aqui](https://core.telegram.org/bots/api). À primeira vista, pode parecer grande e não-intuitiva, mas uma vez familiarizado com a mesma, a documentação se mostra bastante precisa e completa. Eu irei destacar sessões específicas da documentação a medida que se mostrar pertinente.
