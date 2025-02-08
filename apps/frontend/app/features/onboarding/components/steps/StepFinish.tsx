import { Link } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

import { buttonVariants } from '~/components/ui/button';

export const StepFinish = observer(() => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Terminé !</h2>
      <p>Votre journal est maintenant configuré.</p>

      <Link to="/dashboard" className={buttonVariants({ variant: 'default' })}>
        Accéder au tableau de bord
      </Link>
    </div>
  );
});
