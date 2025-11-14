// app/api/proxy/bookings/route.ts
import { NextResponse } from 'next/server';

const API_URL = process.env.NEST_API_URL || 'http://localhost:5001/booking';

export async function GET() {
  const res = await fetch(`${API_URL}/get-all-bookings`);
  const data = await res.json();
  return NextResponse.json(data);
}