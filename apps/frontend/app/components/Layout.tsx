import { type PropsWithChildren, type ReactNode } from 'react';

import { Navigation } from './Navigation';

export function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
