import { Request, Response, NextFunction } from 'express';
const CognitoExpress = require('cognito-express');

const cognitoExpress = new CognitoExpress({
  region: 'eu-central-1',
  cognitoUserPoolId: 'eu-central-1_Qt8vhCEWi',
  tokenUse: 'access',
  tokenExpiration: 3600000, // In ms (3600000 => 1 hour)
});

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  let accessTokenFromClient = req.headers.accesstoken;
  
  if (!accessTokenFromClient)
    return res.status(401).send('Access Token missing from header');

  cognitoExpress.validate(accessTokenFromClient, (err: any, response: any) => {
    if (err) return res.status(401).send(err);

    // Access token authenticated, proceed.
    res.locals.user = response;
    next();
  });
}