import { IStation, Station } from '../models/station.model';

export async function getStations() {
  try {
    const stations = await Station.find({});
    return stations;

  } catch (error) {
    throw Error('Could not get stations. \n' + error);
  }
}

export async function refreshStations(stations: IStation[]) {
  try {
    await Station.deleteMany({});
    const newStations = await Station.insertMany(stations) as IStation[];
    return newStations;

  } catch (error) {
    throw Error('Could not refresh stations. \n' + error);
  }
}