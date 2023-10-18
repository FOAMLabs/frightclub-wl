const mongoose = require('mongoose');
const UserData = require('../../models/UserData'); // Make sure this path is correct

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userID, address, ipAddress } = req.body;
    const newUserData = new UserData({ userID, address, ipAddress });

    try {
      await newUserData.save();
      res.status(200).json({ message: 'User data saved successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving user data to the database.', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}