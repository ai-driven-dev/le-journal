import { makeAutoObservable } from 'mobx';

import type { DashboardStore } from '../../global/dashboard.store';

import type { INewsletter, INewsletterTableState } from './newsletter-table.type';

const MOCK_NEWSLETTERS: INewsletter[] = [
  {
    id: 1,
    title: 'Newsletter 1',
    date: '2024-02-15',
    subject: 'Subject 1',
    status: 'completed',
    articles: [
      {
        subject: 'Article 1',
        description: 'Description 1',
        score: 85,
        link: 'https://www.example.com/article1',
      },
      {
        subject: 'Article 2',
        description: 'Description 2',
        score: 92,
        link: 'https://www.example.com/article2',
      },
    ],
  },
  {
    id: 2,
    title: 'Newsletter 2',
    date: '2024-02-12',
    subject: 'Subject 2',
    status: 'processing',
    articles: [
      {
        subject: 'Article 3',
        description: 'Description 3',
        score: 78,
        link: null,
      },
    ],
  },
  {
    id: 3,
    title: 'Newsletter 3',
    date: '2024-02-08',
    subject: 'Subject 3',
    status: 'failed',
    articles: [
      {
        subject: 'Article 4',
        description: 'Description 4',
        score: 65,
        link: 'https://www.example.com/article4',
      },
    ],
  },
];

export class NewsletterTableStore implements INewsletterTableState {
  newsletters = MOCK_NEWSLETTERS;
  selectedNewsletterId: string | null = null;
  isDrawerOpen = false;

  constructor(private readonly dashboardStore: DashboardStore) {
    makeAutoObservable(this);
  }

  setSelectedNewsletterId = (id: string | null) => {
    this.selectedNewsletterId = id;
  };

  setIsDrawerOpen = (isOpen: boolean) => {
    this.isDrawerOpen = isOpen;
  };

  handleOpenDrawer = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.setIsDrawerOpen(true);
  };
}
