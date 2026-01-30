# How to Swap Tokens - User Guide

## 🚀 Quick Start

### Step 1: Connect Your Wallet

#### For Ethereum (MetaMask)
1. Click the **🦊 MetaMask** button in the header
2. Approve the connection in MetaMask popup
3. Your wallet address and ETH balance will appear

#### For Solana (Phantom)
1. Click the **👻 Phantom** button in the header
2. Approve the connection in Phantom popup
3. Your wallet address and SOL balance will appear

### Step 2: Navigate to Swap

1. Click the **Swap** tab (should be selected by default)
2. You'll see the swap interface with two token input fields

### Step 3: Select Tokens

#### From Token (Top)
- Click the dropdown to select the token you want to swap FROM
- **Ethereum**: ETH, USDC, USDT, DAI
- **Solana**: SOL, USDC, USDT, RAY

#### To Token (Bottom)
- Click the dropdown to select the token you want to swap TO
- Choose any token different from your "From" token

### Step 4: Enter Amount

1. Type the amount you want to swap in the **From** field
2. The **To** field will automatically show the estimated output
3. Wait for the quote to load (shows "Loading..." while fetching)

### Step 5: Review Details

Check the swap details at the bottom:
- **Slippage Tolerance**: 0.5% (protects you from price changes)
- **Minimum Received**: Guaranteed minimum amount you'll receive
- **DEX**: Shows which exchange is being used
  - Ethereum: Uniswap V2
  - Solana: Jupiter Aggregator

### Step 6: Execute Swap

1. Click the **Swap** button
2. **For MetaMask**:
   - First transaction: Approve token (if needed)
   - Second transaction: Execute swap
   - Confirm both in MetaMask
3. **For Phantom**:
   - Single transaction to execute swap
   - Confirm in Phantom
4. Wait for confirmation (button shows "⏳ Swapping...")
5. Success! You'll see a confirmation with transaction hash

## 💡 Tips & Best Practices

### Before Swapping

1. **Check Your Balance**
   - Make sure you have enough tokens to swap
   - Keep some ETH/SOL for gas fees

2. **Understand Slippage**
   - 0.5% slippage means price can change up to 0.5%
   - Higher slippage = more likely to succeed
   - Lower slippage = better price protection

3. **Review the Quote**
   - Check the estimated output amount
   - Compare with other exchanges if needed
   - Refresh if quote seems old

### During Swap

1. **Don't Close the Browser**
   - Keep the page open until confirmation
   - Closing may cause transaction to fail

2. **Be Patient**
   - Ethereum: 15-30 seconds
   - Solana: 1-5 seconds
   - Network congestion may cause delays

3. **Check Transaction Status**
   - Click the transaction hash to view on explorer
   - Ethereum: Etherscan
   - Solana: Solscan

### After Swap

1. **Verify Receipt**
   - Check your wallet balance
   - Tokens should appear within minutes
   - Refresh if not showing immediately

2. **Save Transaction Hash**
   - Keep for your records
   - Useful for tax reporting
   - Can track on blockchain explorer

## 🔧 Troubleshooting

### "Connect Wallet" Button Doesn't Work

**Problem**: Wallet extension not detected

**Solutions**:
- Install MetaMask or Phantom extension
- Refresh the page
- Check if extension is enabled
- Try a different browser

### "Enter Amount" - Can't Swap

**Problem**: No amount entered

**Solutions**:
- Type a number in the "From" field
- Make sure it's greater than 0
- Check you have sufficient balance

### "Insufficient Balance"

**Problem**: Not enough tokens

**Solutions**:
- Reduce swap amount
- Add more tokens to your wallet
- Check you have gas fees (ETH/SOL)

### "Transaction Failed"

**Common Causes**:
1. **Insufficient Gas**
   - Keep some ETH/SOL for fees
   - Ethereum: ~$5-50 depending on network
   - Solana: ~$0.01

2. **Slippage Too Low**
   - Price moved more than 0.5%
   - Try again or increase slippage

3. **Network Congestion**
   - Wait and try again
   - Increase gas price (MetaMask)

4. **Token Not Approved**
   - First transaction must complete
   - Approve token before swapping

### Quote Not Loading

**Problem**: "Loading..." doesn't finish

**Solutions**:
- Check internet connection
- Refresh the page
- Try different token pair
- Check if DEX API is online

### Swap Takes Too Long

**Ethereum**:
- Normal: 15-30 seconds
- Slow: 1-5 minutes
- Check Etherscan for status

**Solana**:
- Normal: 1-5 seconds
- Slow: 10-30 seconds
- Check Solscan for status

## 📊 Example Swaps

