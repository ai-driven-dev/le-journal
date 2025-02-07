import { type PropsWithChildren, type ReactNode } from 'react';

export function Layout({ children }: PropsWithChildren): ReactNode {
  return <div className="min-h-screen">{children}</div>;
}
