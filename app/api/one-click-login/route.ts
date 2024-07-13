import { SIWEMessage } from "@/lib/siwe";
import { appURL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { baseSepolia } from "viem/chains";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { address } = body;
  const nonce = Date.now().toString();
  const messageToSign: SIWEMessage = {
    domain: `${appURL().replace("https://", "")}`,
    address,
    uri: appURL(),
    version: "1",
    chainId: baseSepolia.id,
    nonce,
    issuedAt: new Date().toISOString(),
  };
  return NextResponse.json(messageToSign);
};
