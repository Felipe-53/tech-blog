Pois bem, aqui estamos novamente com mais relatos da minha aventura no mundo do open source.

No [último artigo](https://www.felipebarbosa.dev/artigos/minha-primeira-tentativa-de-contribuicao-para-a-comunidade-open-source-parte-1), eu tinha aberto um [issue](https://github.com/denoland/deno_blog/issues/103) para saber a opinião da comunidade sobre uma melhoria proposta.

Mesmo sem ter recebido um feedback, resolvi implementar minha solução. Fiz um fork do projeto e comecei a trabalhar. Não era algo difícil: consegui fazer funcionar em pouco tempo. Entretanto, fiquei refletindo bastante se aquilo se encaixava na proposta do projeto. Na descrição do github, lê-se:

> Minimal boilerplate blogging

Trata-se de um projeto clean e minimalista, tanto na interface de uso que ele entrega ao programador (é possível construir o blog com duas linhas), quanto na implementação (o projeto tem basicamente dois arquivos e mais um para testes).

A solução que eu estava propondo contava com a comunidade para adicionar ao projeto adaptações para cada língua desejada das pequenas porções de texto que aparecem no site que não é conteúdo do autor. Coisas como “Home”, “Read More”.

Porém isso envolve ter na base de código as traduções em várias línguas desses termos. Nem um pouco minimalista.

Uma outra solução plausível, porém mais trabalhosa para o desenvolvedor, seria a de fazer um fork do projeto e alterar esses termos _in place_, no próprio código. Como o Deno [suporta imports de url diretamente](https://www.felipebarbosa.dev/tech-notes/deno's-module-system), bastaria apontar para o seu fork no seu projeto, ao invés da url oficial.

Isso é bem menos conveniente e requer um conhecimento técnico específico, inclusive para manter o projeto atualizado, o que demanda, se essa solução for escolhida, que você esteja sempre sincronizando o seu fork com o repositório oficial.

Todas essas considerações eu adicionei no issue que eu já tinha aberto. O que resta saber agora é a opinião dos moderadores.

A minha opinião pessoal mudou um pouco à medida que eu fui refletindo.

Em primeiro lugar, o projeto deixa o usuário ciente de que é uma solução minimalista desde o princípio. Ter traduções para outras linguagens seria uma feature interessante de se ter, mesmo no contexto minimalista? Provavelmente, mas, a não ser que eu esteja redondamente enganado, isso iria requerer um esforço que simplesmente não faz sentido para um projeto desse porte.

Em segundo lugar, essa provavelmente não vai ser a única coisa que você vai querer mudar se você está buscando customização. Então, de qualquer forma, em algum ponto, você iria acabar querendo fazer um fork de qualquer jeito.

Diante disso, eu acharia compreensível se os moderadores do projeto não quisessem incorporar essa funcionalidade.
### O novo problema

Pois bem, essa foi a solução do fork foi a que eu adotei e agora meu blog pessoal está 100% em português.

![git-diff](https://tech-blog-assets.s3-sa-east-1.amazonaws.com/tech-notes-assets/git-diff.png)

Entretanto, como eu havia dito no post anterior, esse não é o único ajuste que julguei que o projeto merecia.

Um outro problema diz respeito a visualização do blog em dispositivos móveis.

O `deno_blog` dá acesso a configuração de tema claro ou escuro, algo indispensável nos dias de hoje, haha. Entretanto, quando visto no smartphone com tema escuro, a barra de navegação do browser continua clara, uma experiência nada agradável 🥲.

Estava diante de uma funcionalidade que claramente poderia e deveria ser implementada sem muitas controvérsias dessa vez.

Assim, resolvi mudar de marcha e atacar esse problema.

### O primeiro Pull Request

Depois de analisar cuidadosamente o código fonte, escrevi uma solução que achei a melhor. Precisei de ajustes mínimos. Escrevi dois testes para garantir que tudo estava OK: tudo lindo, tudo funcionando.

Depois de me ver satisfeito com o meu trabalho, foi o momento de abrir o PR:

https://github.com/denoland/deno_blog/pull/106

PR aberto, resta agora saber se vai ser aceito ou não. 🤔

### Conclusão

Claro, mesmo antes de o PR ser aceito eu já incluí a solução ao meu fork e evidentemente já estou usando-a em meu blog pessoal. Mesmo que o PR acabe não sendo aceito por algum motivo, meu trabalho já está mais do que pago com a experiência realmente _full dark mode_ que pode ser encontrada lá no [meu blog](https://felipebarbosa.deno.dev), haha 😜.

Vejo vocês em breve.

Cheers!
