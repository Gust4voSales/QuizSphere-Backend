[English README](https://github.com/Gust4voSales/QuizSphere-Backend/blob/master/README-ENGLISH.md)
<h1 align="center">
<img src="https://i.imgur.com/HMr0tyZ.png" alt="icon" height="100">
<br>
QuizSphere
</h1>

<p align="center">Crie quizes abertos ou privados, favorite os melhores e envie para seus amigos.</p>
-Link do aplicativo na PlayStore: https://play.google.com/store/apps/details?id=com.gust4
<br>
-Link no Youtube monstrando app: https://www.youtube.com/watch?v=bO2aJ0DFudk
<br>
-Link do server hospedado no Heroku: https://quiz-sphere-backend.herokuapp.com

<hr />

## 📜 Sobre
Este projeto contém o backend da aplicação QuizSphere (código do frontend mobile: https://github.com/Gust4voSales/QuizSphere-Cliente).
O aplicativo foi desenvolvido com o intuito de adquirir experiência e conhecimento utilizando tecnologias atuais. O QuizSphere é uma mistura de jogo de perguntas e respostas com elementos característicos de rede-sociais. 

O que o aplicativo faz/permite:
 - Jogar quiz;
 - Você pode criar jogos de Quiz de forma pública ou privada (apenas o autor do quiz ou quem ele compartilhar pode jogar um quiz privado);
 - Pesquisar por quizes;
 - Avaliar um quiz com like;
 - Adicionar/remover um quiz da sua lista de favoritos;
 - Adicionar amigos;
 - Compartilhar quiz com amigos;
 - Receber notificações no aplicativo em tempo real quando algum usuário aceita sua solicitação de amizade ou quando compartilham um quiz com você.

## 🧩 Rotas do server
| Rota | Método HTTP |  Função | Requer autenticação | 
| --- | --- | --- | --- |
| /users/register |  `POST` | Registra um novo usuário | **Não** | 
| /auth/login | `POST` |Realiza o login do usuário retornando um Token de autenticação em caso de sucesso | **Não** | 
| /users/:id | `GET`|Retorna as informações do usuário | **Sim** | 
| /quiz/create | `POST`|Registra um novo quiz | **Sim** | 
| /quiz/show/:id | `GET`|Recebe o ID do quiz e retorna os dados dele | **Sim** | 
| /quiz/list | `GET`|Retorna a listagem dos quizes, podendo adicionar filtros | **Sim** | 
| /quiz/saved/add/:quizId | `POST`|Adiciona um quiz à lista de favoritos do usuário | **Sim** | 
| /quiz/saved/remove/:quizId | `DELETE`|Remove um quiz da lista de favoritos do usuário | **Sim** | 
| /quiz/saved | `GET`|Retorna a listagem dos quizes favoritados pelo usuário | **Sim** | 
| /quiz/:quizId/like | `POST`|Dá like no quiz | **Sim** | 
| /quiz/:quizId/dislike | `DELETE`|Remove like do quiz | **Sim** | 
| /quiz/share/:quizId | `POST`|Compartilha um quiz com amigo | **Sim** | 
| /quiz/received | `GET`|Retorna a listagem de quizes recebidos | **Sim** | 
| /friends| `GET`|Retorna a listagem de amigos do usuário | **Sim** | 
| /friends/pendingInvitations | `GET`|Retorna a listagem das solicitações de amizade pendentes | **Sim** | 
| /friends/add?userName= | `POST`|Envia solicitação de amizade a algum usuário | **Sim** | 
| /friends/accept/:recipientId | `POST`|Aceita solicitação de amizade | **Sim** | 
| /friends/decline/:recipientId | `DELETE`|Rejeita solicitação de amizade | **Sim** | 
| /friends/remove/:relationId | `DELETE`|Remover um amigo | **Sim** | 
| /notifications | `GET`|Retorna a listagem das notificações do usuário | **Sim** | 
| /notifications/setasread | `PUT`|Atualiza as notificações recebidas como "visualizadas"| **Sim** | 

Para testar a API sem um cliente front-end você pode utilizar o Insomnia. É só clicar para importar o workspace! 

<a href="https://insomnia.rest/run/?label=QuizSphere&uri=adasdasdasdadsa.com" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia" width="22%"></a>

## ⚙ Ferramentas
[//]: # (Add the features of your project here:)
- **Node Js** — É um interpretador de JavaScript assíncrono com código aberto orientado a eventos
- **Express** — É um framework para Node.js que permite o desenvolvimento de aplicações Web de uma forma muito simples 
- **MongoDB** — Banco de dados não relacional
- **Mongoose** — Biblioteca que proporciona uma solução baseada em esquemas para modelar os dados da sua aplicação com MongoDB
- **SocketIO** — Socket.IO possibilita comunicação em tempo real, biderecional e baseada em eventos
- **JSON Web Tokens** — É uma técnica para autenticação remota entre duas partes e é uma das formas mais utilizadas para autenticar usuários em APIs RESTful.

## 🛠 Iniciando
1. Clone o repositório rodando no seu terminal/cmd ````git clone https://github.com/Gust4voSales/QuizSphere-Backend.git ```` 
2. Entre na pasta do projeto e rode ```yarn``` para instalar todas as dependências
3. Crie a o banco de dados da aplicação utilizando a plataforma MongoAtlas (seguir este tutorial: https://medium.com/@sergio13prez/connecting-to-mongodb-atlas-d1381f184369)
4. Crie um arquivo .env seguindo como base o .env.example, 
5. Preencha o arquivo .env adicionando a URL de conexão com o MongoAtlas gerada no passo anterior e os demais campos
6. Por fim,  ```yarn dev``` para iniciar o server

<hr />
Página do desenvolvimento do aplicativo no Trello - https://trello.com/b/niEoJsnl/quizspher


