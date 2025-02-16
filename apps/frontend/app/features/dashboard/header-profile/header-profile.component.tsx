import { Search, User } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import { useGlobalStore } from '~/stores/root.provider';

export const HeaderProfile: FC = observer(() => {
  const { dashboardStore } = useGlobalStore();
  const store = dashboardStore.headerProfileStore;

  if (store.isLoading) {
    return <div>Chargement...</div>;
  }

  if (store.state === null || store.state === undefined) {
    return <div>Erreur</div>;
  }

  const { avatar, name } = store.state;

  return (
    <header>
      <div className="w-full flex items-center h-16 px-4">
        <div className="flex items-center flex-1">
          <Search className="text-gray-400 mr-2" />
          <Input placeholder="Search..." className="max-w-xs" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="text-sm font-medium">{name}</span>

              {avatar !== undefined ? (
                <img src={avatar} alt="Avatar" className="h-5 w-5 rounded-full" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Add a plan</DropdownMenuItem>
            <Dialog open={store.isLogoutDialogOpen} onOpenChange={store.setIsLogoutDialogOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Logout</DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to logout?</DialogTitle>
                  <DialogDescription>You will be redirected to the login page.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => store.setIsLogoutDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={store.handleLogout}>Logout</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenuItem className="text-red-600">Delete account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
});
