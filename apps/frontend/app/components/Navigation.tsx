import { Link } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

import { globalStore } from '@/stores/globalStore';

export const Navigation = observer(() => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between items-center">
          <Link to="/" className="font-bold text-xl">
            Le Journal
          </Link>

          <div className="flex gap-4">
            {globalStore.isAdmin && (
              <>
                <Link to="/dashboard" className="hover:text-gray-600">
                  Dashboard
                </Link>
                <Link to="/dashboard/settings" className="hover:text-gray-600">
                  Settings
                </Link>
              </>
            )}

            {globalStore.isAdmin && (
              <Link to="/admin" className="hover:text-gray-600">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});
