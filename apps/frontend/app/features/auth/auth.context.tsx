import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

import { AuthStore } from './auth.store';

const AuthContext = createContext<AuthStore | null>(null);

export const AuthProvider = observer(({ children }: PropsWithChildren): JSX.Element => {
  const store = useMemo(() => new AuthStore(), []);

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
});

export const useAuth = (): AuthStore => {
  const store = useContext(AuthContext);

  if (store === null) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return store;
};
