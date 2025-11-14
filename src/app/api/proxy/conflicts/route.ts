// app/api/proxy/conflicts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { conflictApi } from '@/libs/apis/conflict';

export async function GET(req: NextRequest) {
  try {
    const conflicts = await conflictApi.getAll();
    return NextResponse.json(conflicts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newConflict = await conflictApi.create(body);
    return NextResponse.json(newConflict, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


