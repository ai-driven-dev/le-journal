export interface IArticle {
  subject: string;
  description: string;
  score: number;
  link: string | null;
}

export interface INewsletter {
  id: number;
  title: string;
  date: string;
  subject: string;
  status: 'completed' | 'processing' | 'failed';
  articles: IArticle[];
}

export interface INewsletterTableState {
  newsletters: INewsletter[];
  selectedNewsletterId: string | null;
  isDrawerOpen: boolean;
}

export interface INewsletterTableActions {
  setSelectedNewsletterId: (id: string | null) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
  handleOpenDrawer: (e: React.MouseEvent) => void;
}
