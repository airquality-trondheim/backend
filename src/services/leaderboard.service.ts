import { IUser, User } from '../models/user.model';

export async function getUserLeaderboard(limit: number, areaName?: string) {
  try {
    const queryString = areaName ? { homeArea: areaName } : {}

    const users = await User.find(queryString)
      .lean()
      .sort({ points: 'desc', _id: 'desc' })
      .limit(limit) as IUser[];
    return users;
  
  } catch (error) {
    throw Error('Could not get user leaderboard. \n' + error);
  }
}

export async function getUserLeaderboardWithCursor(limit: number, nextPoints: number, nextId: string, areaName?: string) : Promise<IUser[]> {
  try {
    const queryString = areaName ? { homeArea: areaName } : {}

    const users = await User.find(queryString)
      .lean()
      .or([{ points: { $lt: nextPoints }}, { points: nextPoints, _id : { $lt: nextId } }])
      .sort({ points: 'desc', _id: 'desc' })
      .limit(limit) as IUser[];
    
    return users;

  } catch (error) {
    throw Error('Could not get user leaderboard with cursor. \n' + error);
  }
}

export async function getUserLeaderboardPosition(userId: string, areaName?: string) : Promise<IUser[]> {
  try {
    const user = await User.findById({ _id: userId});

    const queryString = areaName ? { homeArea: areaName } : {}

    const users = await User.find(queryString)
      .lean()
      .or([{ points: { $gt: user.points }}, { points: user.points, _id: { $gt: user._id }}, { points: user.points, _id: user._id }])
      .sort({points: 'desc', _id: 'desc'}) as IUser[];

    return users;

  } catch (error) {
    throw Error('Could not get user leaderboard position. \n' + error);
  }
}