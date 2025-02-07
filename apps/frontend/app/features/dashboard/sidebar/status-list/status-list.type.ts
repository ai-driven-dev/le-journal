export interface IStatusListState {
  userAlias: string;
  isHoverCardOpen: boolean;
}

export interface IStatusListActions {
  copyToClipboard: () => Promise<void>;
  setIsHoverCardOpen: (isOpen: boolean) => void;
}
