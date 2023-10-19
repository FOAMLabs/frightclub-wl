import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from 'next';

export type UserData = {
    userID: number;
    address: string;
    ipAddress: string;
};

export const useSaveUserData = () => {
    const saveUserDataToDB = async (userData: UserData): Promise<void> => {
        try {
            const { rows } = await sql`
                INSERT INTO userData (userID, address, ipAddress)
                VALUES (${userData.userID}, ${userData.address}, ${userData.ipAddress})
                RETURNING *;
            `;
            console.log('User data saved:', rows[0]);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    return { saveUserDataToDB };
};
