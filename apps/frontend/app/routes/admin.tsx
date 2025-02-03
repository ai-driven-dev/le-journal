import type { ApiUser } from '@le-journal/shared-types';
import { useLoaderData } from '@remix-run/react';

import { apiFetch } from '~/utils/api/fetcher';

type LoaderData = {
  users: ApiUser[];
};

export const loader = async (): Promise<LoaderData> => {
  const users = await apiFetch<ApiUser[]>({ endpoint: 'users' });

  return { users };
};

export default function AdminIndex(): React.ReactElement {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administration</h1>

      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.name || '-'}</td>
                      <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