### Example 1: Swap ETH for USDC

1. Connect MetaMask
2. Select "ETH" in From dropdown
3. Select "USDC" in To dropdown
4. Enter "0.1" in From field
5. See estimated USDC output (~$300 at current prices)
6. Click "Swap"
7. Approve in MetaMask (2 transactions)
8. Wait for confirmation
9. Receive USDC in wallet

**Cost**: ~$10-30 in gas fees

### Example 2: Swap SOL for USDC

1. Connect Phantom
2. Select "SOL" in From dropdown
3. Select "USDC" in To dropdown
4. Enter "1" in From field
5. See estimated USDC output (~$100 at current prices)
6. Click "Swap"
7. Approve in Phantom (1 transaction)
8. Wait for confirmation
9. Receive USDC in wallet

**Cost**: ~$0.01 in gas fees

### Example 3: Swap USDC for DAI (Ethereum)

1. Connect MetaMask
2. Select "USDC" in From dropdown
3. Select "DAI" in To dropdown
4. Enter "100" in From field
5. See estimated DAI output (~100 DAI)
6. Click "Swap"
7. Approve USDC (if first time)
8. Execute swap
9. Receive DAI in wallet

**Cost**: ~$15-40 in gas fees

## 🔒 Security Tips

### Protect Your Wallet

1. **Never Share**:
   - Private keys
   - Seed phrases
   - Password

2. **Verify Transactions**:
   - Check amounts before confirming
   - Verify recipient address
   - Review gas fees

3. **Use Official Sites**:
   - Bookmark the official URL
   - Check for HTTPS
   - Verify domain name

### Avoid Scams

1. **Red Flags**:
   - Requests for private keys
   - Too-good-to-be-true prices
   - Urgent action required
   - Suspicious token names

2. **Best Practices**:
   - Start with small amounts
   - Test with known tokens
   - Research unknown tokens
   - Use hardware wallet for large amounts

## 📱 Mobile Usage

### iOS (Safari)

1. Install MetaMask or Phantom app
2. Open app's built-in browser
3. Navigate to SeasonDEX
4. Connect wallet
5. Swap as normal

### Android (Chrome)

1. Install MetaMask or Phantom app
2. Open app's built-in browser
3. Navigate to SeasonDEX
4. Connect wallet
5. Swap as normal

## 💰 Fee Structure

### Ethereum (Uniswap V2)

- **Protocol Fee**: 0.3% of swap amount
- **Gas Fee**: Variable ($5-50)
- **Total Cost**: Protocol fee + Gas fee

### Solana (Jupiter)

- **Protocol Fee**: ~0.1-0.3% (varies by route)
- **Gas Fee**: ~$0.01
- **Total Cost**: Protocol fee + Gas fee

## 📈 Advanced Features

### Slippage Tolerance

**What it is**: Maximum price change you'll accept

**Current Setting**: 0.5% (fixed)

**How it works**:
- Quote: 100 USDC
- Slippage: 0.5%
- Minimum: 99.5 USDC
- If price drops below 99.5, transaction fails

### Price Impact

**What it is**: How much your trade affects the price

**Low Impact**: < 1% (good)
**Medium Impact**: 1-3% (acceptable)
**High Impact**: > 3% (consider splitting trade)

### Best Execution

**Ethereum**: Uniswap V2 direct routing
**Solana**: Jupiter finds best route across multiple DEXs

## 🎯 Success Indicators

### Swap Successful ✅

- Green checkmark appears
- Transaction hash displayed
- Balance updates in wallet
- Can view on blockchain explorer

### Swap Failed ❌

- Red X appears
- Error message shown
- Balance unchanged
- Can retry immediately

## 📞 Need Help?

### Resources

- **Documentation**: See SMART_CONTRACT_INTEGRATION.md
- **Uniswap Docs**: https://docs.uniswap.org
- **Jupiter Docs**: https://station.jup.ag/docs
- **MetaMask Support**: https://support.metamask.io
- **Phantom Support**: https://help.phantom.app

### Common Questions

**Q: How long does a swap take?**
A: Ethereum: 15-30 seconds, Solana: 1-5 seconds

**Q: Can I cancel a swap?**
A: No, once confirmed on blockchain it cannot be cancelled

**Q: What if I enter the wrong amount?**
A: Review carefully before confirming. Cannot undo after confirmation.

**Q: Are there limits on swap amounts?**
A: No hard limits, but large swaps may have high price impact

**Q: Can I swap any token?**
A: Currently limited to listed tokens. More coming soon!

---

**Happy Swapping! 🎉**

Remember: Always start with small amounts to test, and never invest more than you can afford to lose.
