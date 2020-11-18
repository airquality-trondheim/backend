# Frisk Server Application
The Frisk server application is a Node.js application developed for the course Customer Driven Project -- TDT4290 during the fall semester of 2020. The application is part of an air quality monitoring system comissioned by Telenor and NTNU in collaboration with Trondheim municipality. It serves a corresponding client application. At the time of writing this readme (2020-11-17), there is a live production version of the application at http://ec2-18-192-82-31.eu-central-1.compute.amazonaws.com/.

## Build steps
Clone the project:
``` bash
git clone ...
```

After cloning the repository, move into the newly created directory.

Install packages:
``` bash 
npm install 
```

Start the server:
``` bash 
npm run dev 
```

The application is by default served at ```http://localhost:5002/```. 

## Concept
The server application serves air quality data for given areas in Trondheim, where area correspond to delområde, a [statistical unit from SSB](https://www.ssb.no/a/metadata/definisjoner/variabler/main.html). These areas, along with stations, are also served as lists. The application stores and updates user documents. The application registers both a home area and a push notification setting for each user, which in combination may result in a push notification trigger when air pollution reaches certain levels. The application also registers sessions for users. It then calculates point results from these sessions, which it adds to the user document. The server application stores these completed sessions along with their results. When specific amounts of points are earned, the user gains levels. When specific conditions are met, achievements are added to the user document. The application has a leaderboard feature which either serves a global or an area specific list of users by amount of points in descending order.

## Implementation Notes
Three update functions are responsible for collecting the necessary data in terms of air quality, areas, and stations, located in respectively labelled controller files in the repository:  ``` src/controllers/air-quality.controller.ts ```,  ``` src/controllers/area.controller.ts ```, and  ``` src/controller/station.controller.ts ```. The data is collected from the [MET air quality API](https://api.met.no/weatherapi/airqualityforecast/0.1/documentation). An air quality API from Telenor and NTNU was under development during the course project, however it did not provide all the information required for the application concept. Instead of fetching only certain items from either API, it was decided that the data would continue to be collected from the MET API, until the other API was fully featured. The base URL for the API used for these updating functions is located in ``` src/constants.ts ```. 

The current updating solution relies on an Amazon Lambda function to hit the corresponding API endpoints to trigger the update. Internal timed tasks would not work in a monolith architecture when scaling occurs, as the action would be duplicated .

The user account system relies on _Amazon Web Services'_ ([AWS](https://aws.amazon.com/)) _Identity & Access Management_ ([IAM](https://aws.amazon.com/iam/)) system by using [_Amazon Cognito_](https://aws.amazon.com/cognito/) through the provided [_Amazon Amplify_](https://aws.amazon.com/amplify/) javascript library. As an aside, the client application uses assets that are hosted using [AWS S3 Storage](https://aws.amazon.com/s3/). 

The whole system is hosted using [_AWS Elastic Beanstalk_](https://aws.amazon.com/elasticbeanstalk/) and [_Amazon EC2_](https://aws.amazon.com/ec2/).

The system also uses a custom Amazon Lambda function with a post-confirmation trigger for copying user-data (AWS-ID and username) to the system database. The trigger happens when a new user confirms their email through the provided sign-up system, simply sending a POST request with the data to the ```/users``` endpoint. 

For an efficient development process, Continuous Deployment was implemented through [_AWS CodePipeline_](https://aws.amazon.com/codepipeline/).

Furthermore, AWS hosts the [MongoDB](https://www.mongodb.com/) database for the server application. Due to technical difficulties the connection string to the  MongoDB instance is stored in plain text in the source code. However, the MongoDB instance only has the production server address whitelisted.  

For emitting push notification, the system leverages a [development kit for Expo](https://github.com/expo/expo-server-sdk-node) along with Expo's notification infrastructure, owing to the fact that the client application is written in React Native, which also uses [Expo](https://docs.expo.io/).

## Features

<img src="https://user-images.githubusercontent.com/47078189/99588697-482e9d80-29eb-11eb-806b-a7f48eaa8635.png" width="500">

- Served auto-generated Swagger API documentation
- Authenticated routes
- Cursor paginated leaderboard with optional sorting parameter for areas
- Publish-Subscribe messaging for achievement condition checking and rewarding. 
- Input data validation
- Push notification system
- Simple level progression system

## Architecture
The following diagram shows the conceptual structure of the code.

<img src="https://user-images.githubusercontent.com/47078189/99582175-0cdba100-29e2-11eb-92dd-5535a8cd52d3.png" width="500">

In short, the application is a single monolithic code base. It follows a layered pattern, where a defined stack of layers may only call into immediately adjacent layers. The top layer is the routing layer, which deals with routing of requests and responses. The controller layer accepts requests and builds responses by calling into the service layer, which performs business logic and interfaces with the data layer. The data layer deals with the interactions between the application and the database. Cross cutting concerns like security are dealt with at every level.


## Technologies
In rough terms, the technology stack consists of three elements. All the code executes in the [Node.js](https://nodejs.org/) runtime. [Express.js](https://expressjs.com/) handles routing for the application. [Mongoose.js](https://mongoosejs.com/) handles the object modeling and interaction between server application and the MongoDB database.


### Production dependencies
- axios 0.19.2, for making network requests
- cognito-express 2.0.18, for authentication
- cors 2.8.5, for managing cross-origin resource sharing
- date-fns 2.16.1, for time and date arithmethic
- dotenv 8.2.0, for environment variables
- expo-server-sdk 3.6.0, for notifications
- express 4.17.1, for routing
- geolib 3.3.1, for geospatial arithmethic
- mongoose 5.10.4, for mongoDB object modeling
- swagger-jsdoc 4.0.0, for generating swagger documentation
- swagger-ui-express 4.1.4, for generating a served API documentation page
- typescript 4.0.3, for typed javascript
- validator 13.1.17, for request data validation

### Development dependencies
- @types/express 4.17.8, for type annotations for Express.js
- @types/mongoose 5.7.36, for type annotations for Mongoose.js
- @types/node 14.11.2, for type annotations for Node.js
- @typescript-eslint/eslint-plugin 4.4.0, helper for eslint typescript compatibiltiy
- @typescript-eslint/parser 4.4.0, helper for eslint typescript compatibiltiy
- concurrently 5.3.0, for simulaneous execution of commands
- eslint 7.11.0, for static code analysis and linting
- nodemon 2.0.4, for automatic reloading of application on save
