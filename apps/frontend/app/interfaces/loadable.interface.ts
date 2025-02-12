export interface Loadable<T> {
  isLoading: boolean;
  isSubmitting: boolean;
  state: T | null;
}
