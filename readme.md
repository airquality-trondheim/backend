# Frisk Server Application
---
The Frisk server application is a Node.js application developed for the course Customer Driven Project -- TDT4290 during the fall semester of 2020. The application is part of an air quality monitoring system comissioned by Telenor and NTNU in collaboration with Trondheim municipality. It serves a corresponding client application. At the time of writing this readme (2020-11-17), there is a live production version of the application at http://ec2-18-192-82-31.eu-central-1.compute.amazonaws.com/.

## Build steps
---
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
---
The server application serves air quality data for given areas in Trondheim, where area correspond to delområde, a [statistical unit from SSB](https://www.ssb.no/a/metadata/definisjoner/variabler/main.html). Furthermore, the application 

## Implementation Notes
---
Three update functions are responsible for collecting the necessary data in terms of air quality, areas, and stations, located in respectively labelled controller files in the repository:  ``` src/controllers/air-quality.controller.ts ```,  ``` src/controllers/area.controller.ts ```, and  ``` src/controller/station.controller.ts ```. The data is collected from the [MET air quality API](https://api.met.no/weatherapi/airqualityforecast/0.1/documentation). An air quality API from Telenor and NTNU was under development during the course project, however it did not provide all the information required for the application concept. Instead of fetching only certain items from either API, it was decided that the data would continue to be collected from the MET API, until the other API was fully featured. The base URL for the API used for these updating functions is located in ``` src/constants.ts ```. This solution currently relies on an Amazon Lambda function to hit the corresponding API endpoints to trigger the update. Internal timed tasks would not work in a monolith

The user account system relies on _Amazon Web Services'_ ([AWS](https://aws.amazon.com/)) _Identity & Access Management_ ([IAM](https://aws.amazon.com/iam/)) system by using [_Amazon Cognito_](https://aws.amazon.com/cognito/) through the provided [_Amazon Amplify_](https://aws.amazon.com/amplify/) javascript library. As an aside, the client application uses assets that are hosted using [AWS S3 Storage](https://aws.amazon.com/s3/). 

The whole system is hosted using [_AWS Elastic Beanstalk_](https://aws.amazon.com/elasticbeanstalk/) and [_Amazon EC2_](https://aws.amazon.com/ec2/).

The system also uses a custom Amazon Lambda function with a post-confirmation trigger for copying user-data (AWS-ID and username) to the system database. The trigger happens when a new user confirms their email through the provided sign-up system, simply sending a POST request with the data to the ```/users``` endpont. 

For an efficient development process, Continuous Deployment was implemented through [_AWS CodePipeline_](https://aws.amazon.com/codepipeline/).

For emitting push notification, the system leverages a [development kit for Expo](https://github.com/expo/expo-server-sdk-node) along with Expo's notification infrastructure, owing to the fact that the client application is written in React Native, which also uses [Expo](https://docs.expo.io/).

## Features
---
- Served auto-generated Swagger API documentation
- Authenticated routes
- Cursor paginated leaderboard with optional sorting parameter for areas
- Publish-Subscribe messaging for achievement condition checking and rewarding. 
- Input data validation
- Push notification system

## Architecture
---
In short, the application follows a layered pattern, where a defined stack of layers may only call into immediately adjacent layers. 




## Technologies
---
In rough terms, the technology stack consists of [Express.js]
[MongoDB](https://www.mongodb.com/)

### Production dependencies
- axios 0.19.2
- cognito-express 2.0.18
- cors 2.8.5
- date-fns 2.16.1
- dotenv 8.2.0
- expo-server-sdk 3.6.0
- express 4.17.1
- geolib 3.3.1
- mongoose 5.10.4
- swagger-jsdoc 4.0.0
- swagger-ui-express 4.1.4
- typescript 4.0.3
- validator 13.1.17

### Development dependencies
- @types/express 4.17.8
- @types/mongoose 5.7.36
- @types/node 14.11.2
- @typescript-eslint/eslint-plugin 4.4.0
- @typescript-eslint/parser 4.4.0
- concurrently 5.3.0
- eslint 7.11.0
- nodemon 2.0.4
