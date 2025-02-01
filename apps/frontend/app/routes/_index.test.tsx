import { describe, expect, it } from 'vitest';
import { generateMetaArgs, render } from '../../test/test-utils';
import Index, { meta } from './_index';

describe('Index Route', () => {
  it('renders index page correctly', () => {
    const { getByText } = render(<Index />);

    expect(getByText('Bienvenue sur Le Journal')).toBeInTheDocument();
    expect(
      getByText('Votre espace personnel pour écrire et organiser vos pensées.'),
    ).toBeInTheDocument();
  });

  it('provides correct meta tags', () => {
    const metaData = meta(generateMetaArgs());
    expect(metaData).toHaveLength(2);
    expect(metaData[0]).toEqual({ title: 'Le Journal - Accueil' });
    expect(metaData[1]).toEqual({
      name: 'description',
      content: 'Bienvenue sur Le Journal - Votre journal personnel',
    });
  });
});
