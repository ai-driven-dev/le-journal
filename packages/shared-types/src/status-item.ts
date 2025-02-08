export interface StatusItem {
  id: string;
  label: string;
  count: number;
  type: 'draft' | 'scheduled' | 'sent';
}
