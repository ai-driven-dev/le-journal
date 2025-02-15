import { observer } from 'mobx-react-lite';

import { GoogleSignIn } from '~/features/auth/auth-button.component';

export const StepWelcome = observer(() => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Bienvenue !</h2>
      <p>Commençons la configuration de votre journal.</p>

      <div className="w-full max-w-sm">
        <GoogleSignIn />
      </div>
    </div>
  );
});
