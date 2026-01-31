import { ethers } from 'ethers';
import { PublicKey, Transaction } from '@solana/web3.js';
import { UniswapService, type SwapParams as EthSwapParams, type LiquidityParams as EthLiquidityParams } from './uniswapService';
import { SolanaService, type SolanaSwapParams } from './solanaService';

export type WalletType = 'metamask' | 'phantom';

export interface SwapResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export interface QuoteResult {
  outputAmount: string;
  priceImpact: string;
  minimumReceived: string;
}

export class DEXService {
  private uniswapService: UniswapService | null = null;
  private solanaService: SolanaService | null = null;
  private walletType: WalletType | null = null;

  /**
   * Initialize service for Ethereum (MetaMask)
   */
  async initializeEthereum(provider: ethers.BrowserProvider) {
    this.walletType = 'metamask';
    this.uniswapService = new UniswapService(provider);
    await this.uniswapService.initialize();
  }

  /**
   * Initialize service for Solana (Phantom)
   */
  initializeSolana(endpoint?: string) {
    this.walletType = 'phantom';
    this.solanaService = new SolanaService(endpoint);
  }

  /**
   * Get quote for a swap
   */
  async getQuote(
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    slippageTolerance: number = 0.5
  ): Promise<QuoteResult> {
    try {
      if (this.walletType === 'metamask' && this.uniswapService) {
        const outputAmount = await this.uniswapService.getAmountOut(amountIn, tokenIn, tokenOut);
        const minimumReceived = (parseFloat(outputAmount) * (1 - slippageTolerance / 100)).toString();
        
        return {
          outputAmount,
          priceImpact: '0.5', // Simplified - should calculate actual price impact
          minimumReceived,
        };
      }

      if (this.walletType === 'phantom' && this.solanaService) {
        const outputAmount = await this.solanaService.getQuote(tokenIn, tokenOut, amountIn);
        const minimumReceived = (parseFloat(outputAmount) * (1 - slippageTolerance / 100)).toString();
        
        return {
          outputAmount,
          priceImpact: '0.5', // Simplified - should calculate actual price impact
          minimumReceived,
        };
      }

      throw new Error('Service not initialized');
    } catch (error) {
      console.error('Quote error:', error);
      return {
        outputAmount: '0',
        priceImpact: '0',
        minimumReceived: '0',
      };
    }
  }

  /**
   * Execute a swap
   */
  async executeSwap(
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    slippageTolerance: number,
    recipient: string
  ): Promise<SwapResult> {
    try {
      if (this.walletType === 'metamask' && this.uniswapService) {
        const params: EthSwapParams = {
          tokenIn,
          tokenOut,
          amountIn,
          slippageTolerance,
          recipient,
        };

        const tx = await this.uniswapService.swap(params);
        const receipt = await tx.wait();

        return {
          success: true,
          txHash: receipt?.hash,
        };
      }

      if (this.walletType === 'phantom' && this.solanaService) {
        // Get Phantom wallet
        const { solana } = window as any;
        if (!solana?.isPhantom) {
          throw new Error('Phantom wallet not found');
        }

        const publicKey = new PublicKey(recipient);
        const params: SolanaSwapParams = {
          tokenIn,
          tokenOut,
          amountIn,
          slippageTolerance,
          userPublicKey: publicKey,
        };

        const signature = await this.solanaService.swap(params, async (tx: Transaction) => {
          const signed = await solana.signTransaction(tx);
          return signed;
        });

        return {
          success: true,
          txHash: signature,
        };
      }

      throw new Error('Service not initialized');
    } catch (error) {
      console.error('Swap error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Add liquidity to a pool
   */
  async addLiquidity(
    tokenA: string,
    tokenB: string,
    amountA: string,
    amountB: string,
    slippageTolerance: number,
    recipient: string
  ): Promise<SwapResult> {
    try {
      if (this.walletType === 'metamask' && this.uniswapService) {
        // For Ethereum, use existing Uniswap implementation
        const params: EthLiquidityParams = {
          token: tokenA, // Assuming tokenA is the ERC20 token
          amountToken: amountA,
          amountETH: amountB, // Assuming tokenB is ETH
          slippageTolerance,
          recipient,
        };

        const tx = await this.uniswapService.addLiquidity(params);
        const receipt = await tx.wait();

        return {
          success: true,
          txHash: receipt?.hash,
        };
      }

      if (this.walletType === 'phantom' && this.solanaService) {
        // Get Phantom wallet
        const { solana } = window as any;
        if (!solana?.isPhantom) {
          throw new Error('Phantom wallet not found');
        }

        const publicKey = new PublicKey(recipient);
        
        // For Solana, use Raydium by default
        // Note: In production, you would fetch pool keys from Raydium API
        const params = {
          tokenA,
          tokenB,
          amountA,
          amountB,
          slippageTolerance,
          userPublicKey: publicKey,
          dexType: 'raydium' as const,
          // poolKeys would be fetched from Raydium API in production
        };

        const signature = await this.solanaService.addLiquidity(params, async (tx: Transaction) => {
          const signed = await solana.signTransaction(tx);
          return signed;
        });

        return {
          success: true,
          txHash: signature,
        };
      }

      throw new Error('Service not initialized');
    } catch (error) {
      console.error('Add liquidity error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Remove liquidity from a pool
   */
  async removeLiquidity(
    poolAddress: string,
    liquidity: string,
    slippageTolerance: number,
    recipient: string
  ): Promise<SwapResult> {
    try {
      if (this.walletType === 'metamask' && this.uniswapService) {
        // For Ethereum, use existing Uniswap implementation
        const tx = await this.uniswapService.removeLiquidity(
          poolAddress, // This is the token address in Uniswap context
          liquidity,
          slippageTolerance,
          recipient
        );
        const receipt = await tx.wait();

        return {
          success: true,
          txHash: receipt?.hash,
        };
      }

      if (this.walletType === 'phantom' && this.solanaService) {
        // Get Phantom wallet
        const { solana } = window as any;
        if (!solana?.isPhantom) {
          throw new Error('Phantom wallet not found');
        }

        const publicKey = new PublicKey(recipient);
        
        // For Solana, use Raydium by default
        const params = {
          poolAddress,
          liquidity,
          userPublicKey: publicKey,
          slippageTolerance,
          dexType: 'raydium' as const,
        };

        const signature = await this.solanaService.removeLiquidity(params, async (tx: Transaction) => {
          const signed = await solana.signTransaction(tx);
          return signed;
        });

        return {
          success: true,
          txHash: signature,
        };
      }

      throw new Error('Service not initialized');
    } catch (error) {
      console.error('Remove liquidity error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get token balance
   */
  async getTokenBalance(tokenAddress: string, userAddress: string): Promise<string> {
    try {
      if (this.walletType === 'metamask' && this.uniswapService) {
        return await this.uniswapService.getTokenBalance(tokenAddress, userAddress);
      }

      if (this.walletType === 'phantom' && this.solanaService) {
        const publicKey = new PublicKey(userAddress);
        const balance = await this.solanaService.getTokenBalance(tokenAddress, publicKey);
        return balance.toString();
      }

      return '0';
    } catch (error) {
      console.error('Balance error:', error);
      return '0';
    }
  }

  /**
   * Get current wallet type
   */
  getWalletType(): WalletType | null {
    return this.walletType;
  }

  /**
   * Check if service is initialized
   */
  isInitialized(): boolean {
    return (this.walletType === 'metamask' && this.uniswapService !== null) ||
           (this.walletType === 'phantom' && this.solanaService !== null);
  }
}

// Singleton instance
export const dexService = new DEXService();
