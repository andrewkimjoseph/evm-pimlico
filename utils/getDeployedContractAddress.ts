import { Address } from "viem";
import { PUBLIC_CLIENT } from "../config";
import { calculateEventSignature } from "./calculateEventSignature";

export async function getDeployedContractAddress(
  txHash: Address,
  contractCreationEvent: string
): Promise<Address | undefined> {
  try {
    // Wait for the transaction receipt
    const receipt = await PUBLIC_CLIENT.getTransactionReceipt({
      hash: txHash,
    });

    // The specific event signature for PaxAccountCreated(address)
    const contractCreationEventSignature = calculateEventSignature(
      contractCreationEvent
    );

    // Look through all logs for our specific event
    for (const log of receipt.logs) {
      if (
        log.topics[0]?.toLowerCase() ===
        contractCreationEventSignature.toLowerCase()
      ) {
        // The contract address is in log.address
        const contractAddress = log.address as Address;

        console.info(
          `Found ${contractCreationEvent} at address: ${contractAddress}`
        );

        // Additional verification: the contract address should also be in the indexed parameter
        if (log.topics[1]) {
          const indexedAddress = `0x${log.topics[1].slice(
            -40
          )}`.toLowerCase() as Address;

          if (contractAddress.toLowerCase() === indexedAddress.toLowerCase()) {
            console.info(
              `Verified: The indexed parameter matches the contract address`
            );
          } else {
            console.warn(
              `Warning: Contract address ${contractAddress} doesn't match indexed parameter ${indexedAddress}`
            );
          }
        }

        return contractAddress;
      }
    }

    return undefined;
  } catch (error) {
    console.error("Error retrieving contract address from logs", {
      error,
      txHash,
    });
    throw error;
  }
}
