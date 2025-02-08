import { observer } from 'mobx-react-lite';
import { type PropsWithChildren, type ReactNode } from 'react';

export const Layout = observer(function Layout({ children }: PropsWithChildren): ReactNode {
  return <div className="min-h-screen">{children}</div>;
});
