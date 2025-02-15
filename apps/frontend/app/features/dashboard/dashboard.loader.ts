import type { Email, Newsletter, User } from '@le-journal/shared-types';
import { Project } from '@le-journal/shared-types';
import { redirect, type LoaderFunction } from '@remix-run/node';
import { plainToInstance } from 'class-transformer';

import { API_ROUTES_GET } from '~/lib/api-fetcher';
import { serverFetch } from '~/lib/api-fetcher.server';
import { verify } from '~/lib/validator';

export interface DashboardLoaderData {
  newsletters: Newsletter[];
  users: User[];
  projects: Project[];
  emails: Email[];
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<DashboardLoaderData | Response> => {
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
    newsletters: () =>
      serverFetch<Newsletter[]>({
        endpoint: API_ROUTES_GET.newsletters,
        headers: request.headers,
      }),
    users: () =>
      serverFetch<User[]>({
        endpoint: API_ROUTES_GET.users,
        headers: request.headers,
      }),
    projects: () =>
      serverFetch<Project[]>({
        endpoint: API_ROUTES_GET.projects,
        searchParams: { projectNumber },
        headers: request.headers,
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
        headers: request.headers,
      });

    const emails = await requests.emails();

    const project = projects[0];

    verify(project);

    const r = {
      newsletters,
      users,
      projects: [plainToInstance(Project, project)],
      emails,
    };

    return r;
  } catch (error: unknown) {
    console.error(error);
    return redirect('/login');
  }
};
