import { observer } from 'mobx-react-lite';

import { useAuth } from './auth.context';

import { Button } from '~/components/ui/button';

type AuthButtonProps = {
  type: 'login' | 'register';
};

export const GoogleInSign = observer(({ type }: AuthButtonProps): JSX.Element => {
  const auth = useAuth();

  const text = type === 'login' ? 'Se connecter avec Google' : "S'inscrire avec Google";
  const onClick = type === 'login' ? auth.login : auth.register;

  return (
    <Button onClick={onClick} className="w-full" variant="outline" disabled={auth.isLoading}>
      {auth.isLoading ? 'Connecting...' : text}
    </Button>
  );
});
