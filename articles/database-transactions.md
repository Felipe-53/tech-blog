Database Transactions é um tópico tão importante que a primeira frase da [documentação do PostgreSQL](https://www.postgresql.org/docs/current/tutorial-transactions.html) a respeito do assunto é, em tradução livre:

> Transações são um conceito fundamental em qualquer sistema de banco de dados.

De fato, esse conceito é um dos aspectos que torna o armazenamento e manipulação de dados em um banco SQL robusto e confiável - e ao mesmo tempo em que é essencial, trata-se também uma ideia bastante simples de ser entendida.

Recorrendo novamente à referida documentação, nos deparamos com o seguinte resumo (tradução livre):

> O ponto principal sobre uma transação é que ela junta várias ações em uma única operação de tudo ou nada. Os passos intermediários dessa operação não são visíveis a outras ações paralelas e se qualquer ação intermediária da operação falhar, então a operação falha como um todo e nenhuma alteração é feita no banco.

É uma ideia extremamente poderosa e muito simples de entender com um exemplo.

Vamos imaginar uma aplicação bancária que intermedia operações financeiras entre contas. De forma extremamente simplificada, poderíamos ter uma tabela chamada `conta` com um campo chamado `saldo` usado para manter o saldo atual das contas.

```sql
  CREATE TABLE conta (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    saldo DECIMAL(10,2)
    ...
  );

```

Além disso, provavelmente teríamos uma tabela para registrar as operações em si (histórico). No entanto, no intuito de tornar mais clara a abordagem, vamos considerar apenas a primeira tabela.

Se um usuário desejasse transferir uma quantia para outro, precisaríamos atualizar o saldo de duas contas: seria necessário subtrair a quantia de uma conta e acrescentar na outra. Em termos de ações no banco, isso se traduziria em duas atualizações na tabela `conta`. Especificamente, supondondo dois usuários, Alice e Bob (não poderia ser diferente), e imaginando que Alice deseja transferir R$ 100,00 para Bob, teríamos:

```sql
  UPDATE conta SET saldo = saldo - 100.00 WHERE nome = 'Alice';

  UPDATE conta SET saldo = saldo + 100.00 WHERE nome = 'Bob';
```

_Usaremos o campo_ `nome` _como filtro de seleção a fim de facilitar o entendimento. Numa aplicação real, usaríamos uma chave primária ou campo com restrição de unicidade._

Tudo bastante simples. Mas o que aconteceria se, durante essa operação, conseguíssemos atualizar o saldo de uma conta, mas não da outra? Isto é, o que acontece se apenas _uma_ das ações for bem sucedida? Claramente algo inaceitável. E um cenário como esses pode acontecer por uma infinidade de razões: perda de conexão com o banco, erro na query, etc. O que precisamos aqui é de uma maneira de garantir que as duas ações sejam realizadas ou a operação como um todo falhe. E é exatamente pra isso que servem as _transactions_.

No Postgres, uma transação é iniciada e concluída com os comandos `BEGIN` e `COMMIT`, respectivamente. Todas as ações ou comandos que estiverem entre eles serão executados de forma completa ou não terão nenhum efeito. Isso quer dizer que se algum passo intermediário falhar, os dados possivelmente alterados no caminho são restaurados para o estado inicial em que se encontravam antes de a transação ser iniciada. Usando esse recurso no nosso exemplo, teríamos:

```sql
  BEGIN;

    UPDATE conta SET saldo = saldo - 100.00 WHERE nome = 'Alice';

    UPDATE conta SET saldo = saldo + 100.00 WHERE nome = 'Bob';

  COMMIT;
```

E, dessa forma, poderíamos garantir que os saldos das duas contas seriam devidamente atualizados ou a operação como um todo falharia.

Existem ainda situações em que seria desejável salvar parte das alterações já feitas nos dados em determinado ponto de uma transação, mesmo que algum passo subsequente viesse a falhar. É possível ter esse tipo de controle refinado com transações, mas essa discussão está além dos nossos objetivos no momento.

Vale acrescentar que, em uma aplicação real, em que em geral um ORM é utilizado para facilitar e intermediar a interação da aplicação com o banco de dados, frequentemente transações já são utilizadas por debaixo dos panos para garantir a integridade dos dados. Mas em situações mais específicas, faz-se ainda necessário o uso explícito dessa funcionalidade, e os ORM’s normalmente possuem API’s para abranger esse tipo de circunstância.

Os cenários em que o uso de transações são necessários são abundantes. Um caso real de uso que posso destacar da minha experiência pessoal se deu quando estava construindo um sistema de automação de pedidos, o [Agilizze](https://www.instagram.com/agilizze.app). A atualização de status de um pedido precisava sempre ser acompanhada de uma inserção numa tabela de histórico, que poderia ser usada para acompanhar a evolução dos status de um pedido no curso do tempo. Isto é, a tabela principal, `pedido`, mantinha o status atual em um campo `status` e atualizações nesse campo deveriam vir juntamente com a inserção na tabela de histórico. Como se trata de duas ações distintas, seria possível que uma delas fosse bem sucedida e a outra não, fazendo com que surgissem inconsistências nos dados, não fosse o uso das transações.

Tempos depois, em contato com outras bases de código, me deparei com vários outros cenários que exigiam o uso desse recurso - e fiquei surpreso ao constatar que frequentemente ele não estava lá. Isso não implicava necessariamente que o banco em questão estivesse abarrotado de inconsistências. Mas se a tecnologia nos provê meios de nos salvaguardar de falhas (que sempre vão existir), é sempre bom estar do lado da segurança.
