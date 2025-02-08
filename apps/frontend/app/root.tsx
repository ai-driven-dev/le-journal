import type { LinkDescriptor, LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

import { ErrorBoundary } from '~/components/error-boundary';

import './tailwind.css';

export const meta: MetaFunction = (): ReturnType<MetaFunction> => {
  return [{ title: 'Le Journal' }, { name: 'description', content: 'Votre journal personnel' }];
};

export const links: LinksFunction = (): LinkDescriptor[] => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export const Layout = observer(function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
});

const App = observer(function App(): React.ReactNode {
  return <Outlet />;
});

export default App;

export { ErrorBoundary };
