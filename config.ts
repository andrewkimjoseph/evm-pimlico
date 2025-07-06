import { Account, Address, createPublicClient, createWalletClient, custom, http, WalletClient } from "viem";
import { config } from "dotenv";
import { celoAlfajores } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { entryPoint07Address } from "viem/account-abstraction";
import { SmartAccountClient } from "permissionless";

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

const SELECTED_CHAIN = celoAlfajores;

const PIMLICO_URL = `https://api.pimlico.io/v2/${SELECTED_CHAIN.id}/rpc?apikey=${PIMLICO_API_KEY}`;

export const CREATE2_FACTORY_ADDRESS =
  "0x4e59b44847b379578588920cA78FbF26c0B4956C" as Address;

export const PUBLIC_CLIENT = createPublicClient({
  chain: SELECTED_CHAIN,
  transport: http(),
});

export const PRIVATE_CLIENT = createWalletClient({
  account: PRIVATE_ACCOUNT,
  chain: SELECTED_CHAIN,
  transport: http(),
});
export const getSmartAccountClient = async (): Promise<{
  smartAccountClient?: SmartAccountClient;
}> => {
  if (typeof window === "undefined" || !window.ethereum) {
    return {
      smartAccountClient: undefined,
    };
  }

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

  const PRIVATE_CLIENT = createWalletClient({
    chain: SELECTED_CHAIN,
    transport: custom(window.ethereum),
  });

  const [address] = await PRIVATE_CLIENT.getAddresses();


  const walletClientWithAccount = createWalletClient({
    account: address,
    chain: SELECTED_CHAIN,
    transport: custom(window.ethereum),
  });

  const smartAccount = await toSimpleSmartAccount({
    client: PUBLIC_CLIENT,
    owner: walletClientWithAccount, // Use the wallet client with guaranteed account
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