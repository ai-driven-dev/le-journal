import * as remix from '@remix-run/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { generateMetaArgs, render, renderWithRemixStub } from '../test/test-utils';
import Root, { ErrorBoundary, links, meta } from './root';

// Mock console.error and console.warn to suppress hydration and React Router warnings in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    if (args[0]?.includes('Warning: ')) return;
    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    if (args[0]?.includes('React Router Future Flag Warning:')) return;
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual<typeof import('@remix-run/react')>('@remix-run/react');
  return {
    ...actual,
    Outlet: () => null,
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn(),
    Meta: () => null,
    Links: () => null,
    Scripts: () => null,
    ScrollRestoration: () => null,
  };
});

describe('Root', () => {
  it('renders without crashing', () => {
    render(<Root />);
    expect(document.querySelector('meta[charset]')).toBeInTheDocument();
  });

  it('provides correct meta tags', () => {
    const result = meta(generateMetaArgs());
    expect(result).toEqual([
      { title: 'Le Journal' },
      { name: 'description', content: 'Le Journal - Votre journal personnel' },
    ]);
  });

  it('provides correct link tags', () => {
    const result = links();
    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ rel: 'stylesheet', href: expect.any(String) });
    expect(result[1]).toEqual({ rel: 'preconnect', href: 'https://fonts.googleapis.com' });
  });

  describe('ErrorBoundary', () => {
    it('renders with error message', () => {
      const error = new Error('Test error message');
      vi.mocked(remix.useRouteError).mockReturnValue(error);
      vi.mocked(remix.isRouteErrorResponse).mockReturnValue(false);
      const { getByRole, getByText } = renderWithRemixStub(ErrorBoundary);

      expect(getByRole('heading')).toHaveTextContent('Oops!');
      expect(getByText('Test error message')).toBeInTheDocument();
    });

    it('renders with no error message', () => {
      const error = {};
      vi.mocked(remix.useRouteError).mockReturnValue(error);
      vi.mocked(remix.isRouteErrorResponse).mockReturnValue(false);
      const { getByRole, getByText } = renderWithRemixStub(ErrorBoundary);

      expect(getByRole('heading')).toHaveTextContent('Oops!');
      expect(getByText('An unexpected error occurred.')).toBeInTheDocument();
    });
  });
});
