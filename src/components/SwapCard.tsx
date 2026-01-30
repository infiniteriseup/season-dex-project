import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useWallet } from '../contexts/WalletContext';
import { dexService } from '../services/dexService';
import { ETHEREUM_TOKENS } from '../services/uniswapService';
import { SOLANA_TOKENS } from '../services/solanaService';

export const SwapCard: React.FC = () => {
  const { theme } = useTheme();
  const { wallet } = useWallet();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [isSwapping, setIsSwapping] = useState(false);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [slippage] = useState(0.5); // Fixed slippage for now

  // Get quote when amount changes
  useEffect(() => {
    const getQuote = async () => {
      if (!fromAmount || parseFloat(fromAmount) === 0 || !wallet.connected) {
        setToAmount('');
        return;
      }

      setIsLoadingQuote(true);
      try {
        const tokenInAddress = getTokenAddress(fromToken);
        const tokenOutAddress = getTokenAddress(toToken);
        
        const quote = await dexService.getQuote(
          tokenInAddress,
          tokenOutAddress,
          fromAmount,
          slippage
        );
        
        setToAmount(parseFloat(quote.outputAmount).toFixed(6));
      } catch (error) {
        console.error('Quote error:', error);
        setToAmount('0');
      } finally {
        setIsLoadingQuote(false);
      }
    };

    const debounce = setTimeout(getQuote, 500);
    return () => clearTimeout(debounce);
  }, [fromAmount, fromToken, toToken, wallet.connected, slippage]);

  const getTokenAddress = (token: string): string => {
    if (wallet.walletType === 'metamask') {
      if (token === 'ETH') return 'ETH';
      return ETHEREUM_TOKENS[token as keyof typeof ETHEREUM_TOKENS] || token;
    } else {
      return SOLANA_TOKENS[token as keyof typeof SOLANA_TOKENS] || token;
    }
  };

  const getAvailableTokens = () => {
    if (wallet.walletType === 'metamask') {
      return ['ETH', 'USDC', 'USDT', 'DAI'];
    } else {
      return ['SOL', 'USDC', 'USDT', 'RAY'];
    }
  };

  const handleSwap = async () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) === 0) {
      alert('Please enter an amount');
      return;
    }

    setIsSwapping(true);
    try {
      const tokenInAddress = getTokenAddress(fromToken);
      const tokenOutAddress = getTokenAddress(toToken);

      const result = await dexService.executeSwap(
        tokenInAddress,
        tokenOutAddress,
        fromAmount,
        slippage,
        wallet.address!
      );

      if (result.success) {
        alert(`✅ Swap successful!\nTransaction: ${result.txHash}`);
        setFromAmount('');
        setToAmount('');
      } else {
        alert(`❌ Swap failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Swap error:', error);
      alert(`❌ Swap failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSwapping(false);
    }
  };

  const switchTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const availableTokens = getAvailableTokens();

  return (
    <div
      style={{
        background: theme.cardBg,
        borderRadius: '24px',
        padding: 'clamp(1rem, 4vw, 2rem)',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: `2px solid ${theme.border}`,
      }}
    >
      <h2 style={{ color: theme.text, marginTop: 0, marginBottom: '1.5rem', fontSize: 'clamp(1.3rem, 4vw, 1.75rem)' }}>
        Swap Tokens
        {wallet.connected && (
          <span style={{ fontSize: '0.7rem', marginLeft: '0.5rem', opacity: 0.7 }}>
            ({wallet.walletType === 'metamask' ? 'Uniswap V2' : 'Jupiter'})
          </span>
        )}
      </h2>

      {/* From Token */}
      <div
        style={{
          background: theme.primary + '15',
          borderRadius: '16px',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>From</span>
          <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
            Balance: {wallet.connected ? wallet.balance?.slice(0, 8) : '0.00'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            style={{
              flex: '1 1 150px',
              minWidth: '0',
              background: 'transparent',
              border: 'none',
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
              color: theme.text,
              outline: 'none',
            }}
          />
          <select
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              background: theme.primary,
              color: theme.text,
              border: 'none',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {availableTokens.map(token => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Switch Button */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
        <button
          onClick={switchTokens}
          style={{
            background: theme.accent,
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'rotate(180deg)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
        >
          ⇅
        </button>
      </div>

      {/* To Token */}
      <div
        style={{
          background: theme.secondary + '15',
          borderRadius: '16px',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>To</span>
          <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Balance: 0.00</span>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="number"
            value={toAmount}
            readOnly
            placeholder={isLoadingQuote ? 'Loading...' : '0.0'}
            style={{
              flex: '1 1 150px',
              minWidth: '0',
              background: 'transparent',
              border: 'none',
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
              color: theme.text,
              outline: 'none',
            }}
          />
          <select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              background: theme.secondary,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {availableTokens.map(token => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={!wallet.connected || !fromAmount || isSwapping || isLoadingQuote}
        style={{
          width: '100%',
          padding: 'clamp(0.85rem, 3vw, 1rem)',
          background: wallet.connected && fromAmount && !isSwapping ? theme.gradient : theme.border,
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          fontSize: 'clamp(1rem, 3vw, 1.1rem)',
          fontWeight: 'bold',
          cursor: wallet.connected && fromAmount && !isSwapping ? 'pointer' : 'not-allowed',
          transition: 'transform 0.2s',
          opacity: isSwapping || isLoadingQuote ? 0.7 : 1,
        }}
        onMouseOver={(e) =>
          wallet.connected && fromAmount && !isSwapping && (e.currentTarget.style.transform = 'scale(1.02)')
        }
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {!wallet.connected 
          ? 'Connect Wallet' 
          : !fromAmount 
          ? 'Enter Amount' 
          : isSwapping 
          ? '⏳ Swapping...' 
          : isLoadingQuote
          ? '⏳ Loading...'
          : 'Swap'}
      </button>

      {/* Info */}
      <div
        style={{
          marginTop: '1rem',
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          background: theme.primary + '10',
          borderRadius: '12px',
          fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
          color: theme.textSecondary,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Slippage Tolerance</span>
          <span style={{ fontWeight: 'bold' }}>{slippage}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Minimum Received</span>
          <span style={{ fontWeight: 'bold' }}>
            {toAmount ? (parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6) : '0'} {toToken}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>DEX</span>
          <span style={{ fontWeight: 'bold' }}>
            {wallet.walletType === 'metamask' ? 'Uniswap V2' : 'Jupiter Aggregator'}
          </span>
        </div>
      </div>
    </div>
  );
};
