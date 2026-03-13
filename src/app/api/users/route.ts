import { NextResponse } from "next/server";
import mockedData from "../../../lib/mockedData.json";

export async function GET() {
  return NextResponse.json(mockedData.users);
}