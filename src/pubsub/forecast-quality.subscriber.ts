import { IUser } from '../models/user.model';
import { IForecast } from '../models/air-quality-forecast.model'
import { getUsersByArea } from '../services/user.service';
import * as PushNotificationMiddleware from '../middlewares/push.middleware';
import { AqiThresholdsForPushNotifications as thresholds } from '../constants';

export async function forecastQualitySubscriber(newForecast: IForecast) : Promise<void> {
  const todaysMeasurements = newForecast.data.filter(forecast => {
    if (forecast) {
      return isToday(new Date(forecast.to));
    }
    return false;
  });

  const aqiLevels = todaysMeasurements.map(forecast => forecast.variables.AQI.value)
  
  let pollutionLevel = thresholds.red;
  if (Math.max(...aqiLevels) > thresholds.purple.value) {
    pollutionLevel = thresholds.purple;
  } else if (Math.max(...aqiLevels) > thresholds.red.value) {
    pollutionLevel = thresholds.red;
  } else {
    // No significant measurements
    return;
  }
  
  const relevantMeasures = todaysMeasurements.filter(forecast => forecast.variables.AQI.value > pollutionLevel.value);

  // Uses only the first occurence of significant pollution level
  const firstTimeInterval = relevantMeasures[0]
  
  const time = new Date(firstTimeInterval.from)

  const message = {
    messageTitle: `${newForecast.location.name}: ${pollutionLevel.title} kl. ${time.getUTCHours()}.`,
    messageBody: pollutionLevel.description,
  }
  
  const users = await getUsersByArea(newForecast.location.name);
  
  const usersAllowingPushNotifications = users.filter((user : IUser) => user.settings.pushNotifications && (user.settings.pushToken !== ''))

  const pushTokens = usersAllowingPushNotifications.map((user : IUser) => user.settings.pushToken);

  // Push notification
  if (firstTimeInterval && pushTokens) {
    PushNotificationMiddleware.sendPushNotifications(pushTokens, message); 
  }
}

function isToday(date: Date) {
  const today = new Date();
  return date.getUTCDate() === today.getUTCDate();
}