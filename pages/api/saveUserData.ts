import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function saveUserData(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userID, address, ipAddress } = req.body
    try {
      const userData = await prisma.userData.create({
        data: { userID, address, ipAddress },
      })
      res.status(201).json(userData)
    } catch (error) {
      res.status(500).json({ error: 'Unable to save user data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}