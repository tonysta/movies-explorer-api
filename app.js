const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { usersRouter } = require('./routes/users');
const { moviesRouter } = require('./routes/movies');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
