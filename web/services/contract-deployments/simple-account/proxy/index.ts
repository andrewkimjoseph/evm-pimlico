// import { Abi, Address } from "viem";
// import {
//   CREATE2_FACTORY_ADDRESS,
//   getSmartAccountClient,
//   PUBLIC_CLIENT,
// } from "../../../../../config";
// import { getDeployedContractAddress } from "../../../../../utils/getDeployedContractAddress";
// import { getProxyDeployDataAndSalt } from "../../../../../utils/getProxyDeployDataAndSalt";

// const getImplementationContractAddress = (): Address => {
//   const contractAddressIndex = process.argv.indexOf("--impl");
//   if (contractAddressIndex === -1 || !process.argv[contractAddressIndex + 1]) {
//     console.error(
//       "Error: --impl flag is required: Pass implementation contract address"
//     );
//     process.exit(1);
//   }
//   return process.argv[contractAddressIndex + 1] as Address;
// };

// const deploySimpleAccountProxyContract = async (implAddress: Address) => {
//   console.info("[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] Starting deployment with impl:", { implAddress });
  
//   const { smartAccountClient } = await getSmartAccountClient();

//   const args = {
//     _owner: "0x12DC85203e86DD1ea7474b8772AF730484F927a7",
//     _paymentAddress: "0x12DC85203e86DD1ea7474b8772AF730484F927a7",
//   };

//   console.info("[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] Constructor args:", args);

//   const { proxyDeployData } = getProxyDeployDataAndSalt(implAddress, [
//     args._owner,
//     args._paymentAddress,
//   ]);

//   console.info("[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] Deploy data generated, sending user operation...");

//   const userOpTxnHash = await smartAccountClient.sendUserOperation({
//     calls: [
//       {
//         to: CREATE2_FACTORY_ADDRESS,
//         data: proxyDeployData,
//       },
//     ],
//   });

//   console.info(
//     "[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] User operation submitted:",
//     {
//       userOpTxnHash,
//     }
//   );

//   const userOpReceipt = await smartAccountClient.waitForUserOperationReceipt({
//     hash: userOpTxnHash,
//   });

//   const txnHash = userOpReceipt.receipt.transactionHash;

//   console.info(
//     "[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] Transaction confirmed:",
//     { txnHash }
//   );

//   const abstractedTxnReceipt = await PUBLIC_CLIENT.waitForTransactionReceipt({
//     hash: txnHash,
//   });

//   if (abstractedTxnReceipt.status === "success") {
//     console.info(
//       "[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] Transaction success"
//     );
//   } else {
//     console.error(
//       "[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] Transaction failed with status:",
//       abstractedTxnReceipt.status
//     );
//     return;
//   }

//   console.info("[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] Looking for deployed contract address...");

//   const simpleAccountProxyContractAddress = await getDeployedContractAddress(
//     txnHash,
//     "SimpleAccountCreated(address)"
//   );

//   if (simpleAccountProxyContractAddress) {
//     console.info(
//       "[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] SUCCESS! Proxy contract address:",
//       {
//         simpleAccountProxyContractAddress,
//       }
//     );
//   } else {
//     console.error("[SIMPLE ACCOUNT: Proxy contract deployment] Failed to find deployed contract address");
//   }
// };

// const main = async () => {
//   try {
//     console.info("[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] Starting main...");
//     const implAddress = getImplementationContractAddress();
//     await deploySimpleAccountProxyContract(implAddress);
//     console.info("[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] SUCCESS");
//   } catch (error) {
//     console.error("[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] ERROR:", error);
//     process.exit(1);
//   } finally {
//     process.exit(0);
//   }
// };

// if (require.main === module) {
//   main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error("[SIMPLE ACCOUNT: Proxy contract DEPLOYMENT] MAIN ERROR:", error);
//       process.exit(1);
//     });
// }