import { ethers } from 'ethers';

// Uniswap V2 Router ABI (minimal for swaps)
const UNISWAP_V2_ROUTER_ABI = [
  'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
  'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
  'function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)',
  'function removeLiquidityETH(address token, uint liquidity, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external returns (uint amountToken, uint amountETH)',
];

// ERC20 ABI (minimal)
const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
];

// Uniswap V2 Router address on Ethereum mainnet
const UNISWAP_V2_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

// WETH address on Ethereum mainnet
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

// Common token addresses on Ethereum mainnet
export const ETHEREUM_TOKENS = {
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
};

export interface SwapParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  slippageTolerance: number; // in percentage (e.g., 0.5 for 0.5%)
  recipient: string;
}

export interface LiquidityParams {
  token: string;
  amountToken: string;
  amountETH: string;
  slippageTolerance: number;
  recipient: string;
}

export class UniswapService {
  private provider: ethers.BrowserProvider;
  private signer: ethers.Signer | null = null;
  private routerContract: ethers.Contract | null = null;

  constructor(provider: ethers.BrowserProvider) {
    this.provider = provider;
  }

  async initialize() {
    this.signer = await this.provider.getSigner();
    this.routerContract = new ethers.Contract(
      UNISWAP_V2_ROUTER,
      UNISWAP_V2_ROUTER_ABI,
      this.signer
    );
  }

  /**
   * Get estimated output amount for a swap
   */
  async getAmountOut(amountIn: string, tokenIn: string, tokenOut: string): Promise<string> {
    if (!this.routerContract) throw new Error('Service not initialized');

    const path = this.getPath(tokenIn, tokenOut);
    const amounts = await this.routerContract.getAmountsOut(
      ethers.parseUnits(amountIn, 18),
      path
    );

    return ethers.formatUnits(amounts[amounts.length - 1], 18);
  }

  /**
   * Execute a token swap
   */
  async swap(params: SwapParams): Promise<ethers.TransactionResponse> {
    if (!this.routerContract || !this.signer) throw new Error('Service not initialized');

    const { tokenIn, tokenOut, amountIn, slippageTolerance, recipient } = params;
    const path = this.getPath(tokenIn, tokenOut);
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    // Get expected output amount
    const amountOut = await this.getAmountOut(amountIn, tokenIn, tokenOut);
    const amountOutMin = this.calculateMinAmount(amountOut, slippageTolerance);

    // If swapping from ETH
    if (tokenIn === 'ETH' || tokenIn === WETH_ADDRESS) {
      return await this.routerContract.swapExactETHForTokens(
        ethers.parseUnits(amountOutMin, 18),
        path,
        recipient,
        deadline,
        { value: ethers.parseEther(amountIn) }
      );
    }

    // If swapping to ETH
    if (tokenOut === 'ETH' || tokenOut === WETH_ADDRESS) {
      // Approve token first
      await this.approveToken(tokenIn, amountIn);

      return await this.routerContract.swapExactTokensForETH(
        ethers.parseUnits(amountIn, 18),
        ethers.parseUnits(amountOutMin, 18),
        path,
        recipient,
        deadline
      );
    }

    // Token to token swap
    await this.approveToken(tokenIn, amountIn);

    return await this.routerContract.swapExactTokensForTokens(
      ethers.parseUnits(amountIn, 18),
      ethers.parseUnits(amountOutMin, 18),
      path,
      recipient,
      deadline
    );
  }

  /**
   * Add liquidity to a pool
   */
  async addLiquidity(params: LiquidityParams): Promise<ethers.TransactionResponse> {
    if (!this.routerContract || !this.signer) throw new Error('Service not initialized');

    const { token, amountToken, amountETH, slippageTolerance, recipient } = params;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    // Calculate minimum amounts with slippage
    const amountTokenMin = this.calculateMinAmount(amountToken, slippageTolerance);
    const amountETHMin = this.calculateMinAmount(amountETH, slippageTolerance);

    // Approve token
    await this.approveToken(token, amountToken);

    return await this.routerContract.addLiquidityETH(
      token,
      ethers.parseUnits(amountToken, 18),
      ethers.parseUnits(amountTokenMin, 18),
      ethers.parseEther(amountETHMin),
      recipient,
      deadline,
      { value: ethers.parseEther(amountETH) }
    );
  }

  /**
   * Remove liquidity from a pool
   */
  async removeLiquidity(
    token: string,
    liquidity: string,
    slippageTolerance: number,
    recipient: string
  ): Promise<ethers.TransactionResponse> {
    if (!this.routerContract || !this.signer) throw new Error('Service not initialized');

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    // For simplicity, setting min amounts to 0 (in production, calculate properly)
    const amountTokenMin = '0';
    const amountETHMin = '0';

    return await this.routerContract.removeLiquidityETH(
      token,
      ethers.parseUnits(liquidity, 18),
      ethers.parseUnits(amountTokenMin, 18),
      ethers.parseEther(amountETHMin),
      recipient,
      deadline
    );
  }

  /**
   * Approve token spending
   */
  private async approveToken(tokenAddress: string, amount: string): Promise<void> {
    if (!this.signer) throw new Error('Signer not available');

    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, this.signer);

    // Check current allowance
    const signerAddress = await this.signer.getAddress();
    const allowance = await tokenContract.allowance(signerAddress, UNISWAP_V2_ROUTER);

    const amountBigInt = ethers.parseUnits(amount, 18);

    // Only approve if allowance is insufficient
    if (allowance < amountBigInt) {
      const tx = await tokenContract.approve(UNISWAP_V2_ROUTER, ethers.MaxUint256);
      await tx.wait();
    }
  }

  /**
   * Get swap path between two tokens
   */
  private getPath(tokenIn: string, tokenOut: string): string[] {
    // Handle ETH
    const tokenInAddress = tokenIn === 'ETH' ? WETH_ADDRESS : tokenIn;
    const tokenOutAddress = tokenOut === 'ETH' ? WETH_ADDRESS : tokenOut;

    // Direct path if one token is WETH
    if (tokenInAddress === WETH_ADDRESS || tokenOutAddress === WETH_ADDRESS) {
      return [tokenInAddress, tokenOutAddress];
    }

    // Route through WETH for other token pairs
    return [tokenInAddress, WETH_ADDRESS, tokenOutAddress];
  }

  /**
   * Calculate minimum amount with slippage tolerance
   */
  private calculateMinAmount(amount: string, slippageTolerance: number): string {
    const amountNum = parseFloat(amount);
    const minAmount = amountNum * (1 - slippageTolerance / 100);
    return minAmount.toString();
  }

  /**
   * Get token balance
   */
  async getTokenBalance(tokenAddress: string, userAddress: string): Promise<string> {
    if (!this.signer) throw new Error('Signer not available');

    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, this.provider);
    const balance = await tokenContract.balanceOf(userAddress);
    return ethers.formatUnits(balance, 18);
  }
}
