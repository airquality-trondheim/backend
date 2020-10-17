import { User } from '../models/user.model';

export async function getAllUsers() {
  try {
    const users = await User.find({});
    return users;

  } catch (error) {
    throw Error('Could not get all users. \n' + error);
  }
}

export async function addUser(requestBody: any) {
  try {
    const newUser = new User({ usename: requestBody.username });
    await newUser.save();
    return newUser;

  } catch (error) {
    throw Error('Could not add user. \n' + error);
  }
}

export async function getUser(userId: string) {
  try {
    const user = await User.findById({ _id: userId });
    return user;

  } catch (error) {
    throw Error('Could not get user. \n' + error);
  }
}

export async function updateUser(userId: string, requestBody: any) {
  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, requestBody, { new: true }).lean();
    return updatedUser;
  
  } catch (error) {
    throw Error('Could not update user. \n' + error);
  }
}

export async function deleteUser(userId: string) {
  try {
    await User.findByIdAndDelete({ _id: userId });
    return;

  } catch (error) {
    throw Error('Could not delete user. \n' + error);
  }
}

export async function addUserPoints(userId: string, points: number) {
  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { $inc: { points: points }}, { new: true });
    return updatedUser;
  
  } catch (error) {
    throw Error('Could not update user points. \n' + error);
  }
}

export async function getUserPoints(userId: string) {
  try {
    const user = await User.findById({ _id: userId });
    return user.points;
  } catch (error) {
    throw Error('Could not get user points. \n' + error);
  }
}

export async function updateUserSettings(userId: string, newSettings: any) {
  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { settings: newSettings }, { new: true }).lean();
    return updatedUser;
  
  } catch (error) {
    throw Error('Could not update user. \n' + error);
  }
}