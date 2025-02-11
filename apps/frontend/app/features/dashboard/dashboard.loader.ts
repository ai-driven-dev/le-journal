import type { Email, Newsletter, Project, User } from '@le-journal/shared-types';
import type { LoaderFunction } from '@remix-run/node';

import { handleApiError } from '~/utils/api/error';
import { API_ROUTES_GET, apiFetch } from '~/utils/api/fetcher';
import { assert } from '~/utils/assertions';

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

  const requests: {
    newsletters: () => Promise<Newsletter[]>;
    users: () => Promise<User[]>;
    projects: () => Promise<Project[]>;
    emails?: () => Promise<Email[]>;
  } = {
    newsletters: () => apiFetch<Newsletter[]>({ endpoint: API_ROUTES_GET.newsletters }),
    users: () => apiFetch<User[]>({ endpoint: API_ROUTES_GET.users }),
    projects: () =>
      apiFetch<Project[]>({
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

    assert.notEmpty(users, "Aucun utilisateur n'a été trouvé");
    assert.notEmpty(projects, `Aucun projet n'a été trouvé avec ce numéro ${projectNumber}`);

    requests.emails = () =>
      apiFetch<Email[]>({
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
