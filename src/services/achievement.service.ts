import { Achievement, IAchievement } from '../models/achievement.model';

/**
 * Gets all achievment documents.
 * 
 * @async
 * @function addAchievement
 * @returns {Promise<IAchievement[]>} Returns all achievement documents.
 * @throws Will throw an error if the achievement documents could not be retrieved.
 */
export async function getAllAchievements(): Promise<IAchievement[]> {
  try {
    const achievements = await Achievement.find({});
    return achievements;

  } catch (error) {
    throw Error('Could not get all achievements. \n' + error);
  }
}

/**
 * Create a new achievement document.
 * 
 * @async
 * @function addAchievement
 * @param {IAchievement} requestBody - The request body of the request parsed into an achievement interface.
 * @returns {IAchievement} The newly created achievement document.
 * @throws Will throw an error if the achievement document could not be created.
 */
export async function addAchievement(requestBody: IAchievement): Promise<IAchievement> {
  try {
    const newAchievement = new Achievement({
      name: requestBody.name,
      category: requestBody.category,
      iconUrl: requestBody.iconUrl,
      description: requestBody.description,
      value: requestBody.value
    });

    await newAchievement.save();
    return newAchievement;    

  } catch (error) {
    throw Error('Could not create Achievement document. \n' + error);
  }
}

/**
 * Delete an achievement document.
 * 
 * @async
 * @function deleteAchievement
 * @param {string} achievementId - The document object id of the achievement document.
 * @throws Will throw an error if the achievement document could not be deleted.
 */
export async function deleteAchievement(achievementId: string) {
  try {
    await Achievement.findOneAndDelete({ _id: achievementId })
    return;
    
  } catch (error) {
    throw Error('Could not delete Achievement document. \n' + error);
  }
}

/**
 * Retrieve an achievement document.
 * 
 * @async
 * @function getAchievement
 * @param {string} achievementId - The document object id of the achievement document.
 * @returns {IAchievement} The specified achievement document.
 * @throws Will throw an error if the achievement document could not be retrieved.
 */
export async function getAchievementById(achievementId: string): Promise<IAchievement> {
  try {
    const achievement = await Achievement.findById({ _id: achievementId });
    return achievement;

  } catch (error) {
    throw Error('Could not get Achievement document. \n' + error);
  }
}

/**
 * Retrieve an achievement document by name.
 * 
 * @async
 * @function getAchievement
 * @param {string} achievementId - The document object id of the achievement document.
 * @returns {IAchievement} The specified achievement document.
 * @throws Will throw an error if the achievement document could not be retrieved.
 */
export async function getAchievementByName(achievementName: string): Promise<IAchievement> {
  try {
    const achievement = await Achievement.findOne({ name: achievementName });
    return achievement;

  } catch (error) {
    throw Error('Could not get Achievement document. \n' + error);
  }
}

/**
 * Update an achievement document.
 * 
 * @async
 * @function updateAchievement
 * @param {string} achievementId - The document object id of the achievement document.
 * @returns {IAchievement} The updated achievement document.
 * @throws Will throw an error if the achievement document could not be updated.
 */
export async function updateAchievement(achievementId: string, requestBody: any): Promise<IAchievement> {
  try {
    const achievement = await Achievement.findByIdAndUpdate({ _id: achievementId }, requestBody, { new: true })
    return achievement;
    
  } catch (error) {
    throw Error('Could not update Achievement document. \n' + error);
  }
}