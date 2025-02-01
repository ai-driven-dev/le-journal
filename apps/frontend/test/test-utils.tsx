import { createRemixStub } from '@remix-run/testing';
import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

// Configure future flags for React Router
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

type CustomRenderOptions = Partial<{
  routes: Parameters<typeof createRemixStub>[0];
  initialEntries: string[];
}> &
  Omit<RenderOptions, 'wrapper'>;

export function generateMetaArgs() {
  return {
    location: {
      pathname: '/',
      search: '',
      hash: '',
      state: undefined,
      key: '',
    },
    data: undefined,
    matches: [],
    params: {},
  };
}

export function render(
  ui: ReactElement,
  { routes = [], initialEntries = ['/'], ...options }: CustomRenderOptions = {},
) {
  const RemixStub = createRemixStub(
    [
      {
        path: '/',
        Component: () => ui,
      },
      ...routes,
    ],
    {
      initialEntries,
      ...routerConfig,
    },
  );

  return {
    ...rtlRender(<RemixStub />, options),
    RemixStub,
  };
}

export function renderWithRemixStub(Component: React.ComponentType) {
  const RemixStub = createRemixStub(
    [
      {
        path: '/',
        Component,
      },
    ],
    routerConfig,
  );

  return rtlRender(<RemixStub />);
}

export * from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';

