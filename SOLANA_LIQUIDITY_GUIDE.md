# Solana Liquidity Integration Guide

## Overview

SeasonDEX now includes direct integration with Raydium and Orca DEXs for Solana liquidity operations. This guide explains how the integration works and how to use it.

## Supported DEXs

### 1. Raydium
- **Type**: Automated Market Maker (AMM)
- **Features**: High liquidity, low slippage, yield farming
- **Website**: https://raydium.io/
- **Status**: SDK integrated, requires pool keys from API

### 2. Orca
- **Type**: Automated Market Maker (AMM)
- **Features**: User-friendly, concentrated liquidity, fair launch pools
- **Website**: https://www.orca.so/
- **Status**: SDK integrated, requires pool configuration

## Architecture

### Service Layer

**File**: `src/services/solanaService.ts`

The Solana service now includes:
- `addLiquidityRaydium()` - Add liquidity to Raydium pools
- `addLiquidityOrca()` - Add liquidity to Orca pools
- `removeLiquidityRaydium()` - Remove liquidity from Raydium pools
- `removeLiquidityOrca()` - Remove liquidity from Orca pools
- `addLiquidity()` - Unified interface (auto-detects DEX)
- `removeLiquidity()` - Unified interface (auto-detects DEX)

### DEX Service Integration

**File**: `src/services/dexService.ts`

The DEX service automatically routes liquidity operations to the appropriate chain:
- **Ethereum**: Uses Uniswap V2
- **Solana**: Uses Raydium or Orca (configurable)

### UI Component

**File**: `src/components/LiquidityPool.tsx`

The Liquidity Pool component now:
- Detects connected wallet type (MetaMask or Phantom)
- Routes operations to appropriate DEX service
- Shows loading states during transactions
- Displays transaction hashes on success
- Handles errors gracefully

## Dependencies Added

```json
{
  "@orca-so/sdk": "^1.2.26",
  "@orca-so/common-sdk": "^0.7.0",
  "decimal.js": "latest"
}
```

**Note**: Orca SDK is deprecated but still functional. Consider migrating to Orca Whirlpools SDK for production.

## Usage

### Adding Liquidity (Phantom Wallet)

```typescript
// 1. Connect Phantom wallet
await connectPhantom();

// 2. Specify tokens and amounts
const tokenA = 'So11111111111111111111111111111111111111112'; // SOL
const tokenB = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC
const amountA = '1.0'; // 1 SOL
const amountB = '100.0'; // 100 USDC

// 3. Add liquidity
const result = await dexService.addLiquidity(
  tokenA,
  tokenB,
  amountA,
  amountB,
  0.5, // 0.5% slippage tolerance
  walletAddress
);

if (result.success) {
  console.log('Transaction:', result.txHash);
}
```

### Removing Liquidity (Phantom Wallet)

```typescript
// 1. Connect Phantom wallet
await connectPhantom();

// 2. Specify pool and amount
const poolAddress = 'YourPoolAddressHere';
const liquidityAmount = '50'; // 50% of your liquidity

// 3. Remove liquidity
const result = await dexService.removeLiquidity(
  poolAddress,
  liquidityAmount,
  0.5, // 0.5% slippage tolerance
  walletAddress
);

if (result.success) {
  console.log('Transaction:', result.txHash);
}
```

## Current Limitations

### 1. Pool Keys Required (Raydium)

Raydium operations require pool keys that must be fetched from the Raydium API:

```typescript
// Example: Fetching pool keys (not implemented)
const poolKeys = await fetch('https://api.raydium.io/v2/main/pools')
  .then(res => res.json())
  .then(data => data.find(pool => pool.id === 'your-pool-id'));
```

**Workaround**: Users can add/remove liquidity directly on https://raydium.io/

### 2. Pool Configuration Required (Orca)

Orca operations require pool configuration:

```typescript
// Example: Pool configuration
const poolConfig = {
  address: new PublicKey('pool-address'),
  nonce: 255,
  authority: new PublicKey('authority-address'),
  poolTokenMint: new PublicKey('pool-token-mint'),
  tokenAccountA: new PublicKey('token-a-account'),
  tokenAccountB: new PublicKey('token-b-account'),
  feeAccount: new PublicKey('fee-account'),
  // ... more configuration
};
```

**Workaround**: Users can add/remove liquidity directly on https://www.orca.so/

### 3. Token Balance Display

Token balance fetching is simplified and returns 0. In production, implement proper SPL token account parsing:

```typescript
// Production implementation needed:
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';

const tokenAccount = await getAssociatedTokenAddress(tokenMint, owner);
const account = await getAccount(connection, tokenAccount);
const balance = Number(account.amount) / Math.pow(10, decimals);
```

