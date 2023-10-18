import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleUserId(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { address } = req.body;
  
  if (!address) {
    return res.status(400).json({ error: 'Address not provided' });
  }

  // Endpoint and API key
  const ENDPOINT = process.env.ADDRESS_ENDPOINT;
  const ADDRESS_API = process.env.ADDRESS_API; 

  if (!ENDPOINT || !ADDRESS_API) {
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  // Fetch the latest userID for the address
  let response = await fetch(ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADDRESS_API}`,
    },
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to fetch userID' });
  }

  const data = await response.json();
  const currentUserId = data.userId || 0;
  const incrementedUserId = currentUserId + 1;

  // Save the incremented userId back to the database
  response = await fetch(ENDPOINT, {
    method: 'POST',  // Use the appropriate method if it's not POST
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADDRESS_API}`,
    },
    body: JSON.stringify({
      userId: incrementedUserId,
      address: address,
    }),
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to save incremented userID' });
  }

  return res.json({ userId: incrementedUserId });
}