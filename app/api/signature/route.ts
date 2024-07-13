import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const messageToSign = "This is a sample message to sign";
  return NextResponse.json({ message: messageToSign });
};
