ESM (ECMAScript Modules) é a maneira oficial normatizada de trabalhar com módulos no JavaScript. Hoje qualquer ambiente que suporta a linguagem é capaz de entender e processar scripts usando esse recurso. Mas a história nem sempre foi essa.

Quando surgiu o projeto do Node.js, esse padrão ainda não estava completamente formulado. O JavaScript não tinha uma solução nativa para a segmentação de código em arquivos. Mesmo assim, a comunidade precisava de uma maneira de dividir projetos cada vez mais complexos em arquivos menores e reutilizáveis.

Assim, surgiu um padrão amplamente adotado pela comunidade chamado CommonJS. Estamos falando da famosa sintaxe do `require` e `module.exports`. Mas essa maneira de escrever módulos não é reconhecida pela linguagem, de forma que, para que esse código pudesse rodar no navegador, era necessário que esses arquivos fossem pré-processador por uma espécie de compilador responsável por transformar o código resultante em JavaScript puro. Essas ferramentas, que ao longo do tempo evoluíram para servir a mais propósitos além desse, se chamam Module Bundlers, sendo um exemplo conhecido o WebPack.

Quando o Node surgiu, seu criador, [Ryan Dahl](https://en.wikipedia.org/wiki/Ryan_Dahl), implemetou o CommonJS nativamente no runtime, o que significa que o `require` e `module.exports` são entendidos _out of the box_, e essa se tornou a maneira padrão de escrever módulos no Node.js.

Tempos depois, veio a oficialização do ESM e a comunidade se viu no dilema entre as duas abordagens. O CommonJS continuou e continua sendo a forma padrão habilitada no Node, mas a comunidade viu a necessidade de adotar o ESM com o propósito de universalizar a linguagem; isto é, fazer com que haja um padrão único e oficial em qualquer ambiente.

Seguindo essa tendência, o Node adotou suporte para ESM, vindo com uma versão estável da implementação a partir de 2020.

Hoje, o ESM pode ser habilitado (>= v16) bastando para isso incluir no `package.json` a seguinte diretriz:

```json
...
"type": "module",
...
```

Alternativamente a extensão `.mjs` pode ser utilizada, sem a necessidade de adicionar a instrução no `package.json`, embora esse método seja considerado menos elegante.

Conquanto seja relativamente fácil ativar ESM no Node, é importante salientar que infelizmente as coisas ficam mais complicadas na prática.

Qualquer projeto real provavelmente fará uso de bibliotecas externas. E essas bibliotecas provavelmente foram originalmente escritas usando CommonJS. Isso significa que elas serão incompatíveis com o seu projeto, caso você esteja usando ESM.

Muitas libs já oferecem uma versão ESM em paralelo à original que funciona sem nenhuma configuração necessária. Mas isso está longe de se aplicar a todas.

A tendência é que a maneira oficial eventualmente se torne a padrão em todos os ambientes. Trata-se de um processo orgânico de amadurecimento e universalização da linguagem. Enquanto isso não acontece, usar o TypeScript é uma excelente alternativa. ESM é o padrão e, na transpilação, tudo volta para o CommonJS (se assim desejado), eliminando quaisquer incompatibilidades. Além do benefício da tipagem, claro!

Usar o TypeScipt com Node pode parecer intimidador à primeira vista, mas os benefícios são enormes. Isso, porém, é um tópico para um outro artigo.
