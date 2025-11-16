// app/api/proxy/bookings/route.ts
import { NextResponse } from 'next/server';

const API_URL = process.env.NEST_API_URL || 'http://localhost:5001';

export async function GET() {
  const res = await fetch(`${API_URL}/booking`,{ cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json(data);
}