## Production Implementation Steps

### Step 1: Fetch Pool Information

Implement pool information fetching from DEX APIs:

```typescript
// Raydium
const raydiumPools = await fetch('https://api.raydium.io/v2/main/pools');

// Orca
const orcaPools = await fetch('https://api.orca.so/v1/pools');
```

### Step 2: Implement Token Account Management

Add proper SPL token account handling:
- Create associated token accounts if they don't exist
- Fetch and parse token account balances
- Handle token approvals

### Step 3: Add Pool Selection UI

Create a pool selector component:
- Display available pools
- Show pool statistics (TVL, APY, volume)
- Filter by token pairs
- Sort by various metrics

### Step 4: Implement Position Tracking

Track user's liquidity positions:
- Fetch user's LP token balances
- Calculate position value
- Show earned fees
- Display impermanent loss

### Step 5: Add Transaction History

Implement transaction tracking:
- Store transaction hashes
- Fetch transaction status
- Display transaction history
- Show pending transactions

## Error Handling

The service includes comprehensive error handling:

```typescript
try {
  const result = await dexService.addLiquidity(...);
  if (result.success) {
    // Handle success
  } else {
    // Handle failure
    console.error(result.error);
  }
} catch (error) {
  // Handle exception
  console.error('Unexpected error:', error);
}
```

## Security Considerations

### 1. Transaction Simulation

Always simulate transactions before execution:
```typescript
const simulation = await connection.simulateTransaction(transaction);
if (simulation.value.err) {
  throw new Error('Transaction simulation failed');
}
```

### 2. Slippage Protection

Implement reasonable slippage limits:
- Default: 0.5%
- Maximum: 5%
- User-configurable

### 3. Pool Verification

Verify pool addresses before operations:
- Check pool exists
- Verify token mints
- Validate pool authority

### 4. Amount Validation

Validate input amounts:
- Check sufficient balance
- Verify minimum amounts
- Prevent dust attacks

## Testing

### Devnet Testing

Use Solana devnet for testing:

```typescript
const connection = new Connection(
  clusterApiUrl('devnet'),
  'confirmed'
);
```

### Test Tokens

Get devnet tokens from faucets:
- SOL: https://solfaucet.com/
- USDC: Raydium/Orca devnet faucets

### Test Pools

Use devnet pools for testing:
- Raydium devnet pools
- Orca devnet pools

## Performance Optimization

### 1. Bundle Size

Current bundle size: 1.74MB (527KB gzipped)

Optimization strategies:
- Lazy load DEX SDKs
- Use dynamic imports
- Implement code splitting

```typescript
// Example: Lazy loading
const loadRaydiumSDK = () => import('@raydium-io/raydium-sdk');
const loadOrcaSDK = () => import('@orca-so/sdk');
```

### 2. API Caching

Cache pool information:
- Cache pool keys (5 minutes)
- Cache pool stats (1 minute)
- Cache token prices (30 seconds)

### 3. Transaction Batching

Batch multiple operations:
- Combine token approvals
- Bundle multiple swaps
- Optimize instruction count

## Troubleshooting

### Issue: "Pool keys required"

**Solution**: Implement pool key fetching from Raydium API or direct users to Raydium website.

### Issue: "Pool config required"

**Solution**: Implement pool config fetching from Orca API or direct users to Orca website.

### Issue: "Insufficient balance"

**Solution**: Check token balances before operations and display clear error messages.

### Issue: "Transaction failed"

**Solution**: 
1. Check network status
2. Verify sufficient SOL for fees
3. Validate slippage settings
4. Retry with higher priority fees

## Resources

### Documentation
- Raydium SDK: https://github.com/raydium-io/raydium-sdk
- Orca SDK: https://github.com/orca-so/typescript-sdk
- Solana Web3.js: https://solana-labs.github.io/solana-web3.js/

### APIs
- Raydium API: https://api.raydium.io/
- Orca API: https://api.orca.so/
- Jupiter API: https://quote-api.jup.ag/

### Community
- Raydium Discord: https://discord.gg/raydium
- Orca Discord: https://discord.gg/orca
- Solana Discord: https://discord.gg/solana

## Future Enhancements

1. **Whirlpools Integration**: Migrate to Orca Whirlpools for concentrated liquidity
2. **Yield Farming**: Add support for Raydium farms
3. **Auto-compounding**: Implement automatic reward claiming and reinvestment
4. **Multi-hop Routes**: Support complex liquidity provision strategies
5. **Analytics Dashboard**: Show detailed pool analytics and performance metrics

---

**Last Updated**: January 31, 2026  
**Version**: 1.4.0  
**Status**: ✅ Integrated (Requires Pool Configuration)
