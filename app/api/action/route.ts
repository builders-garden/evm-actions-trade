import { appURL } from "@/lib/utils";
import { ActionLinkType, EVMAction } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const evmActionMetadata: EVMAction = {
    title: "Sample EVM Action",
    description: "This is a sample EVM Action",
    image: "https://placehold.co/955x500",
    links: [
      {
        targetUrl: `${appURL()}/api/tx`,
        postUrl: `${appURL()}/tx-success`, // this will be a GET HTTP call
        label: "Tx",
        type: ActionLinkType.TX,
      },
      {
        targetUrl: `${appURL()}/api/signature`,
        postUrl: `${appURL()}/api/signature/success`, // this will be a POST HTTP call
        label: "Signature",
        type: ActionLinkType.SIGNATURE,
      },
      {
        targetUrl: `${appURL()}/api/one-click-login`,
        postUrl: appURL(), // this will be a GET HTTP call
        label: "1-click login",
        type: ActionLinkType.ONE_CLICK_LOGIN,
      },
      {
        targetUrl: `https://builders.garden`,
        label: "Link",
        type: ActionLinkType.LINK,
      },
    ],
    label: "Sample Button",
  };
  return NextResponse.json(evmActionMetadata);
};
