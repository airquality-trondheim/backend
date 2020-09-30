const airData = require('./models/airData.model');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require("axios");
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
      title: "Air Quality Monitoring Application API",
      description: "This API is for the personalized air quality monitoring application developed for TDT4290, fall 2020.",
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
  apis: ['./models/*.js', './routes/*.js']
}


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

const simpleLogger = (req, res, next) => {
  console.log(`${req.protocol}://${req.hostname}${req.path}`);
  next();
}
app.use(simpleLogger);

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/test';
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
const leaderboardRouter = require('./routes/leaderboard');
const populateRouter = require('./routes/populate');

app.use('/users', usersRouter);
app.use('/airQuality', apiRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/populate', populateRouter);




function tick() {
    var mins = new Date().getMinutes();
    var sec = new Date().getSeconds();
    var mili = new Date().getMilliseconds();
    if (mins == "37" && sec == "00" ) {
      airData.deleteMany({zone: "Trondheim"})
      .then(() => console.log('Data deleted'))
      axios.get("http://localhost:5000/airQuality/add")
       .then(response => console.log(response.data))  
    }
    // console.log('Tick ' + mins + ":"+ sec);
  }
  
  setInterval(tick, 1000);

app.listen(port, hostname, () => {
  console.log(`Server is running on https:\/\/${hostname}:${port}`);

