import { User } from '../models/user.model';

export async function getDbUserId(awsUserId: string): Promise<string> {
  try {
    const user = await User.findOne({ awsId: awsUserId })
    return user._id;
  } catch (error) {
    throw Error(`Could not find user with aws id ${awsUserId}\n` + error);
  }
}
