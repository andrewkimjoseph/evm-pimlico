import { Address, http } from "viem";
import * as simpleCounterContractArtifact from "../../../hardhat/artifacts/contracts/SimpleCounter.sol/SimpleCounter.json";
import {
  CREATE2_FACTORY_ADDRESS,
  getSmartAccountAndClient,
} from "../../../config";
import { getDeployDataAndSalt } from "../../../utils/getDeployDataAndSalt";
import { getDeployedContractAddress } from "../../../utils/getDeployedContractAddress";

const abi = simpleCounterContractArtifact.abi as [];
const bytecode = simpleCounterContractArtifact.bytecode as Address;

const deploySimpleAccountContract = async () => {
  const { smartAccountClient } = await getSmartAccountAndClient();

  const { deployData, salt } = getDeployDataAndSalt(abi, bytecode);

  const userOpTxnHash = await smartAccountClient.sendUserOperation({
    calls: [
      {
        to: CREATE2_FACTORY_ADDRESS,
        data: deployData,
      },
    ],
  });

  console.info("User operation submitted:", { userOpTxnHash });

  const userOpReceipt = await smartAccountClient.waitForUserOperationReceipt({
    hash: userOpTxnHash,
  });

  const txnHash = userOpReceipt.receipt.transactionHash;

  console.info("Transaction confirmed:", { txnHash });

  await getDeployedContractAddress(txnHash, "SimpleCounterCreated(address)");
};

const main = async () => {
  try {
    await deploySimpleAccountContract();
    console.log("Contract deployment completed successfully!");
  } catch (error) {
    console.error("Contract deployment failed:", error);
    throw error;
  }
};

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
