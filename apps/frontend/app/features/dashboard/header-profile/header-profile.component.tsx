import { Search, User } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { useDashboardStores } from '../dashboard.context';

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

export const Title: FC = observer(() => {
  const { dashboardStore } = useDashboardStores();
  const store = dashboardStore.headerProfileStore;

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input className="pl-8" placeholder="Search..." />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
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
      </div>
    </header>
  );
});
