export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface SeasonTheme {
  name: Season;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  border: string;
  gradient: string;
}

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI?: string;
  balance?: string;
}

export interface WalletState {
  address: string | null;
  chainId: number | null;
  balance: string | null;
  connected: boolean;
  walletType: 'metamask' | 'phantom' | null;
}

export interface SwapState {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  slippage: number;
}
