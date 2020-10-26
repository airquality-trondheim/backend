import { IArea, Area } from '../models/area.model';

export async function getAreas() {
  try {
    const areas = await Area.find({});
    return areas;

  } catch (error) {
    throw Error('Could not get areas. \n' + error);
  }
}

export async function refreshAreas(areas: IArea[]) {
  try {
    await Area.collection.drop();
    const newAreas = await Area.insertMany(areas) as IArea[];
    return newAreas;

  } catch (error) {
    throw Error('Could not add areas. \n' + error);
  }
}