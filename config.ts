import { Address, createPublicClient, createWalletClient, http } from "viem";
import { config } from "dotenv";
import { celoAlfajores } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

config();

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not defined");
}

const PRIVATE_KEY = process.env.PRIVATE_KEY as Address;

if (!process.env.PIMLICO_API_KEY) {
  throw new Error("PIMLICO_API_KEY is not defined");
}

const PIMLICO_API_KEY = process.env.PIMLICO_API_KEY;

export const CREATE2_FACTORY_ADDRESS =
  "0x4e59b44847b379578588920cA78FbF26c0B4956C" as Address;

const selectedChain = celoAlfajores;

export const PIMLICO_URL = `https://api.pimlico.io/v2/${selectedChain.id}/rpc?apikey=${PIMLICO_API_KEY}`;

export const REWARD_TOKEN_ADDRESS =
  "0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A" as Address;

export const PUBLIC_CLIENT = createPublicClient({
  chain: selectedChain,
  transport: http(),
});

export const PRIVATE_CLIENT = createWalletClient({
  account: privateKeyToAccount(PRIVATE_KEY),
  chain: selectedChain,
  transport: http(),
});
