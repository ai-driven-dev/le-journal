import { observer } from 'mobx-react-lite';


import { Button } from '~/components/ui/button';
import { useGlobalStore } from '~/stores/root.provider';

export const Onboarding = observer(() => {
  const { onboardingStore } = useGlobalStore();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Permissions</h2>
        <p>Configuration des permissions nécessaires.</p>
        <ul>
          <li>
            Créez un nouveau label <code>Le Journal</code> dans votre boite mail.{' '}
          </li>
          <li>
            Créer un filtre pour affecter vos emails à ce label <code>Le Journal</code>
          </li>
          <li>Redirigez les newsletters en dehors de la boîte de réception sur ce filtre.</li>
        </ul>
        <Button onClick={onboardingStore.configureGoogleAccount}>Configurer les permissions</Button>
      </div>
    </div>
  );
});
