## How to run the project
Clone the project:
``` git clone ...```

After cloning the repository, move into the newly created directory.

Install packages:
``` npm install ```

Start the server:
``` npm run dev ```
or
``` nodemon dist/server.js & tsc -w ```

Remember to run a local instance of [MongoDB](https://www.mongodb.com/). The code will now run at localhost:5002. with the default database connection string ```mongodb://localhost:27017/test```
