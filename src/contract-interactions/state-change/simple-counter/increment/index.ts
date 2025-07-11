import { Abi, Address, encodeFunctionData, http } from "viem";
import * as simpleCounterContractArtifact from "../../../../../hardhat/artifacts/contracts/SimpleCounter.sol/SimpleCounter.json";
import { getSmartAccountClient, PUBLIC_CLIENT } from "../../../../../config";

const abi = simpleCounterContractArtifact.abi as Abi;

const getContractAddress = (): Address => {
  const contractAddressIndex = process.argv.indexOf("--cntr");
  if (contractAddressIndex === -1 || !process.argv[contractAddressIndex + 1]) {
    console.error("Error: --cntr flag is required");
    process.exit(1);
  }
  return process.argv[contractAddressIndex + 1] as Address;
};

const increment = async (simpleCounterContractAddress: Address) => {
  const { smartAccountClient } = await getSmartAccountClient();

  const incrementData = encodeFunctionData({
    abi: abi,
    functionName: "increment",
  });

  const startingCount = Number(
    await PUBLIC_CLIENT.readContract({
      address: simpleCounterContractAddress,
      abi: abi,
      functionName: "getCount",
    })
  );

  console.info("[Contract interaction: increment] Starting count:", {
    startingCount,
  });

  const userOpTxnHash = await smartAccountClient.sendUserOperation({
    calls: [
      {
        to: simpleCounterContractAddress,
        data: incrementData,
      },
    ],
  });

  console.info("[Contract interaction: increment] User operation submitted:", {
    userOpTxnHash,
  });

  const userOpReceipt = await smartAccountClient.waitForUserOperationReceipt({
    hash: userOpTxnHash,
  });

  const txnHash = userOpReceipt.receipt.transactionHash;

  console.info("[Contract interaction: increment] Transaction confirmed:", {
    txnHash,
  });

  const abstractedTxnReceipt = await PUBLIC_CLIENT.waitForTransactionReceipt({
    hash: txnHash,
  });

  if (abstractedTxnReceipt.status === "success") {
    console.info("[Contract interaction: increment] Transaction success");
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  const endingCount = Number(
    await PUBLIC_CLIENT.readContract({
      address: simpleCounterContractAddress,
      abi: abi,
      functionName: "getCount",
      blockNumber: abstractedTxnReceipt.blockNumber,
    })
  );

  console.info("[Contract interaction: increment] Ending count:", {
    endingCount,
  });

  if (endingCount === startingCount + 1) {
    console.info("[Contract interaction: increment] ✅ Counter incremented successfully!");
  } else {
    throw new Error("[Contract interaction: increment] ⚠️ Counter did not increment as expected");
  }
};

const main = async () => {
  try {
    const contractAddress = getContractAddress();
    await increment(contractAddress);
    console.info("[Contract interaction: increment] SUCCESS");
  } catch (error) {
    console.error("[Contract interaction: increment] ERROR", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}