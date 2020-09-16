const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`Mongo database connection established successfully`);
});

const usersRouter = require('./routes/users');
const apiRouter = require('./routes/airQuality');

app.use('/users', usersRouter);
app.use('/airQuality', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
