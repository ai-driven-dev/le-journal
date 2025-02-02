import type { ApiUser } from '@le-journal/shared-types';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

type LoaderData = {
  users: ApiUser[];
};

export async function loader(): Promise<LoaderData> {
  try {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      throw new Error('API_URL environment variable is not set');
    }

    const response = await fetch(`${apiUrl}/users`);

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const users: ApiUser[] = await response.json();
    return { users };
  } catch (error) {
    console.error('Error in admin loader:', error);
    throw json(
      { message: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 },
    );
  }
}

export default function AdminIndex() {
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
