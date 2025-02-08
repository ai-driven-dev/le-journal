import type { Newsletter } from '@le-journal/shared-types';

export const mockNewsletters: Newsletter[] = [
  {
    id: 1,
    title: 'Nouveautés JavaScript 2024',
    date: '2024-02-01',
    subject: 'Les dernières fonctionnalités de JavaScript',
    status: 'completed',
    articles: [
      {
        subject: 'Decorators en JavaScript',
        description: 'Les decorators sont maintenant disponibles en JavaScript',
        score: 0.95,
        link: 'https://example.com/js-decorators',
      },
      {
        subject: 'Pattern Matching',
        description: 'Le pattern matching arrive bientôt en JavaScript',
        score: 0.88,
        link: 'https://example.com/pattern-matching',
      },
    ],
  },
  {
    id: 2,
    title: 'Les meilleures pratiques React',
    date: '2024-02-15',
    subject: 'Guide des bonnes pratiques React',
    status: 'processing',
    articles: [
      {
        subject: 'React Server Components',
        description: 'Comment utiliser les RSC efficacement',
        score: 0.92,
        link: 'https://example.com/rsc',
      },
    ],
  },
  {
    id: 3,
    title: 'Introduction à TypeScript',
    date: '2024-02-10',
    subject: 'Débuter avec TypeScript',
    status: 'failed',
    articles: [],
  },
  {
    id: 4,
    title: 'Guide Docker pour débutants',
    date: '2024-01-25',
    subject: 'Les bases de Docker',
    status: 'completed',
    articles: [
      {
        subject: 'Les bases des conteneurs',
        description: 'Comprendre les conteneurs Docker',
        score: 0.85,
        link: 'https://example.com/docker-basics',
      },
    ],
  },
  {
    id: 5,
    title: 'Astuces Git avancées',
    date: '2024-02-20',
    subject: 'Maîtriser Git',
    status: 'processing',
    articles: [
      {
        subject: 'Git Rebase',
        description: 'Comment utiliser git rebase efficacement',
        score: 0.9,
        link: 'https://example.com/git-rebase',
      },
    ],
  },
];
