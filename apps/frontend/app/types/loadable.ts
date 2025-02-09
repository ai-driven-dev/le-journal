export interface Loadable {
  isLoading: boolean;
  error: string | null;
}

export interface LoadableState<T> extends Loadable {
  data: T | null;
}

export const initialLoadableState = {
  isLoading: false,
  error: null,
  data: null,
};
