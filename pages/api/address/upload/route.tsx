import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  // Convert the request body to a string
  const body = await request.text();
  const { filename, ...userData } = JSON.parse(body);

  if (!filename) {
      throw new Error('Filename is required');
  }

  const blob = await put(filename, JSON.stringify(userData), {
      access: 'public',
      contentType: 'application/json',  // Set the Content-Type to JSON
  });

  return NextResponse.json(blob);
}