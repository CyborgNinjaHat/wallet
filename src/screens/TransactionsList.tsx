import { TransactionRow } from '../components/TransactionRow';
import { WalletSummary } from '../components/WalletSummary';

import type { Transaction } from '../types';

interface TransactionsListProps {
  transactions: Transaction[];
  balanceCents: number;
  cardLimitCents: number;
  today: Date;
  iconBackgrounds: Record<string, string>;
  onSelect: (transaction: Transaction) => void;
}

export const TransactionsList = ({
  transactions,
  balanceCents,
  cardLimitCents,
  today,
  iconBackgrounds,
  onSelect,
}: TransactionsListProps) => (
  <main className="px-3.75 pt-5.5 pb-9">
    <WalletSummary balanceCents={balanceCents} cardLimitCents={cardLimitCents} today={today} />
    <section aria-labelledby="transactions-heading" className="mt-6.5">
      <h1
        id="transactions-heading"
        className="mb-1.75 px-0.5 text-[22px] leading-6.5 font-bold tracking-[-0.45px]"
      >
        Latest Transactions
      </h1>
      <ul aria-label="Latest transactions" className="overflow-hidden rounded-xl bg-white">
        {transactions.map((transaction) => (
          <TransactionRow
            key={transaction.identifier}
            transaction={transaction}
            today={today}
            backgroundClass={iconBackgrounds[transaction.identifier]}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </section>
  </main>
);
