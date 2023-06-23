import { Query } from 'appwrite';

import { DATABASE_ID, databases, PROFILES_ID } from '@/lib/client-old';

export const getUserProfileForChat = async (userID) => {
  return await databases.getDocument(DATABASE_ID, PROFILES_ID, userID, [
    Query.select(['name', 'profile_img', 'listenerID', 'lastActivity']),
  ]);
};
