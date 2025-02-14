import { observer } from 'mobx-react-lite';

import { GoogleSignIn } from '~/features/auth/auth-button.component';

export const StepPermissions = observer(() => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Permissions</h2>
      <p>Configuration des permissions nécessaires.</p>
      <p>On va récupérer l'accès à notre compte Google pour y créer les labels.</p>
      <p>
        Une fois que ce sera fait on se connectera en Read-only pour uniquement lire les emails du
        label.
      </p>
      <div className="w-full max-w-sm">
        <GoogleSignIn />
      </div>
    </div>
  );
});
