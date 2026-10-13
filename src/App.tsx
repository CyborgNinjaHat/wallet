import { useLayoutEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useMatch, useNavigate } from 'react-router';
import walletFixture from './data/wallet.json';
import { useCurrentDate } from './hooks/useCurrentDate';
import { generateCardBalance } from './lib/wallet';
import { TransactionDetail } from './screens/TransactionDetail';
import { TransactionsList } from './screens/TransactionsList';

import type { Transaction, WalletData } from './types';

const walletData = walletFixture as WalletData;
const darkBackgrounds = ['bg-[#243746]', 'bg-[#3b3532]', 'bg-[#354039]', 'bg-[#44364c]'];

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const transactionMatch = useMatch('/transactions/:transactionIdentifier');
  const selectedTransaction = walletData.transactions.find(
    (transaction) => transaction.identifier === transactionMatch?.params.transactionIdentifier,
  );
  const [balanceCents] = useState(() => generateCardBalance(walletData.cardLimitCents));
  const today = useCurrentDate();
  const [iconBackgrounds] = useState(() =>
    Object.fromEntries(
      walletData.transactions.map((transaction) => [
        transaction.identifier,
        darkBackgrounds[Math.floor(Math.random() * darkBackgrounds.length)],
      ]),
    ),
  );
  const listScrollPosition = useRef(0);
  const lastSelectedIdentifier = useRef<string | null>(null);

  const selectTransaction = (transaction: Transaction) => {
    listScrollPosition.current = window.scrollY;
    lastSelectedIdentifier.current = transaction.identifier;
    navigate(`/transactions/${transaction.identifier}`, { state: { fromTransactionsList: true } });
  };

  const returnToTransactions = () => {
    if (location.state?.fromTransactionsList) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, selectedTransaction ? 0 : listScrollPosition.current);
    if (selectedTransaction) {
      document
        .querySelector<HTMLButtonElement>('[aria-label="Back to transactions"]')
        ?.focus({ preventScroll: true });
    } else if (lastSelectedIdentifier.current) {
      document
        .getElementById(`transaction-${lastSelectedIdentifier.current}`)
        ?.focus({ preventScroll: true });
    }
  }, [location.pathname, selectedTransaction]);

  useLayoutEffect(() => {
    if (location.pathname !== '/') return;

    const saveListScrollPosition = () => {
      listScrollPosition.current = window.scrollY;
    };

    window.addEventListener('scroll', saveListScrollPosition);
    return () => window.removeEventListener('scroll', saveListScrollPosition);
  }, [location.pathname]);

  return (
    <div className="relative mx-auto min-h-svh max-w-107.5 bg-wallet-background text-black">
      <Routes>
        <Route
          path="/"
          element={
            <TransactionsList
              transactions={walletData.transactions}
              balanceCents={balanceCents}
              cardLimitCents={walletData.cardLimitCents}
              today={today}
              iconBackgrounds={iconBackgrounds}
              onSelect={selectTransaction}
            />
          }
        />
        <Route
          path="/transactions/:transactionIdentifier"
          element={
            selectedTransaction ? (
              <TransactionDetail transaction={selectedTransaction} onBack={returnToTransactions} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
