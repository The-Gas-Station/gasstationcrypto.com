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
} from '@ethersproject/abstract-provider';
import { ChainId } from '../constants/chains';
import useEthers from '../hooks/useEthers';
import { nanoid } from 'nanoid';

type NotificationPayload = { submittedAt: number } & (
  | {
      type: 'transactionStarted';
      transaction: TransactionResponse;
      transactionName?: string;
    }
  | {
      type: 'transactionSucceed';
      transaction: TransactionResponse;
      receipt: TransactionReceipt;
      transactionName?: string;
    }
  | {
      type: 'transactionFailed';
      transaction: TransactionResponse;
      receipt: TransactionReceipt;
      transactionName?: string;
    }
  | { type: 'walletConnected'; address: string }
);

export type Notification = { id: string } & NotificationPayload;

export type AddNotificationPayload = {
  chainId: ChainId;
  notification: NotificationPayload;
};

export type RemoveNotificationPayload = {
  chainId: ChainId;
  notificationId: string;
};

export type Notifications = {
  [T in ChainId]?: Notification[];
};

interface NotificationsProviderProps {
  children: ReactNode;
}

export const context = createContext<{
  notifications: Notifications;
  addNotification: (payload: AddNotificationPayload) => void;
  removeNotification: (payload: RemoveNotificationPayload) => void;
}>({
  notifications: {},
  addNotification: () => undefined,
  removeNotification: () => undefined,
});

export function NotificationsProvider({
  children,
}: NotificationsProviderProps) {
  const { chainId, account } = useEthers();

  const [state, setState] = useState<Notifications>({});

  useEffect(() => {
    if (account && chainId) {
      setState((draft: Notifications) => {
        return {
          ...draft,
          [chainId]: [
            {
              type: 'walletConnected',
              id: nanoid(),
              submittedAt: Date.now(),
              address: account,
            },
            ...(draft[chainId] ?? []),
          ],
        };
      });
    }
  }, [account, chainId]);

  const addNotification = useCallback(
    ({ notification, chainId }: AddNotificationPayload) => {
      setState((draft: Notifications) => {
        return {
          ...draft,
          [chainId]: [
            { ...notification, id: nanoid() },
            ...(draft[chainId] ?? []),
          ],
        };
      });
    },
    [setState],
  );

  const removeNotification = useCallback(
    ({ notificationId, chainId }: RemoveNotificationPayload) => {
      setState((draft: Notifications) => {
        return {
          ...draft,
          [chainId]: (draft[chainId] ?? []).filter(
            (notification) => notification.id !== notificationId,
          ),
        };
      });
    },
    [setState],
  );

  return (
    <context.Provider
      value={{ addNotification, notifications: state, removeNotification }}
    >
      {children}
    </context.Provider>
  );
}

export default NotificationsProvider;

export const useNotificationsContext = () => useContext(context);
