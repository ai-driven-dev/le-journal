import { createContext, useContext } from 'react';

import { GlobalStore } from './root.store';

import { AuthStore } from '~/features/auth/auth.store';

// Création d'une instance globale unique
const globalStore = new GlobalStore(new AuthStore());

// Création du contexte MobX
export const GlobalStoreContext = createContext<GlobalStore | null>(null);

// Hook pour récupérer le store
export const useGlobalStore = (): GlobalStore => {
  const store = useContext(GlobalStoreContext);
  if (!store) {
    throw new Error('useGlobalStore must be used within a GlobalStoreProvider');
  }
  return store;
};

export default globalStore;
