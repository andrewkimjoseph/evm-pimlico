import { randomBytes } from "crypto";
import { Abi, Address, concat, encodeDeployData, encodeFunctionData, Hex, toHex } from "viem";

export function getContractDeploymentData(
    abi: Abi,
    bytecode: Address,
  ): { contractDeploymentData: Hex } {
    // Generate a random salt for CREATE2
    const salt = toHex(randomBytes(32), { size: 32 });
  
    const proxyData = encodeDeployData({
      abi: abi,
      bytecode: bytecode,
    });
  
    // Combine the salt with the deployment data
    const deployData = concat([salt, proxyData]);
  
    return { contractDeploymentData: deployData };
  }