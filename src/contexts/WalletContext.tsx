import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ethers } from 'ethers';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import type { WalletState } from '../types';
import { dexService } from '../services/dexService';

interface WalletContextType {
  wallet: WalletState;
  connectMetaMask: () => Promise<void>;
  connectPhantom: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  dexService: typeof dexService;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const initialWalletState: WalletState = {
  address: null,
  chainId: null,
  balance: null,
  connected: false,
  walletType: null,
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>(initialWalletState);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectMetaMask = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed. Please install it to continue.');
        return;
      }

      // Check if MetaMask is locked
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        console.log('🔐 MetaMask is locked or not connected. Requesting connection...');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // This ALWAYS triggers MetaMask popup for approval if not already connected
      // User must:
      // 1. Unlock MetaMask with password (if locked)
      // 2. Click "Connect" to approve this site
      // 3. Select which accounts to connect
      console.log('🔐 Requesting MetaMask connection approval...');
      const requestedAccounts = await provider.send('eth_requestAccounts', []);
      console.log('✅ User approved MetaMask connection');
      
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(requestedAccounts[0]);

      // Initialize DEX service for Ethereum
      await dexService.initializeEthereum(provider);

      setWallet({
        address: requestedAccounts[0],
        chainId: Number(network.chainId),
        balance: ethers.formatEther(balance),
        connected: true,
        walletType: 'metamask',
      });

      console.log('✅ MetaMask connected and DEX service initialized');
    } catch (error: any) {
      console.error('MetaMask connection error:', error);
      
      // Handle specific error cases
      if (error.code === 4001) {
        alert('Connection rejected. You must approve the connection in MetaMask to continue.');
      } else if (error.code === -32002) {
        alert('Connection request already pending. Please check your MetaMask extension.');
      } else {
        alert('Failed to connect to MetaMask. Please make sure MetaMask is unlocked and try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const connectPhantom = async () => {
    setIsConnecting(true);
    try {
      const { solana } = window as any;
      
      if (!solana?.isPhantom) {
        alert('Phantom wallet is not installed. Please install it to continue.');
        return;
      }

      // Check if Phantom is already connected
      if (!solana.isConnected) {
        console.log('🔐 Phantom is not connected. Requesting connection...');
      }

      // This ALWAYS triggers Phantom popup for approval if not already connected
      // User must:
      // 1. Unlock Phantom with password (if locked)
      // 2. Click "Connect" to approve this site
      // 3. Approve the connection request
      console.log('🔐 Requesting Phantom connection approval...');
      const response = await solana.connect();
      console.log('✅ User approved Phantom connection');
      
      const publicKey = response.publicKey.toString();
      
      // Use environment variable RPC or fallback to devnet (more reliable than mainnet public RPC)
      const rpcEndpoint = import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl('devnet');
      const connection = new Connection(rpcEndpoint, {
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 60000,
      });

      // Try to get balance, but don't fail connection if it errors
      let balance = '0';
      try {
        const balanceLamports = await connection.getBalance(new PublicKey(publicKey));
        balance = (balanceLamports / 1e9).toString();
      } catch (balanceError) {
        console.warn('⚠️ Could not fetch balance (RPC rate limit), but wallet connected:', balanceError);
        // Balance will remain '0' but connection succeeds
      }

      // Initialize DEX service for Solana
      dexService.initializeSolana(rpcEndpoint);

      setWallet({
        address: publicKey,
        chainId: null,
        balance,
        connected: true,
        walletType: 'phantom',
      });

      console.log('✅ Phantom connected and DEX service initialized');
    } catch (error: any) {
      console.error('Phantom connection error:', error);
      
      // Handle specific error cases
      if (error.code === 4001 || error.message?.includes('User rejected')) {
        alert('Connection rejected. You must approve the connection in Phantom to continue.');
      } else if (error.code === -32002) {
        alert('Connection request already pending. Please check your Phantom extension.');
      } else {
        alert('Failed to connect to Phantom. Please make sure Phantom is unlocked and try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    // Explicitly disconnect from wallets to clear cached approvals
    if (wallet.walletType === 'phantom') {
      const { solana } = window as any;
      if (solana?.isPhantom && solana.isConnected) {
        solana.disconnect();
        console.log('🔌 Phantom disconnected (cached approval cleared)');
      }
    }
    
    setWallet(initialWalletState);
    console.log('🔌 Wallet disconnected');
  };

  useEffect(() => {
    // Listen for MetaMask account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (wallet.walletType === 'metamask') {
          connectMetaMask();
        }
      });

      window.ethereum.on('chainChanged', () => {
        if (wallet.walletType === 'metamask') {
          connectMetaMask();
        }
      });
    }

    // Listen for Phantom disconnect
    const { solana } = window as any;
    if (solana?.isPhantom) {
      solana.on('disconnect', () => {
        if (wallet.walletType === 'phantom') {
          disconnect();
        }
      });
    }
  }, [wallet.walletType]);

  return (
    <WalletContext.Provider value={{ wallet, connectMetaMask, connectPhantom, disconnect, isConnecting, dexService }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
