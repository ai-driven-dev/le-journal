import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { createRemixStub, generateMetaArgs, render, waitFor } from '../../test/test-utils';
import Root, { ErrorBoundary, links, meta } from '../root';

// Mock console.error and console.warn to suppress hydration and React Router warnings in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll((): void => {
  console.error = vi.fn();
  console.warn = vi.fn();
});

afterAll((): void => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');
  return {
    ...actual,
    Outlet: (): null => null,
    Meta: (): null => null,
    Links: (): null => null,
    Scripts: (): null => null,
    ScrollRestoration: (): null => null,
  };
});

describe('Root', () => {
  it('renders without crashing', (): void => {
    render(<Root />);
    expect(document.querySelector('meta[charset]')).toBeTruthy();
  });

  it('provides correct meta tags', (): void => {
    const result = meta(generateMetaArgs());
    expect(result).toEqual([
      { title: 'Le Journal' },
      { name: 'description', content: 'Votre journal personnel' },
    ]);
  });

  it('provides correct link tags', (): void => {
    const result = links();
    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ rel: 'stylesheet', href: expect.any(String) });
    expect(result[1]).toEqual({ rel: 'preconnect', href: 'https://fonts.googleapis.com' });
    expect(result[2]).toEqual({
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    });
    expect(result[3]).toEqual({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    });
  });

  describe('ErrorBoundary', () => {
    it('renders error message for route errors', async (): Promise<void> => {
      const RemixStub = createRemixStub([
        {
          id: 'root',
          path: '/',
          Component: Root,
          ErrorBoundary,
          loader(): Response {
            throw new Response(null, { status: 404, statusText: 'Not Found' });
          },
        },
      ]);

      const { getByRole } = render(<RemixStub />);
      await waitFor(() => {
        const heading = getByRole('heading', { level: 1 });
        expect(heading.textContent).toBe('404');
      });
    });

    it('renders generic error message for non-route errors', async (): Promise<void> => {
      const RemixStub = createRemixStub([
        {
          id: 'root',
          path: '/',
          Component: Root,
          ErrorBoundary,
          loader(): never {
            throw new Error('Test error');
          },
        },
      ]);

      const { getByRole } = render(<RemixStub />);
      await waitFor(() => {
        const heading = getByRole('heading', { level: 1 });
        expect(heading.textContent).toBe('Une erreur est survenue');
      });
    });
  });
});

describe('Root Route', () => {
  it('renders root layout correctly', (): void => {
    const { getByRole } = render(<Root />);
    expect(getByRole('navigation')).toBeInTheDocument();
  });

  it('provides correct meta tags', (): void => {
    const metaData = meta(generateMetaArgs());
    expect(metaData).toEqual([
      { title: 'Le Journal' },
      { name: 'description', content: 'Votre journal personnel' },
    ]);
  });
});
