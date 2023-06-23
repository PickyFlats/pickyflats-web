/* eslint-disable @next/next/no-img-element */
interface Iprops {
  fileID: string;
}

import { CONTENT_BUCKET, storage } from '@/lib/client-old';

export const ImageCard = (props: Iprops) => {
  const { fileID } = props;

  const file = storage.getFilePreview(CONTENT_BUCKET, fileID);

  return (
    <div className='relative h-full w-full'>
      <img
        src={file.href}
        alt='preview image'
        className=' h-full w-full rounded-md object-cover'
      />

      {/* <div className='absolute top-0 right-0'><IconButton onClick={()=>deleteImg()}>D</IconButton></div> */}
    </div>
  );
};
