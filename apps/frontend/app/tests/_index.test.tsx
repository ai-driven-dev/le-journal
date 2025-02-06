import { createRemixStub } from '@remix-run/testing';
import { describe, expect, it } from 'vitest';

import { generateMetaArgs, render } from '../../test/test-utils';
import Index, { meta } from '../routes/_index';

describe('Index Route', () => {
  it('renders index page correctly', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: Index,
      },
    ]);

    const { getByText } = render(<RemixStub />);

    expect(getByText(/Le Journal : Votre veille techno automatique/)).toBeInTheDocument();
    expect(
      getByText(/Gagnez 3h \/ semaine en laissant l'IA vous trier vos newsletters/),
    ).toBeInTheDocument();
  });

  it('provides correct meta tags', () => {
    const metaData = meta(generateMetaArgs());
    expect(metaData).toHaveLength(2);
    expect(metaData[0]).toEqual({ title: 'Le Journal - Accueil' });
    expect(metaData[1]).toEqual({
      name: 'description',
      content: 'Votre veille techno automatique',
    });
  });
});
