export const enum PollutionLevels {
  Low = 'Lav',
  Medium = 'Middels',
  High = 'Høy'
}

export const enum PointModifiers {
  Sub500mDistance = 0.1,
  Sub500mSafeZone = 0.05,
  Distance = 0.04,
  SafeZone = 0.02
}

export const enum Urls {
  apiBaseUrl = 'https://api.met.no/weatherapi/airqualityforecast/0.1'
}

export const AqiThresholdsForPushNotifications = {
  red: {
    value: 1,
    title: 'Betydelig helserisiko',
    description: 'Barn, gravide, syke og eldre bør vurdere begrenset utendørs fysisk aktivitet.',
  },
  purple: {
    value: 4,
    title: 'Alvorlig helserisiko',
    description: 'Vurder å ikke oppholde deg utendørs i lengre perioder. Barn, gravide, syke og eldre må være spesielt forsiktige.',
  },
}