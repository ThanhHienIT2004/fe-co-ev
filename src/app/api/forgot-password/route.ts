import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const javaApiRes = await fetch(
      "http://localhost:8080/api/login/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    const data = await javaApiRes.json();

    if (!javaApiRes.ok) {
      return new NextResponse(
        JSON.stringify({ message: data.message || "Lỗi từ BE" }),
        { status: javaApiRes.status }
      );
    }

    return new NextResponse(
      JSON.stringify(data),
      { status: 200 }
    );
  } 
    catch (error) {
    console.error("Lỗi API Route /api/forgot-password:", error);  
      
    return new NextResponse(
      JSON.stringify({ message: "Lỗi máy chủ nội bộ" }),
      { status: 500 }
    );
  }
}