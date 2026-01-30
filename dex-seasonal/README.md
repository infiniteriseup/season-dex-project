# SeasonDEX - Seasonal Decentralized Exchange

A modern DEX with seasonal theming that adapts throughout 2026, supporting both MetaMask (Ethereum/EVM) and Phantom (Solana) wallets.

## Features

- **Seasonal Themes**: Automatically adapts UI based on the current season (Spring, Summer, Fall, Winter)
- **Multi-Wallet Support**: 
  - MetaMask for Ethereum and EVM-compatible chains
  - Phantom for Solana
- **Token Swapping**: Intuitive swap interface with real-time balance display
- **Liquidity Pools**: Add and remove liquidity with APY tracking
- **Fully Responsive Design**: Optimized for all devices and platforms
  - 📱 Mobile (iOS, Android) - 320px to 767px
  - 📱 Tablet (iPad, Android tablets) - 768px to 1023px
  - 💻 Desktop (Windows, macOS, Linux) - 1024px to 1919px
  - 🖥️ Large Displays (4K, Ultrawide) - 1920px+
- **Cross-Platform**: Works on all major browsers (Chrome, Firefox, Safari, Edge, Opera)
- **Touch-Optimized**: 44px minimum touch targets, mobile-first design
- **Keyboard Accessible**: Full keyboard navigation support

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Inline styles with dynamic theming
- **Wallet Integration**:
  - ethers.js v6 for MetaMask/Ethereum
  - @solana/web3.js for Phantom/Solana
  - @solana/wallet-adapter for Solana wallet management
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension (for Ethereum)
- Phantom browser extension (for Solana)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
dex-seasonal/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Navigation and wallet connection
│   │   ├── SwapCard.tsx        # Token swap interface
│   │   └── LiquidityPool.tsx   # Liquidity management
│   ├── contexts/
│   │   ├── ThemeContext.tsx    # Seasonal theme management
│   │   └── WalletContext.tsx   # Wallet connection logic
│   ├── themes/
│   │   └── seasons.ts          # Season definitions and logic
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main application component
│   └── App.css                 # Global styles
├── package.json
└── README.md
```

## Seasonal Themes

The DEX automatically switches themes based on the current date:

- **Spring** (March 20 - June 20): Fresh greens, pastels, blooming colors
- **Summer** (June 21 - September 22): Bright yellows, warm oranges, vibrant blues
- **Fall** (September 23 - December 20): Warm oranges, browns, cozy autumn tones
- **Winter** (December 21 - March 19): Cool blues, whites, crisp winter colors

## Wallet Integration

### MetaMask (Ethereum)
- Supports all EVM-compatible chains
- Displays ETH balance and network info
- Handles account and network changes automatically

### Phantom (Solana)
- Connects to Solana mainnet-beta
- Displays SOL balance
- Handles wallet disconnection events

## Smart Contract Integration

The current implementation includes UI components ready for smart contract integration. To connect to actual DEX protocols:

1. **For Ethereum**: Integrate with Uniswap V2/V3 or similar AMM protocols
2. **For Solana**: Integrate with Raydium, Orca, or Jupiter aggregator

## Development Roadmap

- [x] Fully responsive design for all devices
- [ ] Integrate with Uniswap V2/V3 for Ethereum swaps
- [ ] Integrate with Raydium/Orca for Solana swaps
- [ ] Add price impact and slippage calculations
- [ ] Implement token list management
- [ ] Add transaction history
- [ ] Implement liquidity pool analytics
- [ ] Add multi-language support
- [ ] Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please open an issue on the GitHub repository.
