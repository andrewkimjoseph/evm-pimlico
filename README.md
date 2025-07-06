# EVM Pimlico - Account Abstraction Demo

A comprehensive demonstration of **Account Abstraction (ERC-4337)** using the Pimlico Bundler and Paymaster infrastructure. This project showcases how to implement smart contract wallets that can execute transactions without requiring users to directly hold native tokens for gas fees.

## 🎯 What This Repository Demonstrates

This repository provides a full-stack implementation of Account Abstraction featuring:

- **Smart Contract Wallets**: Upgradeable smart contracts that can execute transactions on behalf of users
- **ERC-4337 Implementation**: Complete integration with the Account Abstraction standard
- **Pimlico Integration**: Bundler and Paymaster services for transaction execution and gas sponsorship
- **Frontend Interface**: Next.js application for interacting with smart contracts
- **TypeScript Infrastructure**: Type-safe contract interactions and deployment scripts

## 🏗️ Project Architecture

The project consists of three main components:

### 1. **Smart Contracts** (`/hardhat/`)
- **SimpleAccount.sol**: Upgradeable smart contract wallet with ERC-20 token management
- **SimpleCounter.sol**: Demonstration contract for state-changing operations
- Built with OpenZeppelin upgradeable contracts and Hardhat tooling

### 2. **Core Infrastructure** (`/src/`, `/utils/`)
- Contract deployment utilities with CREATE2 factory pattern
- Transaction execution scripts for smart account operations
- Type-safe contract interaction helpers

### 3. **Web Frontend** (`/web/`)
- Next.js application with TypeScript and Tailwind CSS
- Interactive pages for deploying and interacting with contracts
- Account abstraction client integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, etc.) for testing
- Celo Alfajores testnet tokens for gas fees

### Environment Setup

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd evm-pimlico
   ```

2. **Install dependencies**:
   ```bash
   npm install
   cd hardhat && npm install
   cd ../web && npm install
   ```

3. **Configure environment variables**:
   
   Create a `.env` file in the root directory:
   ```bash
   PRIVATE_KEY=your_private_key_here
   PIMLICO_API_KEY=your_pimlico_api_key_here
   ```

   **Get your Pimlico API key**:
   - Sign up at [Pimlico Dashboard](https://dashboard.pimlico.io/)
   - Create a new project and copy your API key

### Running the Application

#### Option 1: Web Interface (Recommended)
```bash
cd web
npm run dev
```

Visit `http://localhost:3000` to interact with the demo through the web interface.

#### Option 2: Direct Script Execution

**Deploy SimpleCounter contract**:
```bash
npx tsx src/contract-deployments/simple-counter/index.ts
```

**Deploy SimpleAccount implementation**:
```bash
npx tsx src/contract-deployments/simple-account/implementation/index.ts
```

**Deploy SimpleAccount proxy** (after implementation is deployed):
```bash
npx tsx src/contract-deployments/simple-account/proxy/index.ts --impl 0x[IMPLEMENTATION_CONTRACT_ADDRESS]
```

**Interact with deployed contracts**:

*SimpleCounter interactions*:
```bash
# Increment counter (requires --cntr flag with contract address)
npx tsx src/contract-interactions/state-change/simple-counter/increment/index.ts --cntr 0x[CONTRACT_ADDRESS]

# Decrement counter
npx tsx src/contract-interactions/state-change/simple-counter/decrement/index.ts --cntr 0x[CONTRACT_ADDRESS]
```

*SimpleAccount interactions*:
```bash
# Note: SimpleAccount interaction scripts are not yet implemented
# The contract includes functions for:
# - Token withdrawal: withdrawToken(address token, uint256 amount)
# - Payment address updates: updatePaymentAddress(address newAddress)
# - Token balance queries: getTokenBalance(address token)
```

## 🔧 Development Workflow

### Smart Contract Development

1. **Compile contracts**:
   ```bash
   cd hardhat
   npx hardhat compile
   ```

2. **Test contracts** (when tests are available):
   ```bash
   cd hardhat
   npx hardhat test
   ```

### Frontend Development

1. **Start development server**:
   ```bash
   cd web
   npm run dev --turbopack
   ```

2. **Build for production**:
   ```bash
   cd web
   npm run build
   ```

## 📋 Key Features

### Account Abstraction Benefits Demonstrated

1. **Gas Sponsorship**: Users can execute transactions without holding native tokens
2. **Batch Transactions**: Multiple operations in a single user operation
3. **Smart Recovery**: Upgradeable wallet contracts for enhanced security
4. **Custom Logic**: Programmable transaction validation and execution

### Technical Implementation

- **ERC-4337 Standard**: Full compliance with Account Abstraction specification
- **CREATE2 Deployment**: Deterministic contract addresses for predictable deployment
- **Upgradeable Patterns**: UUPS proxy pattern for contract upgrades
- **Type Safety**: Comprehensive TypeScript integration throughout

## 🌐 Network Configuration

Currently configured for **Celo Alfajores** testnet:
- Chain ID: 44787
- RPC: Standard Celo Alfajores endpoints
- Bundler: Pimlico bundler service
- Paymaster: Pimlico paymaster for gas sponsorship

## 📚 Learning Resources

### Understanding Account Abstraction
- [ERC-4337 Specification](https://eips.ethereum.org/EIPS/eip-4337)
- [Account Abstraction Guide](https://ethereum.org/en/developers/docs/accounts/#account-abstraction)

### Pimlico Documentation
- [Pimlico Documentation](https://docs.pimlico.io/)
- [Bundler API Reference](https://docs.pimlico.io/bundler)
- [Paymaster API Reference](https://docs.pimlico.io/paymaster)

## 🔍 Project Structure

```
evm-pimlico/
├── hardhat/              # Smart contract development
│   ├── contracts/        # Solidity contracts
│   ├── artifacts/        # Compiled contract artifacts
│   └── package.json      # Hardhat dependencies
├── web/                  # Next.js frontend application
│   ├── app/             # Next.js app router pages
│   ├── components/      # React components
│   ├── services/        # Contract interaction services
│   └── utils/           # Utility functions
├── src/                  # Core backend infrastructure
│   ├── contract-deployments/    # Deployment scripts
│   └── contract-interactions/   # Transaction scripts
├── utils/               # Shared utility functions
└── config.ts           # Environment and client configuration
```

## 🚨 Important Notes

- This is a **demonstration project** for educational purposes
- Use testnet tokens only - never use mainnet private keys in development
- The SimpleAccount contract includes basic token management features
- Gas fees are sponsored through Pimlico's paymaster service

## 🤝 Contributing

This project serves as a learning resource for Account Abstraction implementation. Feel free to:
- Explore the codebase to understand ERC-4337 patterns
- Modify contracts to experiment with different features
- Extend the frontend to add new interaction methods
- Test different Account Abstraction scenarios

## 📝 License

This project is available under the MIT License - see individual files for specific licensing information.