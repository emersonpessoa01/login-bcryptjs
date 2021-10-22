<p align="center">
<img src= "./public/upload/anuncios/3-06-2021-21h-10_amylee-linda_2.gif" width="150" alt="icon-amy-lee" >
</p>
<hr>

### Descrição:
- Backend vinculado ao Frontend(client)<br>
- "npm run dev" para iniciar tanto api quanto o client<br>
- Rota raiz: localhost:3000<br>- Métodos get, post, put e delete.Todos testados.Ok!<br>

#### Sequência para criar o projeto backend
* Criar arquivo package.json:<br>
*npm init -y*<br>

* Gerencia as requisições, rotas, URLs e entre outras funcionalidades,:<br>
*npm install express*<br>


* Instalar o módulo para reiniciar o servidor sempre que houver alteração no código font, "g " significa globalmente:<br>
*npm install -g nodemon*<br>

* Instalar a dependência para JWT<br>
*npm install --save jsonwebtoken*

* Gerar um privateKey pelo GeneratePlus, de preferência um hexadecimal
*https://generate.plus/*

* Gerencia variáveis de ambiente<br>
*npm install --save dotenv*

* Permitir acesso a API<br>
*npm install --save cors*
* Instalar o drive do banco de dados<br>
*npm install --save mysql2*
* Sequelize que é uma biblioteca javascript que facilita o gerenciamento de um banco de dados SQL<br>
*npm install --save sequelize*<br>
* Instalar o Workbench<br>
* Criar a base de dados executando o seguinte comando:<br>
*CREATE DATABASE react_imersao_8_0 CHARACTER SET utf8mb4 collate utf8mb4_unicode_ci*
* Verificar a versão do MySQL instalado na máquina<br>
*mysql -u root -p*
* Instalar módulo para criptografar a senha<br>
*npm install --save bcryptjs*
* Permitir acesso a API<br>
*npm install --save path*
* Executar vários comandos simultaneamente<br>
*npm install --save concurrently*

* Multer é um middleware node.js para manipulação multipart/form-data, usado para o upload de arquivos<br>
*npm install --save multer*

<hr>

#### Sequência para criar o projeto frontend
* Criar projeto react<br>
*npm init react-app <nome_app>*<br>

* Rodar projeto react<br>
*npm run dev*<br>

* Dependência para gerenciar as rotas<br>
*npm install --save react-router-dom*<br>

* Gerenciar chamadas para API<br>
*npm install --save axios*<br>

* Utilizando para mudar de página e renderizar a nova página sem recarregar toda a aplicação<br>
*npm install --save history@4.9.0*<br>
* Transformar o ccs em componentes<br>
*npm install --save styled-components*<br>

* Instalando biblioteca Bootstrap<br>
*cd client*<br>
*npm i bootstrap*<br>
*npm i reactstrap*

* Importando no index.js<br>
*import "bootstrap/dist/css/bootstrap.css"*

* Faz validação de formulários<br>
*yarn add react-hook-form*<br>
*yarn add yup*<br>
*yarn add @hookform/resolvers*




