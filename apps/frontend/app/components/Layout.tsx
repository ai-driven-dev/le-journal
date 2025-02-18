import { observer } from 'mobx-react-lite';
import { type PropsWithChildren, type ReactNode } from 'react';

import { Toaster as SonnerToaster } from '~/components/ui/sonner';
import { Toaster } from '~/components/ui/toaster';

export const Layout = observer(function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <div>
      {children}
      <SonnerToaster />
      <Toaster />
    </div>
  );
});
