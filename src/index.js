const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');

const app = express()
mongoose.connect('mongodb+srv://gust4:galindo1234@cluster0-xnl74.mongodb.net/quizApp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(router)


app.listen(3333);