import { erc20Abi } from "@/lib/contracts/erc20abi";
import { base, baseSepolia } from "viem/chains";
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, encodeFunctionData, http, parseUnits } from "viem";
import { NATIVE_ADDRESS, USDC_CONTRACT_ADDRESS_BASE } from "@/lib/constants";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { address } = body;
  const { searchParams } = new URL(req.url);

  // Public client
  const publicClient = createPublicClient({ 
    chain: base,
    transport: http()
  })

  const tokenInput = searchParams.get('tokenIn'); //token address
  const tokenOutput = searchParams.get('tokenOut'); //token address
  const amountIn = searchParams.get('amountIn'); //amount in tokenIn
  const slippage = "30"
  const tokenIn = tokenInput === "0x0000000000000000000000000000000000000000" ? NATIVE_ADDRESS : tokenInput;
  const tokenOut = tokenOutput === "0x0000000000000000000000000000000000000000" ? NATIVE_ADDRESS : tokenOutput;

  // get tokenInAddress decimals
  let tokenInDecimals = 18;
  if (tokenIn !== NATIVE_ADDRESS) {
    tokenInDecimals = await publicClient.readContract({
      address: tokenIn as `0x${string}`,
      abi: erc20Abi,
      functionName: "decimals",
    });
  }
  const amountInParsed = parseUnits(amountIn!, tokenInDecimals);

  // 1inch swap request
  const apiUrl = "https://api.1inch.dev/swap/v6.0/8453/swap";

  const config = {
      headers: {
      "Authorization": "Bearer `${}`"
      },
      params: {
        "src": tokenIn,
        "dst": tokenOut,
        "amount": amountInParsed.toString(),
        "from": address,
        "origin": address,
        "slippage": slippage
      }
  };
  try {
    const response = await fetch(apiUrl, config);
    const data = await response.json();

    // 1inch swap info
    const to = data.to;
    const calldata = data.data;
    const value = data.value;

    const transactions = [
      {
        chainId: `${base.id}`,
        to: to as `0x${string}`,
        data: calldata as string,
        value: value as string,
      },
    ];

    // if tokenIn is not native token, approve tokenIn and push the transaction in the first position of thr array
    if (tokenIn !== NATIVE_ADDRESS) {
      const approveCalldata = encodeFunctionData({
        abi: erc20Abi,
        functionName: "approve",
        args: [to, amountInParsed],
      });

      transactions.unshift({
        chainId: `${base.id}`,
        to: USDC_CONTRACT_ADDRESS_BASE,
        data: approveCalldata,
        value: BigInt(0).toString(),
      });
    }

    return NextResponse.json({ transactions });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
