import { Level, ILevel } from '../models/level.model';

export async function addLevel(levelData: ILevel) {
  try {
    const newLevel = new Level(levelData);
    await newLevel.save();
    return newLevel;

  } catch (error) {
    throw Error('Could not add level. \n' + error);
  }
}

export async function getLevel(levelNo: number) {
  try {
    const level = await Level.findOne({ levelNo: levelNo });
    return level;

  } catch (error) {
    throw Error('Could not get level. \n' + error);
  }
}

export async function updateLevel(levelNo: number, levelData: ILevel) {
  try {
    const updatedLevel = await Level.findOneAndUpdate({ levelNo: levelNo }, levelData, { new: true }) as ILevel; 
    return updatedLevel;

  } catch (error) {
    throw Error('Could not get user leaderboard. \n' + error);
  }
}