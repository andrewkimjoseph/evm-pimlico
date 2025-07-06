# Smart Contracts - Hardhat Development Environment

This directory contains the smart contract implementation for the Account Abstraction demo, featuring upgradeable contracts built with OpenZeppelin and Hardhat tooling.

## 📋 Contracts Overview

### SimpleAccount.sol
An upgradeable smart contract wallet that demonstrates Account Abstraction capabilities:

**Key Features:**
- **UUPS Upgradeable Pattern**: Implements OpenZeppelin's UUPS (Universal Upgradeable Proxy Standard)
- **Ownable Access Control**: Secure ownership model with restricted admin functions
- **ERC-20 Token Management**: Withdraw tokens to a designated payment address
- **Event Logging**: Comprehensive event emission for tracking contract interactions
- **Storage Gap**: Prepared for future upgrades with storage slot reservation

**Main Functions:**
- `initialize(address _owner, address _paymentAddress)`: Initialize the contract with owner and payment address
- `withdrawToken(address token, uint256 amount)`: Owner-only function to withdraw ERC-20 tokens
- `updatePaymentAddress(address newAddress)`: Update the payment destination address
- `getTokenBalance(address token)`: View function to check token balance

### SimpleCounter.sol
A simple demonstration contract for testing Account Abstraction interactions:

**Key Features:**
- **Basic State Management**: Maintains a counter value
- **Public Functions**: Increment and decrement operations
- **Safety Checks**: Prevents counter from going below zero
- **Event Emission**: Logs contract creation for tracking

**Main Functions:**
- `increment()`: Increases counter by 1
- `decrement()`: Decreases counter by 1 (with underflow protection)
- `getCount()`: Returns current counter value

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm package manager

### Installation
```bash
cd hardhat
npm install
```

### Available Scripts

#### Compile Contracts
```bash
npx hardhat compile
```
Compiles all Solidity contracts and generates TypeScript artifacts.

#### Run Tests
```bash
npx hardhat test
```
Executes the test suite (when tests are available).

#### Generate Gas Reports
```bash
REPORT_GAS=true npx hardhat test
```
Runs tests with detailed gas usage reporting.

#### Start Local Node
```bash
npx hardhat node
```
Starts a local Hardhat network for development and testing.

#### Clean Build Artifacts
```bash
npx hardhat clean
```
Removes compiled artifacts and cache files.

## 🏗️ Project Structure

```
hardhat/
├── contracts/           # Solidity smart contracts
│   ├── SimpleAccount.sol    # Upgradeable smart wallet
│   └── SimpleCounter.sol    # Demo counter contract
├── artifacts/          # Compiled contract artifacts
│   └── contracts/          # Generated JSON artifacts
├── cache/              # Hardhat compilation cache
├── hardhat.config.ts   # Hardhat configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

## 🔧 Configuration

### Hardhat Configuration (`hardhat.config.ts`)
- **Solidity Version**: 0.8.28
- **Toolbox**: `@nomicfoundation/hardhat-toolbox-viem`
- **Network**: Currently configured for local development

### Dependencies
- **Core Framework**: Hardhat 2.25.0
- **Viem Integration**: Hardhat Toolbox with Viem
- **OpenZeppelin**: Upgradeable contracts and utilities

## 🚀 Deployment Workflow

The contracts are deployed using the parent directory's deployment scripts:

1. **SimpleAccount Deployment**:
   ```bash
   # From project root
   npx tsx src/contract-deployments/simple-account/implementation/index.ts
   ```

2. **SimpleCounter Deployment**:
   ```bash
   # From project root
   npx tsx src/contract-deployments/simple-counter/index.ts
   ```

3. **Contract Interaction**:
   ```bash
   # From project root
   npx tsx src/contract-interactions/state-change/simple-counter/increment/index.ts --cntr 0x[CONTRACT_ADDRESS]
   ```

## 📝 Technical Implementation Notes

### Account Abstraction Integration
- Contracts are designed to work with ERC-4337 Account Abstraction
- SimpleAccount serves as a smart wallet implementation
- Integration with Pimlico bundler and paymaster services

### Upgradeable Pattern
- Uses OpenZeppelin's UUPS proxy pattern
- Proxy deployment handled by external scripts
- Future upgrades supported through `_authorizeUpgrade` function

### Security Considerations
- Owner-only access control for sensitive functions
- Input validation on all public functions
- Safe transfer patterns for token operations
- Storage gap for upgrade compatibility

## 🧪 Testing Strategy

While formal tests are not yet implemented, the contracts can be tested through:

1. **Integration Testing**: Use the web interface to interact with deployed contracts
2. **Script Testing**: Execute deployment and interaction scripts
3. **Manual Testing**: Direct contract calls through Hardhat console

## 📚 Learning Resources

### OpenZeppelin Documentation
- [Upgradeable Contracts](https://docs.openzeppelin.com/contracts/4.x/upgradeable)
- [UUPS Proxy Pattern](https://docs.openzeppelin.com/contracts/4.x/api/proxy#UUPSUpgradeable)
- [Access Control](https://docs.openzeppelin.com/contracts/4.x/access-control)

### Hardhat Documentation
- [Hardhat Getting Started](https://hardhat.org/getting-started/)
- [Hardhat Toolbox](https://hardhat.org/hardhat-runner/docs/other-guides/hardhat-toolbox)
- [Deploying Contracts](https://hardhat.org/tutorial/deploying-to-a-live-network)

## 🔍 Next Steps

To extend this smart contract implementation:

1. **Add Tests**: Implement comprehensive unit tests for all contract functions
2. **Network Configuration**: Add testnet and mainnet deployment configurations
3. **Advanced Features**: Implement more complex Account Abstraction patterns
4. **Security Audits**: Add security analysis and formal verification
5. **Documentation**: Generate detailed API documentation from contract comments