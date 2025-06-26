import { Address, concat, encodeDeployData, encodeFunctionData, Hex, toHex } from "viem";
import * as ERC1967Artifact from "../hardhat/artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Utils.sol/ERC1967Utils.json";
import * as simpleAccountArtifact from "../hardhat/artifacts/contracts/SimpleAccount.sol/SimpleAccount.json";

import { randomBytes } from "crypto";


export function getProxyDeployDataAndSalt(
    implementationAddress: Address,
    ownerAddress: Address,
    primaryPaymentMethod: Address
  ): { deployData: Hex; salt: Hex } {
    
    const salt = toHex(randomBytes(32), { size: 32 });
  
    const initData = encodeFunctionData({
      abi: simpleAccountArtifact.abi,
      functionName: "initialize",
      args: [ownerAddress, primaryPaymentMethod],
    });
  
    const proxyData = encodeDeployData({
      abi: ERC1967Artifact.abi,
      bytecode: ERC1967Artifact.bytecode as Address,
      args: [implementationAddress, initData],
    });
  
    // Combine the salt with the deployment data
    const deployData = concat([salt, proxyData]);
  
    return { deployData, salt };
  }