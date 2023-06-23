import { Query } from 'appwrite';

import { DATABASE_ID, databases, MESSAGES_ID } from '@/lib/client-old';

import { Message } from '@/types/message';

export const deleteMessageById = async (id) => {
  // todo delete attachments also if exits
  await databases.deleteDocument(DATABASE_ID, MESSAGES_ID, id);
};

export const getMessageById = async (messageID) => {
  return await databases.getDocument(DATABASE_ID, MESSAGES_ID, messageID);
};

export const getMessagesByConversation = async (conversationID) => {
  const convs = await databases.listDocuments(DATABASE_ID, MESSAGES_ID, [
    Query.equal('conversationID', conversationID),
  ]);
  return convs.documents as Message[];
};
