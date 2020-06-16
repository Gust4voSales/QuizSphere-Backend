const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const { PORT, MONGODB_URL, } = require('./config');
const cors = require('cors');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const router = require('./routes');
const configureSocket = require('./socket.config');

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

configureSocket(io, app);

app.use(cors());
app.use(express.json());
app.use(router);


server.listen(PORT || 3333);