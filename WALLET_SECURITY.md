# Wallet Security & Connection Flow

## 🔐 Security Overview

**Your wallet security is NEVER compromised.** This application follows official Web3 security standards and **cannot access your wallet without explicit approval**.

---

## How Wallet Connection Works

### MetaMask Connection Flow

1. **User clicks "Connect MetaMask" button**
2. **App requests connection** via `eth_requestAccounts` (EIP-1102 standard)
3. **MetaMask popup appears** (if not already connected)
   - If locked: User must enter password to unlock
   - User must click "Connect" to approve
   - User selects which accounts to share
4. **Connection approved** - App receives public address only
5. **No private keys ever leave MetaMask**

### Phantom Connection Flow

1. **User clicks "Connect Phantom" button**
2. **App requests connection** via `solana.connect()` (Solana wallet standard)
3. **Phantom popup appears** (if not already connected)
   - If locked: User must enter password to unlock
   - User must click "Connect" to approve
4. **Connection approved** - App receives public key only
5. **No private keys ever leave Phantom**

---

## What the App CAN Do

✅ **Read your public address** - Displayed in the UI
✅ **Read your token balances** - Shown in wallet display
✅ **Request transaction approval** - You approve each transaction
✅ **Suggest network changes** - You approve network switches

## What the App CANNOT Do

❌ **Access your private keys** - Never leaves your wallet
❌ **Sign transactions without approval** - Every transaction requires your explicit approval
❌ **Transfer funds automatically** - You must approve each transaction
❌ **Access your password** - Wallet extensions handle authentication

---

## Why You Might Not See the Popup

If you don't see the connection approval popup, it's because:

### 1. Already Connected
- You previously approved this site
- Your approval is cached in the wallet
- **To test approval flow**: Click "Disconnect" first, then reconnect

### 2. Wallet is Unlocked
- You entered your password earlier in this browser session
- Wallet remains unlocked until you lock it or close browser
- **To test password prompt**: Lock your wallet manually, then try connecting

### 3. Auto-Approve Enabled
- Some wallets have settings to auto-approve trusted sites
- Check your wallet settings if you want to disable this

---

## Testing the Security Flow

### Test MetaMask Approval

1. **Lock MetaMask**:
   - Click MetaMask extension icon
   - Click the three dots (⋮) → Lock
   
2. **Disconnect from site** (if already connected):
   - Click "Disconnect" button in the app
   - OR: MetaMask → Connected sites → Disconnect
   
3. **Try connecting**:
   - Click "Connect MetaMask" in the app
   - You should see password prompt
   - Then connection approval popup

### Test Phantom Approval

1. **Lock Phantom**:
   - Click Phantom extension icon
   - Click settings (⚙️) → Lock Wallet
   
2. **Disconnect from site** (if already connected):
   - Click "Disconnect" button in the app
   - OR: Phantom → Settings → Trusted Apps → Remove
   
3. **Try connecting**:
   - Click "Connect Phantom" in the app
   - You should see password prompt
   - Then connection approval popup

---

## Transaction Security

Every transaction requires explicit approval:

### Swap Transaction
1. User enters swap details
2. User clicks "Swap" button
3. **Wallet popup appears** with transaction details:
   - Token amounts
   - Gas fees
   - Slippage tolerance
4. **User must approve** - Click "Confirm" in wallet
5. Transaction executes only after approval

### Liquidity Transaction
1. User enters liquidity amounts
2. User clicks "Add Liquidity" or "Remove Liquidity"
3. **Wallet popup appears** for each step:
   - Token approval (if needed)
   - Add/remove liquidity transaction
4. **User must approve each step**
5. Transactions execute only after approval

---

## Error Messages Explained

### "Connection rejected"
- **Cause**: You clicked "Reject" or "Cancel" in the wallet popup
- **Solution**: Click "Connect" button again and approve in wallet

### "Connection request already pending"
- **Cause**: Previous connection request is still open in wallet
- **Solution**: Check wallet extension for pending request, or close and retry

### "Please make sure wallet is unlocked"
- **Cause**: Wallet is locked or extension is not responding
- **Solution**: Unlock wallet with password and try again

---

## Security Best Practices

### ✅ DO:
- Always verify transaction details before approving
- Keep your wallet password secure
- Lock your wallet when not in use
- Review connected sites regularly
- Use hardware wallets for large amounts

### ❌ DON'T:
- Never share your seed phrase or private keys
- Don't approve transactions you don't understand
- Don't leave wallet unlocked on shared computers
- Don't connect to untrusted sites

---

## Technical Implementation

### MetaMask (Ethereum)
```typescript
// Request connection - ALWAYS requires user approval
const accounts = await provider.send('eth_requestAccounts', []);

// Error handling
if (error.code === 4001) {
  // User rejected the connection
}
```

### Phantom (Solana)
```typescript
// Request connection - ALWAYS requires user approval
const response = await solana.connect();

// Error handling
if (error.code === 4001 || error.message?.includes('User rejected')) {
  // User rejected the connection
}
```

### Standards Followed
- **EIP-1102**: Ethereum account access standard
- **Solana Wallet Standard**: Official Solana wallet adapter protocol
- **EIP-1193**: Ethereum Provider JavaScript API
- **Web3 Security Best Practices**: No private key access, explicit approvals

---

## Frequently Asked Questions

### Q: Can this app steal my funds?
**A:** No. The app cannot sign transactions or access private keys. Every transaction requires your explicit approval in the wallet extension.

### Q: Why does it connect without asking for password?
**A:** Your wallet is already unlocked. Lock your wallet manually to see the password prompt.

### Q: Is my seed phrase safe?
**A:** Yes. Your seed phrase never leaves your wallet extension. This app only receives your public address.

### Q: Can I revoke access later?
**A:** Yes. In MetaMask: Connected sites → Disconnect. In Phantom: Settings → Trusted Apps → Remove.

### Q: What if I reject the connection?
**A:** The app won't connect. You can try again anytime by clicking the connect button.

---

## Additional Resources

- [MetaMask Security Guide](https://metamask.io/security/)
- [Phantom Security Best Practices](https://phantom.app/learn/security)
- [EIP-1102 Specification](https://eips.ethereum.org/EIPS/eip-1102)
- [Solana Wallet Standard](https://github.com/solana-labs/wallet-standard)

---

**Remember**: Your wallet security is in YOUR hands. This app follows all security standards, but you must approve every connection and transaction. Never share your private keys or seed phrase with anyone!
