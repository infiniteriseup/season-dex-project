# Environment Variables - Quick Reference

## TL;DR

**You don't need ANY environment variables to test the project!** 

Just run:
```bash
npm run dev
```

The app works out of the box with sensible defaults.

---

## When You DO Need Environment Variables

### 1. Better Performance (Recommended)

Get free RPC endpoints for faster, more reliable connections:

```bash
# Ethereum - Infura (free)
VITE_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
# Sign up: https://infura.io/

# Solana - Helius (free)
VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
# Sign up: https://www.helius.dev/
```

### 2. Testnet Testing (Free Test Tokens)

Test without spending real money:

```bash
VITE_ENABLE_TESTNET=true
VITE_ETHEREUM_RPC_URL=https://goerli.infura.io/v3/YOUR_KEY
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_ETHEREUM_CHAIN_ID=5
VITE_SOLANA_NETWORK=devnet
```

Get test tokens:
- ETH: https://goerlifaucet.com/
- SOL: https://solfaucet.com/

### 3. Production Deployment

Optimize for production:

```bash
# Premium RPC endpoints
VITE_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY

# Production settings
VITE_ENABLE_TESTNET=false
VITE_DEBUG_MODE=false
VITE_ENABLE_TX_SIMULATION=true
VITE_ENABLE_ANALYTICS=true
```

---

## All Available Variables

### Essential (All Optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_ETHEREUM_RPC_URL` | MetaMask provider | Ethereum RPC endpoint |
| `VITE_SOLANA_RPC_URL` | Public endpoint | Solana RPC endpoint |
| `VITE_ETHEREUM_CHAIN_ID` | 1 (mainnet) | Ethereum network ID |
| `VITE_SOLANA_NETWORK` | mainnet-beta | Solana network |

### Testing & Development

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_ENABLE_TESTNET` | false | Use testnet instead of mainnet |
| `VITE_DEBUG_MODE` | false | Enable debug logging |
| `VITE_ENABLE_TX_SIMULATION` | true | Simulate transactions before execution |
| `VITE_DEFAULT_SLIPPAGE` | 0.5 | Default slippage tolerance (%) |

### API Endpoints

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_JUPITER_API_URL` | https://quote-api.jup.ag/v6 | Jupiter swap API |
| `VITE_JUPITER_PRICE_API_URL` | https://price.jup.ag/v4 | Jupiter price API |
| `VITE_RAYDIUM_API_URL` | https://api.raydium.io/v2 | Raydium pool API |
| `VITE_ORCA_API_URL` | https://api.orca.so | Orca pool API |

### Feature Flags

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_ENABLE_SWAPS` | true | Enable token swaps |
| `VITE_ENABLE_LIQUIDITY` | true | Enable liquidity pools |
| `VITE_ENABLE_SEASONAL_ANIMATIONS` | true | Enable seasonal animations |
| `VITE_ENABLE_THEME_CONTROLS` | true | Enable theme controls |

### Optional Enhancements

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_ENABLE_ANALYTICS` | false | Enable analytics tracking |
| `VITE_GA_TRACKING_ID` | - | Google Analytics ID |
| `VITE_SENTRY_DSN` | - | Sentry error tracking DSN |
| `VITE_COINGECKO_API_KEY` | - | CoinGecko API key |
| `VITE_WALLETCONNECT_PROJECT_ID` | - | WalletConnect project ID |

---

## Free RPC Providers

### Ethereum

| Provider | Free Tier | Sign Up |
|----------|-----------|---------|
| **Infura** | 10M requests/month | https://infura.io/ |
| **Alchemy** | 300M compute units/month | https://www.alchemy.com/ |
| **QuickNode** | Limited free tier | https://www.quicknode.com/ |

### Solana

| Provider | Free Tier | Sign Up |
|----------|-----------|---------|
| **Public RPC** | Rate-limited | No signup needed |
| **Helius** | 100k requests/day | https://www.helius.dev/ |
| **QuickNode** | Limited free tier | https://www.quicknode.com/ |
| **Alchemy** | Free tier available | https://www.alchemy.com/ |

---

## Setup Examples

### Example 1: Minimal Setup (No .env file)

```bash
# Just run it!
npm run dev
```

**What works**: Everything except high-volume operations (may hit rate limits)

### Example 2: Development Setup

```bash
# Create .env
cat > .env << EOF
VITE_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
VITE_DEBUG_MODE=true
EOF

npm run dev
```

**What works**: Everything with better performance and debug logs

### Example 3: Testnet Setup

```bash
# Create .env
cat > .env << EOF
VITE_ENABLE_TESTNET=true
VITE_ETHEREUM_RPC_URL=https://goerli.infura.io/v3/YOUR_KEY
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_ETHEREUM_CHAIN_ID=5
VITE_SOLANA_NETWORK=devnet
VITE_DEBUG_MODE=true
EOF

npm run dev
```

**What works**: Test with free tokens, no real money needed

### Example 4: Production Setup

```bash
# Create .env
cat > .env << EOF
VITE_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
VITE_ENABLE_TESTNET=false
VITE_DEBUG_MODE=false
VITE_ENABLE_TX_SIMULATION=true
VITE_ENABLE_ANALYTICS=true
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
EOF

npm run build
npm run preview
```

**What works**: Optimized for production with analytics

---

## Common Questions

### Q: Do I need environment variables to test locally?
**A**: No! The app works without any .env file.

### Q: What's the minimum setup for production?
**A**: Still none! But we recommend getting free RPC endpoints for better performance.

### Q: How do I test without spending real money?
**A**: Set `VITE_ENABLE_TESTNET=true` and use testnet faucets for free tokens.

### Q: Where do I get API keys?
**A**: All providers listed above offer free tiers. Just sign up and copy your API key.

### Q: Can I use the app without API keys?
**A**: Yes! It uses public endpoints by default.

### Q: What happens if I hit rate limits?
**A**: You'll see errors in the console. Solution: Get a free API key.

---

## Troubleshooting

### Issue: "RPC rate limit exceeded"
**Solution**: Get a free API key from Infura or Alchemy

### Issue: "Network error"
**Solution**: Check your internet connection or try a different RPC endpoint

### Issue: "Transaction failed"
**Solution**: Check you have enough balance for gas fees

### Issue: "Wallet not detected"
**Solution**: Install MetaMask or Phantom extension

---

## More Information

- **Full Guide**: See [TESTING_GUIDE.md](TESTING_GUIDE.md)
- **Example File**: See [.env.example](.env.example)
- **Setup Guide**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

**Remember**: Start simple, add complexity only when needed! 🚀
