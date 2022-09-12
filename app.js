const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/handleError');
const { NotFoundError } = require('./utils/errors/notFound');
const auth = require('./middlewares/auth');
const { PORT, database } = require('./config');

const app = express();

mongoose.connect(database, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(requestLogger);
app.use(cors());

app.use(require('./routes/auth'));

app.use(auth);
app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use((req, res, next) => {
  next(new NotFoundError('Cтраницы не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
