import { makeAutoObservable } from 'mobx';

class GlobalStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAdmin = true;
  isAuthenticated = false;
}

export const globalStore = new GlobalStore();
