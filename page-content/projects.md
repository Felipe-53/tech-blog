## Projetos 👨‍💻

Alguns dos projetos que construí, do mais recente para o mais antigo.

<h3 style="margin-bottom: 0;">Chess Implementation</h3>
<span><a href="https://chess-game-52k.pages.dev/" target="_blank">Demo</a> | <a href="https://github.com/Felipe-53/chess-game" target="_blank">Repositório</a></span>

Uma implementação do jogo clássico do xadrez, feito em TypeScript.

De forma geral, estou sempre em busca de pequenos projetos que sejam interessantes, divertidos, úteis ou (potencialmente) lucrativos 👀. A preferência é para aqueles que estão exatamente na interseção dessas características, claro. Entretanto, é uma tarefa não-trivial pensar em um projeto com todos esses requisitos.

Esse se enquadra mais na categoria "interessante e diverto" do que "útil / (potencialmente) lucrativo" 🤣. Mas pensando no aprendizado e no conhecimento, indiretamente pode-se entendê-lo como útil 🤔.

O foco foi no backend e eu me propus buscar uma implementação das regras do jogo que fosse a mais clara e legível possível. Não utilizei TDD na sua forma pura, mas os testes guiaram o desenvolvimento, especialmente na ausência de uma interface gráfica, que apareceu apenas no final.

<h3 style="margin-bottom: 0;">Stone Automata Maze Challenge</h3>
<a href="https://github.com/Felipe-53/stone-automata-maze-challenge" target="_blank">Repositório</a>

Primeiro desafio de programação do qual participei, promovido pela Stone em parceria com a Sigma Geek. Foi também o primeiro projeto expressivo que construí usando Rust.

O desafio foi o de encontrar os melhores caminhos para labirintos dinâmicos formados por autômatas celulares.

Confira os detalhes no repositório, que inclui uma pequena animação para dar um gostinho de como funcionam esses labirintos e das soluções encontradas.

<h3 style="margin-bottom: 0;">Microsserviço de envio de e-mail</h3>
<a href="https://github.com/Felipe-53/tech-blog-email-service" target="_blank">Repositório</a>

Microsserviço de arquitetura serverless desenvolvido para o envio automático de e-mails.

A ideia foi a de implementar um sistema de notificações via e-mail para o conteúdo produzido aqui no blog. Uma espécie de newsletter, mas que, ao invés de trazer o conteúdo no corpo do e-mail, direciona para o post recém publicado ao qual o e-mail se refere.

O intuito no nível técnico foi o de construir um microsserviço de primeira classe, com banco de dados próprio e comunicação assíncrona utilizando filas.

Confira todos os detalhes [nesse post](https://www.felipebarbosa.dev/artigos/comunicacao-assincrona-entre-microsservicos:-filas)!

<h3 style="margin-bottom: 0;">Tech Blog CMS API</h3>
<a href="https://github.com/Felipe-53/tech-blog-cms-api" target="_blank">Repositório</a>

API de gerenciamento de conteúdo do Blog. Construído com testes, SOLID e DDD em mente.
Juntei a necessidade de ter um Headless CMS para o site com a vontade de explorar boas práticas de arquitetura de software, além de incorporar pipelines de CI/CD. O projeto conta com:

- Testes;
- SOLID;
- DDD;
- CI pipeline usando Github Actions;
- Deploy em ambiente Serverless (Lambda).

<h3 style="margin-bottom: 0;">Agilizze</h3>
<a href="https://www.instagram.com/agilizze.app" target="_blank">Instagram</a>

Sistema de automação de pedidos integrado ao Whatsapp. Conta com uma plataforma de gestão de pedidos para empresas e um aplicativo web para clientes. É sem dúvida o projeto full stack mais complexo que já empreendi. Aqui tive a oportunidade de utilizar:

Backend:

- Docker
- Web Sockets
- Fastify (Node.js Framework)
- Prisma (Node.js ORM)

Frontend:

- React
- Material UI (Design System)

<h3 style="margin-bottom: 0;">Tech Blog</h3>

<span><a href="https://github.com/Felipe-53/tech-blog" target="_blank">Repositório</a></span>

Trata-se de algo que eu queria fazer já há algum tempo e que mostrou-se ser a oportunidade perfeita para colocar a mão na massa em algumas tecnologias sensacionais, dentre elas:

- TypeScript;
- Next.js;
- Tailwind CSS.

<h3 style="margin-bottom: 0">Telegram Sales Bot</h3>

<span><a href="https://github.com/Felipe-53/telegram-sales-bot" target="_blank">Repositório</a> | <a href="https://www.youtube.com/watch?v=DF6d808ugj8" target="_blank">Demonstração</a></span>

_Proof of concept_ de um robô varejista no Telegram. O intuito foi o de explorar a construção de chatbots e como esse tipo de sistema poderia automatizar comunicação de clientes com lojas.

Nesse projeto eu aprendi/consolidei as seguintes habilidades:

- Compreenção e consumo de API de terceiro (API do Telegram);
- Meu primeiro contato com Webhook (endpoint do backend que tem o propósito de ser chamado quando da acorrência de algum evento externo);
- Primeiro contato com **<a href="https://ngrok.com/" target="_blank">ngrok</a>**, ferramenta que disponibiliza uma url pública que redireciona o tráfego para servidor local.

Feito em Python, na época minha linguagem de preferência para backend (atualmentente Node.js).

<h3 style="margin-bottom: 0">Depo Control</h3>

<span><a href="https://github.com/Felipe-53/depo-control" target="_blank">Repositório</a> | <a href="https://www.notion.so/depo-control-project-ff31e90150b84594b1424fc72265df23" target="_blank">Demonstração</a></span>

Meu primeiro projeto FullStack, trata-se de um sistema de control de estoque. Foi o projeto em que consolidei meus conhecimentos em React, meu framework de preferência para frontend web. Alguns destaques:

- Comunicação bidirecional utilizando Web Sockets;
- Autenticação com JWT;
- Progressive Web App.
