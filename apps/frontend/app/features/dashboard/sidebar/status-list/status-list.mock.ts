import type { StatusItem } from '@le-journal/shared-types';

import type { StatusListState } from './status-list.type';

export const mockStatusItems: StatusItem[] = [
  {
    id: 'draft',
    label: 'Brouillons',
    count: 2,
    type: 'draft',
  },
  {
    id: 'scheduled',
    label: 'Programmées',
    count: 1,
    type: 'scheduled',
  },
  {
    id: 'sent',
    label: 'Envoyées',
    count: 2,
    type: 'sent',
  },
];

export const mockStatusListState: StatusListState = {
  userAlias: 'alex.soyes',
  isHoverCardOpen: false,
  items: mockStatusItems,
};
