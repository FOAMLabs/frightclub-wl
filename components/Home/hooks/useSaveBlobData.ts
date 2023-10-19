// hooks/useSaveBlobData.ts
import { useSaveUserData } from './useSaveUserData';

export const useSaveBlobData = () => {
  const { saveUserDataToDB } = useSaveUserData();

  const saveBlobData = async (blobData: typeof UserData): Promise<void> => {
    const filename = `UserData_${blobData.userID}.json`;
    const blobContent = JSON.stringify({ filename, ...blobData });

    try {
      // Save data as a blob
      const response = await fetch(`/api/address/upload/route`, {
        method: 'POST',
        body: blobContent,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const blobInfo = await response.json();
      console.log('Blob URL:', blobInfo.url);

      // Save data to Postgres database
      await saveUserDataToDB(blobData);
    } catch (error) {
      console.error('Error saving blob data:', error);
    }
  };

  return { saveBlobData };
};