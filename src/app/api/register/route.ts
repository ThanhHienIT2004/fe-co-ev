import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role_id } = body;
    const javaApiRes = await fetch(
      "http://localhost:8080/api/login/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            name: name, 
            email: email, 
            password: password, 
            role_id: 1
        }),
      }
    );

    const data = await javaApiRes.json();

    if (!javaApiRes.ok) {
      return new NextResponse(
        JSON.stringify({ message: data.data || "Đăng ký thất bại" }),
        { status: javaApiRes.status }
      );
    }

    return new NextResponse(
      JSON.stringify(data),
      { status: 201 }
    );

  } catch (error) {
    console.error("LỖI TRONG API ROUTE /api/register:", error);
    return new NextResponse(
      JSON.stringify({ message: "Lỗi máy chủ nội bộ" }),
      { status: 500 }
    );
  }
}