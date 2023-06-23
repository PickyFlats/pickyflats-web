import { ID } from 'appwrite';
import { useState } from 'react';

import { CONTENT_BUCKET, storage } from '@/lib/client-old';

interface IUseFileUploader {
  onSuccess: (keys: string[] | null) => void;
  mykeys: string[];
  setMyKeys: (str: string[]) => void;
}

function useFileUploader({ onSuccess, mykeys, setMyKeys }: IUseFileUploader) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [uploadedFileIDs, setUploadedFileIDs] = useState<string[]>([]);

  const upload = async (files: File[]) => {
    setIsLoading(true);
    try {
      const newUploadedIDs: string[] = [...(uploadedFileIDs ?? [])];
      for await (const file of files) {
        const uploadedFile = await storage.createFile(
          CONTENT_BUCKET,
          ID.unique(),
          file
        );
        setUploadedFileIDs((keys) => [...keys, uploadedFile.$id]);
        newUploadedIDs.push(uploadedFile.$id);
      }
      onSuccess(newUploadedIDs);
    } catch (error: any) {
      setUploadError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadedFileIDs, isLoading, uploadError, upload };
}

export default useFileUploader;
