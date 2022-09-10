const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { usersRouter } = require('./routes/users');
const { moviesRouter } = require('./routes/movies');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(requestLogger);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Cтраницы не существует'));
});

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
