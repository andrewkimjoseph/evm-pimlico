import { Abi, Address } from "viem";
import * as simpleAccountContractArtifact from "../../../../hardhat/artifacts/contracts/SimpleAccount.sol/SimpleAccount.json";
import {
  CREATE2_FACTORY_ADDRESS,
  getSmartAccountClient,
  PUBLIC_CLIENT,
} from "../../../../config";
import { getContractDeploymentData } from "../../../../utils/getContractDeploymentData";
import { getDeployedContractAddress } from "../../../../utils/getDeployedContractAddress";

const abi = simpleAccountContractArtifact.abi as Abi;
const bytecode = simpleAccountContractArtifact.bytecode as Address;

const deploySimpleAccountImplementationContract = async () => {
  const { smartAccountClient } = await getSmartAccountClient();

  const { contractDeploymentData } = getContractDeploymentData(abi, bytecode);

  const userOpTxnHash = await smartAccountClient.sendUserOperation({
    calls: [
      {
        to: CREATE2_FACTORY_ADDRESS,
        data: contractDeploymentData,
      },
    ],
  });

  console.info("[SIMPLE ACCOUNT: Implementation contract deployment] User operation submitted:", {
    userOpTxnHash,
  });

  const userOpReceipt = await smartAccountClient.waitForUserOperationReceipt({
    hash: userOpTxnHash,
  });

  const txnHash = userOpReceipt.receipt.transactionHash;

  console.info("[SIMPLE ACCOUNT: Implementation contract deployment] Transaction confirmed:", { txnHash });

  const abstractedTxnReceipt = await PUBLIC_CLIENT.waitForTransactionReceipt({
    hash: txnHash,
  });

  if (abstractedTxnReceipt.status === "success") {
    console.info("[SIMPLE ACCOUNT: Implementation contract deployment] Transaction success");
  }

  const simpleAccountImplementationContractAddress =  await getDeployedContractAddress(txnHash, "Initialized(uint64)");

  if (simpleAccountImplementationContractAddress) {
    console.info("[SIMPLE ACCOUNT: Contract deployment] Implementation contract address:", {
      simpleAccountImplementationContractAddress,
    });
  }
};

const main = async () => {
  try {
    await deploySimpleAccountImplementationContract();
  } catch (error) {
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
