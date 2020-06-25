<h1 align="center">
<img src="https://i.imgur.com/HMr0tyZ.png" alt="icon" height="100">
<br>
QuizSphere
</h1>

<p align="center">Create public or private quizzes, favorite the best ones and share them with your friends.</p>
App link in the PlayStore: https://play.google.com/store/apps/details?id=com.gust4
<p>Server link hosted in Heroku: https://quiz-sphere-backend.herokuapp.com/</p>

<hr />

## 📜About
This project contains the backend from the QuizSphere application (frontend mobile code: https://github.com/Gust4voSales/QuizSphere-Cliente).
The app was developed with the objective of gaining experience and knowledge using updated technologies. QuizSphere is a mix of a quiz game and social networking features.

What the app does/allows:
 - Play quizzes;
 - You can create quiz games that can be either public or private (only the author from the quiz or whomever
has received the private quiz can play it);
 - Search for quizzes;
 - Evaluate quizzes with likes;
 - Add/remove a quiz from your favorites' list
 - Add friends;
 - Share quiz with your friends;
 - Receive real-time notifications in the app whenever a user accepts your friends invitations or when someone shares a quiz with you; 

## 🧩Server routes
| Route | HTTP method |  Function | Requires authentication | 
| --- | --- | --- | --- |
| /auth/register |  `POST` | Creates a new user and returns an authentication Token | **No** | 
| /auth/authenticate | `POST` |Performs user login returning an authentication Token if success | **No** | 
| /quiz | `GET`|Returns the quiz list, filters can be added | **Yes** | 
| /quiz | `POST`| Creates a new quiz | **Yes** | 
| /quiz/:id | `GET`| Receives the quiz ID and returns its data | **Yes** | 
| /quiz/:quizId/like | `POST`|Likes the quiz | **Yes** | 
| /quiz/:quizId/deslike | `DELETE`|Removes like from quiz | **Yes** | 
| /user/:id | `GET`|Returns user’s info | **Yes** | 
| /user/savedQuizzes | `GET`|Returns the user favorite quizzes list | **Yes** | 
| /user/savedQuizzes/:quizId | `POST`|Adds a quiz to the user’s favorites quizzes | **Yes** | 
| /user/savedQuizzes/:quizId | `DELETE`|Removes a quiz from the user favorites quizzes list | **Yes** | 
| /user/notifications | `GET`|Returns the user notification list | **Yes** | 
| /user/notifications/setSeenActivities | `PUT`|Updates the received notifications as “seen”| **Yes** | 
| /user/friend | `GET`|Returns the user friend list | **Yes** | 
| /user/friend | `POST`|Sends friendship invitation to some user | **Yes** | 
| /user/friend/:relationId | `DELETE`|Removes friendship | **Yes** | 
| /user/friend/pendingInvitations | `GET`|Returns pending friendship invitations list | **Yes** | 
| /user/friend/acceptInvitation/:recipientId | `POST`|Accepts friendship invitation | **Yes** | 
| /user/friend/declineInvitation/:recipientId | `DELETE`|Rejects friendship invitation | **Yes** | 
| /shareQuiz | `GET`|Returns received quiz list | **Yes** | 
| /shareQuiz/:quizId | `POST`|Shares a quiz with a friend | **Yes** | 


## ⚙Features
[//]: # (Add the features of your project here:)
- **Node Js** — An asynchronous event-driven JavaScript runtime
- **Express** — A Node.js framework that allows an easy way to develop web applications
- **MongoDB** — Non-relation database
- **Mongoose** — A library that provides a schema-based solution to model your application data with MongoDB 
- **SocketIO** — Socket.IO enables real-time, bidirectional and event-based communication.
- **JSON Web Tokens** — It's a technique for remote authentication between two parts and it's one of the most used strategies to authenticate users in APIs RESTful 


## 🛠Installation
1. Clone this repo running on your terminal ````git clone https://github.com/Gust4voSales/QuizSphere-Backend.git ```` 
2. Inside the project's folder run ```yarn``` to install all dependencies
3. Create the application's database using MongoAtlas platform (follow this tutorial: https://medium.com/@sergio13prez/connecting-to-mongodb-atlas-d1381f184369)  
4. Create a .env file based on the .env.example 
5. Fill the .env file adding the MongoAtlas connection URL generated on the previous step and the others fields as well 
6. Lastly, ```yarn dev``` to start the server

<hr />
App development page on Trello - https://trello.com/b/niEoJsnl/quizspher


