import { appURL } from "@/lib/utils";
import { ActionLinkType, EVMAction } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const tokenIn = searchParams.get("tokenIn");
  const tokenOut = searchParams.get("tokenOut");
  const amountIn = searchParams.get("amountIn");
  const chainId = searchParams.get("chainId");

  const targetUrl = new URL(`${appURL()}/api/tx`);
  targetUrl.searchParams.set("tokenIn", tokenIn!);
  targetUrl.searchParams.set("tokenOut", tokenOut!);
  targetUrl.searchParams.set("amountIn", amountIn!);
  targetUrl.searchParams.set("chainId", chainId!);

  const evmActionMetadata: EVMAction = {
    title: "1inch trade EVM Action",
    description:
      "This is a sample EVM Action for performing a trade on 1inch using 1inch API",
    image: `${appURL()}/landing.png`,
    links: [
      {
        targetUrl: targetUrl.toString(),
        postUrl: `${appURL()}/tx-success`, // this will be a GET HTTP call
        label: "Tx",
        type: ActionLinkType.TX,
      },
    ],
    label: "Trade tokens",
  };
  return NextResponse.json(evmActionMetadata);
};
