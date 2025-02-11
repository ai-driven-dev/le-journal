import { makeAutoObservable } from 'mobx';

export class AuthStore {
  isAuthenticated = false;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  checkAuthStatus = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/status', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        this.isAuthenticated = true;
        this.user = data.user;
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  logout = async (): Promise<void> => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      this.isAuthenticated = false;
      this.user = null;
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
}

export const authStore = new AuthStore();
