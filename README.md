Para um bom funcionamento do projeto, é necessário o banco de dados Mongo instalado.

Em backend, após fazer o download do repositório, instalar suas dependências:
npm install

Após, substituir o ip do servidor mongo (mongodb://192.168.0.40/local) para o seu servidor.

Logo após a substituição já será possível rodar a API:
npm run dev




No frontend, após fazer o download do repositório, instalar suas dependências:
npm install

Após a instalação, será possível rodar a aplicação:
npm run serve



***PS: Foi utilizado para preencher os inputs de estado e cidade, a API v1 do IBGE, contudo constatei
alguns bugs. Como foi para um projeto específico, utilizei ela. Próxima mudança será utilizar a API do
VIACEP consultada diretamente do backend.

***PS2: Motivo pelo qual ter sido escolhido VueJS: É o framework javascript melhor posicionado atualmente
como mostram alguns sites: https://bestofjs.org/, https://blog.geekhunter.com.br/react-vs-vue-vs-angular-qual-escolher/, 
entre outros