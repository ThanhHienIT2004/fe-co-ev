// app/api/funds/callback/route.ts
import { NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await axios.post('http://localhost:8082/api/funds/callback', body);
    return new Response('OK', { status: 200 });
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}