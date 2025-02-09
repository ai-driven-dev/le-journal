import type { Email, Newsletter, Project, User } from '@le-journal/shared-types';
import type { LoaderFunction } from '@remix-run/node';

import { handleApiError } from '~/utils/api/error';
import { API_ROUTES, apiFetch } from '~/utils/api/fetcher';

export interface DashboardLoaderData {
  newsletters: Newsletter[];
  users: User[];
  projects: Project[];
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

  const requests = {
    newsletters: () => apiFetch<Newsletter[]>({ endpoint: API_ROUTES.newsletters }),
    users: () => apiFetch<User[]>({ endpoint: API_ROUTES.users }),
    projects: () =>
      apiFetch<Project[]>({
        endpoint: API_ROUTES.projects,
        searchParams: { projectNumber },
      }),
  };

  try {
    const [newsletters, users, projects] = await Promise.all([
      requests.newsletters(),
      requests.users(),
      requests.projects(),
    ]);

    const emails = await apiFetch<Email[]>({
      endpoint: API_ROUTES.newsletterEmails,
      searchParams: { projectId: projects[0].id },
    });

    return {
      newsletters,
      users,
      projects,
      emails,
    };
  } catch (error: unknown) {
    // Retry each request individually to identify which one failed
    for (const [name, request] of Object.entries(requests)) {
      try {
        await request();
      } catch (requestError) {
        const message = `Error fetching ${name}: ${(requestError as Error).message}`;
        handleApiError(requestError, message);
      }
    }

    // If we get here, it means the individual requests succeeded but the Promise.all failed
    handleApiError(error, "Une erreur inattendue s'est produite lors du chargement des données");
  }
};
