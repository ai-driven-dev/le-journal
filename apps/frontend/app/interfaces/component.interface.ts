export interface Statable<T> {
  state: T | null;
}

export interface Actionable<T> {
  init: (state: T) => void;
}
