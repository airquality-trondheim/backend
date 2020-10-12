import { ISession, Session } from '../models/session.model';

export async function addUserSession(userId: string, session: ISession) {
  try {
    const newSession = new Session({
      userId: session.userId,
      sessionType: session.sessionType,
      startTime: session.startTime,
      stopTime: session.stopTime,
      waypoints: session.waypoints,
    });

    await newSession.save(); 

    return newSession;

  } catch (error) {
    throw Error('Could not add user session. \n' + error);    
  }
}

export async function getAllUserSessions(userId: string) {
  try {
    const sessions = await Session.find({ userId: userId }) as ISession[];
    return sessions;
    
  } catch (error) {
    throw Error('Could not get user sessions. \n' + error); 
  }
}