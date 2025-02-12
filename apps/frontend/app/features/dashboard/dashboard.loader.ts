import type { Email, Newsletter, ProjectType, User } from '@le-journal/shared-types';
import type { LoaderFunction } from '@remix-run/node';

import { handleApiError } from '~/lib/api-error';
import { API_ROUTES_GET } from '~/lib/api-fetcher';
import { serverFetch } from '~/lib/api-fetcher.server';

export interface DashboardLoaderData {
  newsletters: Newsletter[];
  users: User[];
  projects: ProjectType[];
  emails: Email[];
}

export const loader: LoaderFunction = async ({ params }): Promise<DashboardLoaderData> => {
  const projectNumber = params.projectNumber;

  if (!projectNumber) {
    return {
      newsletters: [],
      users: [],
      projects: [],
      emails: [],
    };
  }

  const requests: {
    newsletters: () => Promise<Newsletter[]>;
    users: () => Promise<User[]>;
    projects: () => Promise<ProjectType[]>;
    emails?: () => Promise<Email[]>;
  } = {
    newsletters: () => serverFetch<Newsletter[]>({ endpoint: API_ROUTES_GET.newsletters }),
    users: () => serverFetch<User[]>({ endpoint: API_ROUTES_GET.users }),
    projects: () =>
      serverFetch<ProjectType[]>({
        endpoint: API_ROUTES_GET.projects,
        searchParams: { projectNumber },
      }),
  };

  try {
    const [newsletters, users, projects] = await Promise.all([
      requests.newsletters(),
      requests.users(),
      requests.projects(),
    ]);

    requests.emails = () =>
      serverFetch<Email[]>({
        endpoint: API_ROUTES_GET.newsletterEmails,
        searchParams: { projectId: projects[0].id },
      });

    const emails = await requests.emails();

    return {
      newsletters,
      users,
      projects,
      emails,
    };
  } catch (error: unknown) {
    handleApiError(error, "Une erreur inattendue s'est produite lors du chargement des données");
  }
};
