import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatTransactionAmount, formatTransactionDate } from '../lib/wallet';
import { TransactionIcon } from './TransactionIcon';

import type { Transaction } from '../types';

interface TransactionRowProps {
  transaction: Transaction;
  today: Date;
  backgroundClass: string;
  onSelect: (transaction: Transaction) => void;
}

export const TransactionRow = ({
  transaction,
  today,
  backgroundClass,
  onSelect,
}: TransactionRowProps) => {
  const description = `${transaction.pending ? 'Pending – ' : ''}${transaction.description}`;
  const dateLabel = `${transaction.authorizedUser ? `${transaction.authorizedUser} – ` : ''}${formatTransactionDate(transaction.timestamp, today)}`;

  return (
    <li className="relative after:absolute after:right-0 after:bottom-0 after:left-3.5 after:h-px after:bg-wallet-divider last:after:hidden">
      <button
        id={`transaction-${transaction.identifier}`}
        type="button"
        aria-label={`View ${transaction.name} transaction, ${formatTransactionAmount(transaction.amountCents, transaction.type)}`}
        onClick={() => onSelect(transaction)}
        className="grid min-h-19 w-full grid-cols-[45px_minmax(0,1fr)_12px] items-center gap-x-3 px-3.5 py-1.75 text-left transition-colors hover:bg-black/2.5 active:bg-black/5 focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-wallet-blue max-[359px]:gap-x-2.25 max-[359px]:px-2.75"
      >
        <TransactionIcon iconKey={transaction.iconKey} backgroundClass={backgroundClass} />
        <span className="block min-w-0">
          <span className="flex items-baseline justify-between gap-1.5 text-[18px] leading-5.5 tracking-[-0.35px] max-[359px]:text-[16px]">
            <span className="truncate font-semibold">{transaction.name}</span>
            <span className="shrink-0 tabular-nums">
              {formatTransactionAmount(transaction.amountCents, transaction.type)}
            </span>
          </span>
          <span className="flex items-center justify-between gap-2 text-[15.5px] leading-5 text-wallet-muted max-[359px]:text-[14px]">
            <span className="truncate">{description}</span>
            {transaction.cashbackPercentage !== undefined && (
              <span className="shrink-0 rounded-sm bg-wallet-background px-1 text-[12px] leading-3.75 font-medium">
                {transaction.cashbackPercentage}%
              </span>
            )}
          </span>
          <span className="block truncate text-[15.5px] leading-5 text-wallet-muted max-[359px]:text-[14px]">
            {dateLabel}
          </span>
        </span>
        <FontAwesomeIcon
          icon={faChevronRight}
          aria-hidden="true"
          className="self-start pt-0.75 text-[16px] text-[#c7c7cc]"
        />
      </button>
    </li>
  );
};
