// app/api/proxy/usages/route.ts
import { NextResponse } from 'next/server';

const API_URL = process.env.NEST_API_URL || 'http://localhost:3000';

export async function GET() {
  const res = await fetch(`${API_URL}/usage`);
  const data = await res.json();
  return NextResponse.json(data);
}