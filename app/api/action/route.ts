import { appURL } from "@/lib/utils";
import { ActionLinkType, EVMAction } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  console.log(searchParams.get('tokenInput'), searchParams.get('tokenOutput'), searchParams.get('amountIn'), "tokenInput, tokenOutput, amountIn");

  const evmActionMetadata: EVMAction = {
    title: "1inch trade EVM Action",
    description: "This is a sample EVM Action for performing a trade on 1inch using 1inch API",
    image: "https://placehold.co/955x500",
    links: [
      {
        targetUrl: `${appURL()}/api/tx?tokenInput=${searchParams.get('tokenInput')}&tokenOutput=${searchParams.get('tokenOutput')}&amountIn=${searchParams.get('amountIn')}`,
        postUrl: `${appURL()}/tx-success`, // this will be a GET HTTP call
        label: "Tx",
        type: ActionLinkType.TX,
      },
    ],
    label: "Trade tokens",
  };
  return NextResponse.json(evmActionMetadata);
};
