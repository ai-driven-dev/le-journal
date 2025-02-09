import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export const loader: LoaderFunction = async ({ params }) => {
  const projectNumber = params.projectNumber;

  if (!projectNumber) {
    return redirect('/dashboard/1');
  }

  return null;
};
