import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers';
import { ChainId } from '../constants/chains';
import useEthers from '../hooks/useEthers';
import useLocalStorage from '../hooks/useLocalStorage';
import { useBlockNumber } from './BlockNumberProvider';
import { useNotificationsContext } from './NotificationsProvider';
import { useConfig } from './ConfigProvider';

export interface StoredTransaction {
  transaction: TransactionResponse;
  submittedAt: number;
  receipt?: TransactionReceipt;
  lastCheckedBlockNumber?: number;
  transactionName?: string;
}

export function getStoredTransactionState(transaction: StoredTransaction) {
  if (transaction.receipt) {
    return transaction?.receipt.status === 0 ? 'Fail' : 'Success';
  }
  return 'Mining';
}

export type StoredTransactions = {
  [T in ChainId]?: StoredTransaction[];
};

interface TransactionProviderProps {
  children: ReactNode;
}

const context = createContext<{
  transactions: StoredTransactions;
  addTransaction: (payload: StoredTransaction) => void;
}>({
  transactions: {},
  addTransaction: () => undefined,
});

export function TransactionProvider({ children }: TransactionProviderProps) {
  const { chainId, library } = useEthers();

  const blockNumber = useBlockNumber();
  const { localStorage } = useConfig();
  const { addNotification } = useNotificationsContext();

  const [storage, setStorage] = useLocalStorage(
    localStorage.transactionPath,
    {},
  );

  const [state, setState] = useState<StoredTransactions>(storage ?? {});

  useEffect(() => {
    setStorage(state);
  }, [state]);

  const addTransaction = useCallback(
    (payload: StoredTransaction) => {
      const { chainId }: { chainId: ChainId } = payload.transaction;
      setState((draft: StoredTransactions) => {
        return {
          ...draft,
          [chainId]: [payload, ...(draft[chainId] ?? [])],
        };
      });
      addNotification({
        notification: {
          type: 'transactionStarted',
          transaction: payload.transaction,
          submittedAt: payload.submittedAt,
          transactionName: payload.transactionName,
        },
        chainId: payload.transaction.chainId,
      });
    },
    [setState],
  );

  useEffect(() => {
    const updateTransactions = async () => {
      if (!chainId || !library || !blockNumber) {
        return;
      }

      const checkTransaction = async (tx: StoredTransaction) => {
        if (tx.receipt || !shouldCheck(blockNumber, tx)) {
          return tx;
        }

        try {
          const receipt = await library.getTransactionReceipt(
            tx.transaction.hash,
          );
          if (receipt) {
            const type =
              receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed';
            addNotification({
              notification: {
                type,
                submittedAt: Date.now(),
                transaction: tx.transaction,
                receipt,
                transactionName: tx.transactionName,
              },
              chainId,
            });

            return { ...tx, receipt };
          } else {
            return { ...tx, lastCheckedBlockNumber: blockNumber };
          }
        } catch (error) {
          console.error(
            `failed to check transaction hash: ${tx.transaction.hash}`,
            error,
          );
        }

        return tx;
      };

      const chainTransactions = state[chainId] ?? [];
      const newTransactions: StoredTransaction[] = [];
      for (const tx of chainTransactions) {
        const newTransaction = await checkTransaction(tx);
        newTransactions.push(newTransaction);
      }

      setState((draft: StoredTransactions) => {
        return {
          ...draft,
          [chainId]: [...newTransactions],
        };
      });
    };

    updateTransactions();
  }, [chainId, library, blockNumber]);

  return (
    <context.Provider value={{ transactions: state, addTransaction }}>
      {children}
    </context.Provider>
  );
}

export default TransactionProvider;

export const useTransactionsContext = () => useContext(context);

function shouldCheck(blockNumber: number, tx: StoredTransaction): boolean {
  if (tx.receipt) {
    return false;
  }

  if (!tx.lastCheckedBlockNumber) {
    return true;
  }

  const blocksSinceCheck = blockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) {
    return false;
  }

  const minutesPending = (Date.now() - tx.submittedAt) / 1000 / 60;
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9;
  }

  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2;
  }

  // otherwise every block
  return true;
}
