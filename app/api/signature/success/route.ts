import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { signature, message, address } = body;
  // do something with the signature
  return NextResponse.json({ message: "ok" });
};
