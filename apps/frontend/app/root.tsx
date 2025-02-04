import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';

import stylesheet from './app.css?url';

export const meta: MetaFunction = (): ReturnType<MetaFunction> => {
  return [{ title: 'Le Journal' }, { name: 'description', content: 'Votre journal personnel' }];
};

export const links: LinksFunction = (): ReturnType<LinksFunction> => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export default function App(): React.ReactNode {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav role="navigation">
          <a href="/">Le Journal</a>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
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
