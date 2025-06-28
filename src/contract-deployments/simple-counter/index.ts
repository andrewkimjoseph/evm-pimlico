import { Abi, Address, http } from "viem";
import * as simpleCounterContractArtifact from "../../../hardhat/artifacts/contracts/SimpleCounter.sol/SimpleCounter.json";
import {
  CREATE2_FACTORY_ADDRESS,
  getSmartAccountAndClient,
  PUBLIC_CLIENT,
} from "../../../config";
import { getContractDeploymentData } from "../../../utils/getContractDeploymentData";
import { getDeployedContractAddress } from "../../../utils/getDeployedContractAddress";

const abi = simpleCounterContractArtifact.abi as Abi;
const bytecode = simpleCounterContractArtifact.bytecode as Address;

const deploySimpleAccountContract = async () => {
  const { smartAccountClient } = await getSmartAccountAndClient();

  const { contractDeploymentData } = getContractDeploymentData(abi, bytecode);

  const userOpTxnHash = await smartAccountClient.sendUserOperation({
    calls: [
      {
        to: CREATE2_FACTORY_ADDRESS,
        data: contractDeploymentData,
      },
    ],
  });

  console.info("[SIMPLE COUNTER: Contract deployment] User operation submitted:", {
    userOpTxnHash,
  });

  const userOpReceipt = await smartAccountClient.waitForUserOperationReceipt({
    hash: userOpTxnHash,
  });

  const txnHash = userOpReceipt.receipt.transactionHash;

  console.info("[SIMPLE COUNTER: Contract deployment] Transaction confirmed:", { txnHash });

  const abstractedTxnReceipt = await PUBLIC_CLIENT.waitForTransactionReceipt({
    hash: txnHash,
  });

  if (abstractedTxnReceipt.status === "success") {
    console.info("[SIMPLE COUNTER: Contract deployment] Transaction success");
  }

  await getDeployedContractAddress(txnHash, "SimpleCounterCreated(address)");
};

const main = async () => {
  try {
    await deploySimpleAccountContract();
    console.info("[SIMPLE COUNTER: Contract deployment] SUCCESS");
  } catch (error) {
    console.error("[SIMPLE COUNTER: Contract deployment] ERROR", error);
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
