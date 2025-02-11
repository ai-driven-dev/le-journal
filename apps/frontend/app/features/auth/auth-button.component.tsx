import { observer } from 'mobx-react-lite';

import { useAuth } from './auth.context';

import { Button } from '~/components/ui/button';

export const GoogleSignIn = observer((): JSX.Element => {
  const auth = useAuth();

  return (
    <Button onClick={auth.login} className="w-full" variant="outline" disabled={auth.isLoading}>
      {auth.isLoading ? 'Connecting...' : 'Sign in with Google'}
    </Button>
  );
});
