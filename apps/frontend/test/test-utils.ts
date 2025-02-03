import { render as rtlRender } from '@testing-library/react';
import { createRemixStub as remixCreateRemixStub } from '@remix-run/testing';
import { waitFor } from '@testing-library/react';
import type { MetaFunction } from '@remix-run/node';
import type { RenderResult } from '@testing-library/react';

export const createRemixStub = remixCreateRemixStub;
export { waitFor };

export function render(ui: React.ReactElement): RenderResult {
  return rtlRender(ui);
}

export function generateMetaArgs(): Parameters<MetaFunction>[0] {
  return {
    data: undefined,
    matches: [],
    location: {
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: '',
    },
    params: {},
  };
}
