// hooks/useSaveUserData.ts
interface UserData {
    userID: number;
    address: string;
    ipAddress: string;
  }
  
  export const useSaveUserData = () => {
    const saveUserDataToDB = async (userData: UserData): Promise<void> => {
      try {
        const response = await fetch('/api/saveUserData', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const responseData = await response.json();
        console.log('User data saved:', responseData);
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    };
    
    return { saveUserDataToDB };
  };
  