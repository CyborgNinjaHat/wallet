import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatTransactionAmount, formatTransactionTimestamp } from '../lib/wallet';

import type { Transaction } from '../types';

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

export const TransactionDetail = ({ transaction, onBack }: TransactionDetailProps) => {
  const formattedAmount = formatTransactionAmount(transaction.amountCents, transaction.type);
  const details = [
    { label: 'Description', value: transaction.description },
    { label: 'Type', value: transaction.type },
    ...(transaction.authorizedUser
      ? [{ label: 'Authorized User', value: transaction.authorizedUser }]
      : []),
    ...(transaction.cashbackPercentage !== undefined
      ? [{ label: 'Daily Cash', value: `${transaction.cashbackPercentage}%` }]
      : []),
  ];

  return (
    <main className="relative min-h-svh px-2.5 pt-15.75 pb-9">
      <button
        type="button"
        aria-label="Back to transactions"
        onClick={onBack}
        className="absolute top-4 left-0 flex size-11 items-center justify-start pl-0.75 text-wallet-blue focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-wallet-blue"
      >
        <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" className="text-[22px]" />
      </button>

      <header className="text-center">
        <h1 className="text-[clamp(44px,16.4vw,64px)] leading-19 font-bold tracking-[-1.4px] tabular-nums">
          {formattedAmount}
        </h1>
        <p className="mt-px text-[17px] leading-6.25 text-wallet-muted">{transaction.name}</p>
        <p className="text-[17px] leading-6.25 text-wallet-muted">
          {formatTransactionTimestamp(transaction.timestamp)}
        </p>
      </header>

      <section aria-label="Transaction details" className="mt-8.5 rounded-xl bg-white px-2">
        <div className="px-2 pt-3.25 pb-3">
          <h2 className="text-[17px] leading-6.25 font-semibold">
            Status: {transaction.pending ? 'Pending' : 'Approved'}
          </h2>
          <p className="text-[17px] leading-6.25 wrap-break-word text-wallet-muted">
            {transaction.paymentSource}
          </p>
        </div>
        <dl className="text-[16px] leading-5.5">
          <div className="flex justify-between gap-4 border-t border-wallet-divider px-2 py-2.75 text-[17px] font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">{formattedAmount}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-wallet-divider px-2 py-2.75">
            <dt>Merchant</dt>
            <dd className="min-w-0 text-right wrap-break-word text-wallet-muted">
              {transaction.name}
            </dd>
          </div>
          {details.map((detail) => (
            <div
              key={detail.label}
              className="flex justify-between gap-4 border-t border-wallet-divider px-2 py-2.75"
            >
              <dt className="shrink-0">{detail.label}</dt>
              <dd className="min-w-0 text-right wrap-break-word text-wallet-muted">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
};
