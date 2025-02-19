import { Links, Meta, Scripts, ScrollRestoration, useRouteError } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

export const ErrorBoundary = observer(function ErrorBoundary(): React.ReactNode {
  const error = useRouteError();

  let message;
  let details;

  if (error instanceof Error) {
    message = error.message;
    details = error.stack;
  } else {
    message = 'Une erreur est survenue';
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
          {details && (
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg overflow-auto">
              {details}
            </pre>
          )}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
});
