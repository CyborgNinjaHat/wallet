import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  calculateDailyPoints,
  formatCurrency,
  formatPoints,
  getAvailableCredit,
  getPreviousMonth,
  getSeasonDay,
} from '../lib/wallet';

interface WalletSummaryProps {
  balanceCents: number;
  cardLimitCents: number;
  today: Date;
}

export const WalletSummary = ({ balanceCents, cardLimitCents, today }: WalletSummaryProps) => (
  <section aria-label="Card overview" className="grid grid-cols-2 grid-rows-[86px_81px] gap-2">
    <section aria-labelledby="balance-label" className="min-w-0 rounded-xl bg-white px-3 py-2.25">
      <h2 id="balance-label" className="text-[16px] leading-5">
        Card Balance
      </h2>
      <p className="text-[clamp(24px,7.4vw,29px)] leading-8.5 font-bold tracking-[-0.8px] tabular-nums">
        {formatCurrency(balanceCents)}
      </p>
      <p className="text-[clamp(12px,3.85vw,15px)] leading-4.75 tracking-[-0.2px] text-wallet-muted">
        <span>{formatCurrency(getAvailableCredit(cardLimitCents, balanceCents))}</span> Available
      </p>
    </section>

    <section
      aria-labelledby="payment-label"
      className="relative row-span-2 min-w-0 rounded-xl bg-white px-3 py-2.25"
    >
      <h2 id="payment-label" className="text-[16px] leading-5">
        No Payment Due
      </h2>
      <p className="text-[16px] leading-4.75 text-wallet-muted">
        You've paid your {getPreviousMonth(today)} balance.
      </p>
      <span
        aria-hidden="true"
        className="absolute right-3 bottom-2.75 flex size-16 items-center justify-center rounded-full bg-[#eeeef0] ring-1 ring-inset ring-black/5"
      >
        <FontAwesomeIcon icon={faCheck} className="-rotate-12 text-[32px]" />
      </span>
    </section>

    <section
      aria-labelledby="points-label"
      className="flex min-w-0 flex-col justify-center rounded-xl bg-white px-3"
    >
      <h2 id="points-label" className="text-[16px] leading-5 font-medium">
        Daily Points
      </h2>
      <p className="text-[16px] leading-5 text-wallet-muted">
        {formatPoints(calculateDailyPoints(getSeasonDay(today)))}
      </p>
    </section>
  </section>
);
