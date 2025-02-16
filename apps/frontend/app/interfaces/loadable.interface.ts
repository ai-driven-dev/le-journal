export interface Loadable<T> {
  isLoading: boolean;
  state: T | null;

  load: (data: T) => void;
}
