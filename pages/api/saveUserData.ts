import mongoose, { ConnectOptions } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define connection object with type
const connection: { isConnected?: boolean } = {};

if (!connection.isConnected) {
  const dbOptions: ConnectOptions = {
  };

  mongoose.connect(process.env.MONGODB_URI!, dbOptions);

  const isConnected = mongoose.connection.readyState === 1;
}

const UserDataSchema = new mongoose.Schema({
  userID: Number,
  address: String,
  ipAddress: String
});

const UserData = mongoose.models.UserData || mongoose.model('UserData', UserDataSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const userData = req.body;
      const newUserData = new UserData(userData);
      const savedData = await newUserData.save();
      
      res.status(200).json({ success: true, data: savedData });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
