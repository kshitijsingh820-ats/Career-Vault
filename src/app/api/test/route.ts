import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "CareerVault API is working!",
  });
}