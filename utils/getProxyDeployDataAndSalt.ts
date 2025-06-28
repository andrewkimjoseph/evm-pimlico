import { Address, concat, encodeDeployData, encodeFunctionData, Hex, toHex } from "viem";
import * as simpleAccountArtifact from "../hardhat/artifacts/contracts/SimpleAccount.sol/SimpleAccount.json";

import { randomBytes } from "crypto";
import { erc1967ABI } from "./erc1967/abi/erc1967ABI";
import { erc1967ByteCode } from "./erc1967/bytecode/erc1967Bytecode";


export function getProxyDeployDataAndSalt(
    implAddress: Address,
    args: any [],
  ): { proxyDeployData: Hex; salt: Hex } {
    
    const salt = toHex(randomBytes(32), { size: 32 });
  
    const initData = encodeFunctionData({
      abi: simpleAccountArtifact.abi,
      functionName: "initialize",
      args,
    });
  
    const proxyData = encodeDeployData({
      abi: erc1967ABI,
      bytecode: erc1967ByteCode as Address,
      args: [implAddress, initData],
    });
  
    // Combine the salt with the deployment data
    const proxyDeployData = concat([salt, proxyData]);
  
    return { proxyDeployData, salt };
  }