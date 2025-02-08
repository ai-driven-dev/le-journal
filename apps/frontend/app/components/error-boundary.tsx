import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import { observer } from 'mobx-react-lite';

export const ErrorBoundary = observer(function ErrorBoundary(): React.ReactNode {
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
});
