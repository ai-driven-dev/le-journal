export type NewsletterStatusType = 'validated' | 'pending' | 'blocked';

export interface NewsletterWithStatus {
  id: string;
  email: string;
  status: {
    type: NewsletterStatusType;
    icon: 'Check' | 'Clock' | 'X';
    colorClass: string;
  };
}

export interface NewsletterSubscriptionsState {
  newsletters: NewsletterWithStatus[];
}

export interface NewsletterSubscriptionsActions {
  setIsHoverCardOpen: (isOpen: boolean) => void;
}
