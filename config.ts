import { Address, createPublicClient, createWalletClient, http } from "viem";
import { config } from "dotenv";
import { celoAlfajores } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { entryPoint07Address } from "viem/account-abstraction";

config();

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not defined");
}

if (!process.env.PIMLICO_API_KEY) {
  throw new Error("PIMLICO_API_KEY is not defined");
}

const PRIVATE_KEY = process.env.PRIVATE_KEY as Address;

const PRIVATE_ACCOUNT = privateKeyToAccount(PRIVATE_KEY);

const PIMLICO_API_KEY = process.env.PIMLICO_API_KEY;

export const CREATE2_FACTORY_ADDRESS =
  "0x4e59b44847b379578588920cA78FbF26c0B4956C" as Address;

const SELECTED_CHAIN = celoAlfajores;

const PIMLICO_URL = `https://api.pimlico.io/v2/${SELECTED_CHAIN.id}/rpc?apikey=${PIMLICO_API_KEY}`;

export const PUBLIC_CLIENT = createPublicClient({
  chain: SELECTED_CHAIN,
  transport: http(),
});

export const PRIVATE_CLIENT = createWalletClient({
  account: PRIVATE_ACCOUNT,
  chain: SELECTED_CHAIN,
  transport: http(),
});

export const getSmartAccountClient = async () => {
  const { createSmartAccountClient } = await import("permissionless");
  const { toSimpleSmartAccount } = await import("permissionless/accounts");
  const { createPimlicoClient } = await import(
    "permissionless/clients/pimlico"
  );

  const PIMLICO_CLIENT = createPimlicoClient({
    transport: http(PIMLICO_URL),
    entryPoint: {
      address: entryPoint07Address,
      version: "0.7",
    },
  });

  const smartAccount = await toSimpleSmartAccount({
    client: PUBLIC_CLIENT,
    owner: PRIVATE_ACCOUNT,
    entryPoint: {
      address: entryPoint07Address,
      version: "0.7",
    },
  });

  const smartAccountClient = createSmartAccountClient({
    account: smartAccount,
    chain: SELECTED_CHAIN,
    bundlerTransport: http(PIMLICO_URL),
    paymaster: PIMLICO_CLIENT,
    userOperation: {
      estimateFeesPerGas: async () => {
        return (await PIMLICO_CLIENT.getUserOperationGasPrice()).fast;
      },
    },
  });

  return {
    smartAccountClient
  };
};
