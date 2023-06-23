/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { PROFILES_BUCKET, storage } from '@/lib/client-old';
import { timeAgo } from '@/lib/date';

import useAuthStore from '@/store/useAuthStore';

import { Conversation } from '@/types/conversation';

export default function ConversationItem({ item }: { item?: Conversation }) {
  const { user } = useAuthStore();
  const avatar = storage.getFilePreview(
    PROFILES_BUCKET,
    item?.participant?.profilePicture ?? ''
  );

  const lastActivityDate = item?.participant?.lastActivity
    ? new Date(item?.participant.lastActivity)
    : null;
  const differenceInMinutes = lastActivityDate
    ? (new Date().getTime() - lastActivityDate?.getTime()) / (1000 * 60)
    : null;

  const userActive =
    lastActivityDate && differenceInMinutes && differenceInMinutes < 1;
  return (
    <div className='flex items-start p-2'>
      <div className='relative flex-shrink-0'>
        {item?.participant?.profilePicture ? (
          <img
            src={avatar.href}
            alt='Avatar'
            className='inline-flex h-10 w-10 items-center justify-center rounded-full'
          />
        ) : (
          <div className='bg-primary-light relative inline-flex h-10 w-10 items-center justify-center rounded-full'>
            <span className='text-md font-bold uppercase text-white'>
              {item?.participant?.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        {userActive && (
          <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500' />
        )}
      </div>
      <div className='ml-4'>
        <p className='font-bold'>{item?.participant?.name}</p>
        <p className='text-gray-600'>
          {user?.$id === item?.lastMessage?.senderID ? 'You: ' : ''}
          {item?.lastMessage?.message}
        </p>
      </div>
      <div className='ml-auto text-sm text-gray-500'>
        {timeAgo(new Date((item?.lastUpdated || item?.$updatedAt) ?? ''))}
      </div>
    </div>
  );
}
