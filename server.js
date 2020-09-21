const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;
const hostname = process.env.HOST || '127.0.0.1';

// See: https://swagger.io/specification/#openapi-object
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Sample Pet Store App",
      description: "This is a sample server for a pet store.",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.example.com/support",
        email: "support@example.com"
      },
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html"
      },
      version: "1.0.1"
    },
  },
  apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

app.listen(port, hostname, () => {
  console.log(`Server is running on https:\/\/${hostname}\/${port}`);
});
