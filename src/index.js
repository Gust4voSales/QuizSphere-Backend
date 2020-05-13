const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const router = require('./routes');
const configureSocket = require('./socket.config');


mongoose.connect('mongodb+srv://gust4:galindo1234@cluster0-xnl74.mongodb.net/quizApp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

configureSocket(io, app);

app.use(cors());
app.use(express.json());
app.use(router);


server.listen(3333);