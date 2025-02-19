import { observer } from 'mobx-react-lite';

import { Button } from '~/components/ui/button';
import { getGoogleRedirectURI } from '~/lib/api-fetcher';

const ROUTE = getGoogleRedirectURI();

export const GoogleInSign = observer((): JSX.Element => {
  const onClick = (): void => {
    window.location.href = ROUTE;
  };

  return (
    <Button onClick={onClick} className="w-full" variant="outline">
      Se connecter avec Google
    </Button>
  );
});
