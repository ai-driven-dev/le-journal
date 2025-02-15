import { observer } from 'mobx-react-lite';

import { GoogleInSign } from '~/features/auth/auth-button.component';

export const OnboardingStepWelcome = observer(() => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Bienvenue !</h2>
      <p>Commençons la configuration de votre journal.</p>

      <GoogleInSign type="register" />
    </div>
  );
});
