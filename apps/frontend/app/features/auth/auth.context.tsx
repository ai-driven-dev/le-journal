import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import type { AuthStore } from './auth.store';

import { useGlobalStore } from '~/stores/root.provider';

const AuthContext = createContext<AuthStore | null>(null);

export const AuthProvider = observer(({ children }: PropsWithChildren): JSX.Element => {
  const { authStore } = useGlobalStore();

  return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>;
});

export const useAuth = (): AuthStore => {
  const store = useContext(AuthContext);

  if (store === null) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return store;
};
