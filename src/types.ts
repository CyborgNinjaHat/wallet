export type TransactionType = 'Payment' | 'Credit';

export type IconKey = 'apple' | 'payment' | 'furniture' | 'target' | 'coffee' | 'globe';

export interface Transaction {
  identifier: string;
  type: TransactionType;
  amountCents: number;
  name: string;
  description: string;
  timestamp: string;
  pending: boolean;
  authorizedUser?: string;
  paymentSource: string;
  iconKey: IconKey;
  cashbackPercentage?: number;
}

export interface WalletData {
  cardLimitCents: number;
  transactions: Transaction[];
}
