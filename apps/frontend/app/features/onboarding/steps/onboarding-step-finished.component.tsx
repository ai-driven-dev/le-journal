import { Link } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

import { buttonVariants } from '~/components/ui/button';

export const OnboardingStepFinished = observer(() => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Terminé !</h2>
      <p>Votre journal est maintenant configuré.</p>

      <p>Voici votre alias :</p>
      <pre>
        <code>
          <span className="text-sm text-gray-500">
            <span className="font-bold">email+lejournal@gmail.com</span>
          </span>
        </code>
      </pre>

      <p>Vous recevrez un mail de test dans quelques secondes...</p>

      <Link to="/dashboard" className={buttonVariants({ variant: 'default' })}>
        Accéder au tableau de bord
      </Link>
    </div>
  );
});
