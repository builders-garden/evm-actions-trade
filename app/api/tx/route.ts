import { erc20Abi } from "@/lib/contracts/erc20abi";
import { baseSepolia } from "viem/chains";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseUnits } from "viem";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { address } = body;

  // Prepare amount to transfer
  const amount = BigInt(parseUnits("1", 6));

  // Transfering 1 USDC to yourself
  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [address as `0x${string}`, amount] as const,
  });

  const BASE_SEPOLIA_USDC_ADDRESS =
    "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

  return NextResponse.json({
    transactions: [
      {
        chainId: `${baseSepolia.id}`,
        to: BASE_SEPOLIA_USDC_ADDRESS,
        data: calldata,
        value: "0",
      },
    ],
  });
};
