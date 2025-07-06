# Web Frontend - Account Abstraction Demo Interface

A modern Next.js application that provides an interactive interface for demonstrating Account Abstraction (ERC-4337) functionality using smart contract wallets powered by Pimlico's bundler and paymaster services.

## 🎯 Application Overview

This frontend application demonstrates:

- **Account Abstraction Integration**: Seamless interaction with ERC-4337 smart accounts
- **Contract Deployment**: Deploy smart contracts through Account Abstraction
- **Transaction Execution**: Execute transactions without holding native tokens for gas
- **Web3 Wallet Integration**: Connect with popular Web3 wallets like MetaMask
- **Real-time Updates**: Live transaction status and contract state updates

## 🏗️ Architecture

### Core Technologies
- **Next.js 15** with App Router for modern React development
- **TypeScript** for type-safe development
- **Tailwind CSS** for responsive styling
- **Viem** for Ethereum interactions
- **Permissionless** for Account Abstraction functionality
- **Radix UI** for accessible component primitives

### Key Features
- **Smart Account Client**: Automated smart account creation and management
- **Contract Services**: Organized service layer for contract deployments and interactions
- **Component Library**: Reusable UI components built with Radix UI
- **Type Safety**: Full TypeScript integration with contract artifacts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Web3 wallet (MetaMask recommended)
- Celo Alfajores testnet setup

### Installation
```bash
cd web
npm install
```

### Environment Setup
Ensure the parent directory has a properly configured `.env` file:
```bash
PRIVATE_KEY=your_private_key_here
PIMLICO_API_KEY=your_pimlico_api_key_here
```

### Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 📱 Application Structure

### Pages and Routes

#### Home Page (`/`)
- **Overview**: Introduction to Account Abstraction concepts
- **Navigation**: Links to demonstration pages
- **Getting Started**: Quick setup guide

#### Simple Account (`/simple-account`)
- **Purpose**: Demonstrates smart account wallet functionality
- **Features**: Account creation, token management, upgradeable contracts
- **Status**: Implementation in progress

#### Simple Counter (`/simple-counter`)
- **Purpose**: Interactive demonstration of Account Abstraction transactions
- **Features**: Contract deployment, increment/decrement operations
- **Functionality**: Live contract interaction with real-time updates

### Component Architecture

#### UI Components (`/components/ui/`)
- **Button**: Styled button component with variants
- **Navigation Menu**: Responsive navigation with Radix UI

#### Layout Components (`/components/`)
- **Navbar**: Application navigation with Web3 wallet integration
- **Layout**: Consistent page structure and styling

### Service Layer (`/services/`)

#### Contract Deployments (`/services/contract-deployments/`)
- **SimpleCounter**: Deploy counter contracts through Account Abstraction
- **SimpleAccount**: Deploy upgradeable smart account contracts

#### Contract Interactions (`/services/contract-interactions/`)
- **State Changes**: Execute contract functions through smart accounts
- **Real-time Updates**: Monitor transaction status and confirmations

### Utility Functions (`/utils/`)
- **Contract Deployment**: CREATE2 factory integration
- **Address Calculation**: Deterministic contract address computation
- **Event Processing**: Smart contract event parsing and handling

## 🔧 Configuration

### Next.js Configuration (`next.config.ts`)
- **TypeScript**: Strict mode enabled
- **Turbopack**: Development server optimization
- **Build Optimization**: Production build settings

### Styling Configuration
- **Tailwind CSS**: Utility-first styling framework
- **PostCSS**: CSS processing and optimization
- **Component Styling**: Consistent design system

### TypeScript Configuration
- **Strict Mode**: Enhanced type checking
- **Path Mapping**: Simplified import paths
- **Contract Integration**: Type-safe contract interactions

## 🛠️ Development Workflow

### Available Scripts

#### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
```

#### Testing and Quality
```bash
npm run lint         # Check code quality and style
npm run type-check   # Run TypeScript type checking
```

## 🌐 Web3 Integration

### Account Abstraction Flow
1. **Wallet Connection**: Connect user's Web3 wallet
2. **Smart Account Creation**: Generate smart account from wallet
3. **Transaction Execution**: Execute transactions through bundler
4. **Gas Sponsorship**: Pimlico paymaster covers gas fees
5. **Real-time Updates**: Monitor transaction status and confirmations

### Supported Networks
- **Celo Alfajores Testnet**: Primary testing network
- **Configuration**: Easily extensible to other networks

### Smart Account Features
- **Gasless Transactions**: Users don't need native tokens
- **Batch Operations**: Multiple transactions in one operation
- **Upgradeable Contracts**: Future-proof smart account implementations

## 📋 Feature Implementation Status

### ✅ Completed Features
- Next.js application setup with TypeScript
- Tailwind CSS styling system
- Basic navigation and layout components
- SimpleCounter contract deployment
- Account Abstraction client integration
- Real-time transaction monitoring

### 🚧 In Progress Features
- SimpleAccount contract interface
- Enhanced wallet connection flow
- Advanced contract interaction features
- Transaction history and analytics

### 📅 Planned Features
- Multi-network support
- Advanced smart account features
- Transaction batching interface
- Gas optimization analytics
- Mobile-responsive enhancements

## 🔍 Technical Deep Dive

### Account Abstraction Implementation
```typescript
// Smart Account Client Creation
const smartAccount = await toSimpleSmartAccount({
  client: PUBLIC_CLIENT,
  owner: walletClientWithAccount,
  entryPoint: {
    address: entryPoint07Address,
    version: "0.7",
  },
});

// Transaction Execution
const userOpTxnHash = await smartAccountClient.sendUserOperation({
  calls: [
    {
      to: CONTRACT_ADDRESS,
      data: encodedFunctionCall,
    },
  ],
});
```

### Contract Deployment Pattern
```typescript
// CREATE2 Deployment
const { contractDeploymentData } = getContractDeploymentData(abi, bytecode);
const deploymentResult = await smartAccountClient.sendUserOperation({
  calls: [
    {
      to: CREATE2_FACTORY_ADDRESS,
      data: contractDeploymentData,
    },
  ],
});
```

## 📚 Learning Resources

### Next.js Documentation
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Integration](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Account Abstraction Resources
- [ERC-4337 Standard](https://eips.ethereum.org/EIPS/eip-4337)
- [Permissionless.js Documentation](https://docs.pimlico.io/permissionless)
- [Viem Documentation](https://viem.sh/)

### Styling and UI
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Components](https://www.radix-ui.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel platform
```

### Custom Deployment
```bash
npm run build
npm start
# Deploy to any Node.js hosting environment
```

### Environment Variables for Production
```bash
NEXT_PUBLIC_PIMLICO_API_KEY=your_api_key
```

## 🔧 Customization and Extension

### Adding New Contract Interactions
1. Create service functions in `/services/contract-interactions/`
2. Add UI components in `/components/`
3. Implement pages in `/app/`
4. Update navigation in `/components/navbar.tsx`

### Styling Customization
- Modify `tailwind.config.ts` for design system changes
- Update component styles in `/components/ui/`
- Customize global styles in `/app/globals.css`

### Network Configuration
- Update `config.ts` for new network support
- Add network-specific configurations
- Update environment variable handling

## 🤝 Contributing

To contribute to the frontend development:

1. **Setup**: Follow the installation guide
2. **Development**: Create feature branches for new functionality
3. **Testing**: Test thoroughly with different wallet connections
4. **Documentation**: Update README for new features
5. **Code Quality**: Follow TypeScript and ESLint guidelines

## 📝 License

This project is part of the EVM Pimlico demonstration and follows the same licensing terms as the parent project.