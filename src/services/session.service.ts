import { ISession, Session, IWaypoint, ISessionResult } from '../models/session.model';
import { PollutionLevels, PointModifiers } from '../constants';
import { getDistance } from 'geolib';
import { Broker } from '../pubsub/broker';
import { MessageTypes } from '../pubsub/message-types';

async function calculateSessionResults(waypoints: IWaypoint[]) {
  const sessionResult = {
    millisecondsElapsed: 0,
    metersTraveled: 0,
    avgKmph: 0,
    distancePoints: 0,
    safeZonePoints: 0,
    sumPoints: 0
  };
  
  for (var i = 0; i < waypoints.length - 1; i++) {
    const currentPoint = { 
      latitude: waypoints[i].latitude, 
      longitude: waypoints[i].longitude 
    }

    const nextPoint = { 
      latitude: waypoints[i + 1].latitude, 
      longitude: waypoints[i + 1].longitude 
    }

    const segmentDistance = getDistance(currentPoint, nextPoint);

    if (sessionResult.metersTraveled < 500) {
      if (waypoints[i + 1].pollutionLevel === PollutionLevels.Low) {
        sessionResult.safeZonePoints += segmentDistance * PointModifiers.Sub500mSafeZone;
      }

      sessionResult.distancePoints += segmentDistance * PointModifiers.Sub500mDistance;
      sessionResult.metersTraveled += segmentDistance;
    } else {
      if (waypoints[i + 1].pollutionLevel === PollutionLevels.Low) {
        sessionResult.safeZonePoints += segmentDistance * PointModifiers.SafeZone;
      }
      
      sessionResult.distancePoints += segmentDistance * PointModifiers.Distance;
      sessionResult.metersTraveled += segmentDistance;
    }
  }
  
  const firstTimestamp = new Date(waypoints[0].timestamp);
  const lastTimestamp = new Date(waypoints[waypoints.length - 1].timestamp);
  const timeDiff = lastTimestamp.getTime() - firstTimestamp.getTime();

  sessionResult.millisecondsElapsed = timeDiff;
  sessionResult.avgKmph = sessionResult.metersTraveled / (sessionResult.millisecondsElapsed / 1000);
  sessionResult.sumPoints = sessionResult.safeZonePoints + sessionResult.distancePoints;

  return sessionResult;
}

export async function registerUserSession(userId: string, sessionData: ISession) {
  try {
    const sessionResult = await calculateSessionResults(sessionData.waypoints);

    const newSession = new Session({
      userId: sessionData.userId,
      sessionType: sessionData.sessionType,
      startTime: sessionData.startTime,
      stopTime: sessionData.stopTime,
      waypoints: sessionData.waypoints,
      sessionResult: sessionResult
    });

    await newSession.save(); 

    Broker.emit(MessageTypes.newSession, newSession);

    return newSession;

  } catch (error) {
    throw Error('Could not register user session. \n' + error);    
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