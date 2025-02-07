import type { LinkDescriptor, LinksFunction, MetaFunction } from '@remix-run/node';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';

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

export function Layout({ children }: { children: React.ReactNode }): React.ReactNode {
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
}

export default function App(): React.ReactNode {
  return <Outlet />;
}

export function ErrorBoundary(): React.ReactNode {
  const error = useRouteError();

  let message;
  let details;

  if (isRouteErrorResponse(error)) {
    message = error.status;
    details = error.statusText;
  } else if (error instanceof Error) {
    message = 'Une erreur est survenue';
    details = error.message;
  } else {
    message = 'Une erreur est survenue';
    details = 'Une erreur inattendue est survenue.';
  }

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{message}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="pt-16 p-4 container mx-auto">
          <h1 className="text-2xl font-bold mb-4">{message}</h1>
          {details && <p className="mb-4">{details}</p>}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
