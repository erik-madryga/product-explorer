import { NextResponse } from "next/server";
import mockedData from "../../../../lib/mockedData.json";

export async function GET(request: any, { params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = await params;
  const userId = Number(resolvedParams.userId);
  const user = mockedData.users.find(u => u.id === userId);
  if (!user){
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}