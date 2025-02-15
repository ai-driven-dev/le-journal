import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useGlobalStore } from '~/stores/root.provider';

type AuthComponentProps = {
  children: React.ReactNode;
};

export const AuthComponent = observer(({ children }: AuthComponentProps) => {
  const globalStore = useGlobalStore();
  const { authStore } = globalStore;

  useEffect(() => {
    console.log('[Auth] Check access token');
    if (authStore.accessToken === null) {
      authStore.refreshAccessToken();
    }
  }, [authStore]);

  if (authStore.isLoading) {
    return <div>Chargement...</div>;
  }

  if (authStore.accessToken === null) {
    return <div>Vous devez être connecté pour accéder à cette page.</div>;
  }

  return <>{children}</>;
});
