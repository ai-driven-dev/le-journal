import { observer } from 'mobx-react-lite';

import { Badge } from '~/components/ui/badge';
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
            Nouveau label <Badge>Le Journal</Badge>.
          </li>
          <li>Nouveau filtre pour trier vos newsletters.</li>
          <li>Rediriger la boîte de réception vers le label.</li>
          <li>Envoi d'un mail de test.</li>
        </ul>
        <Button onClick={onboardingStore.createProject}>Créer le projet</Button>
        <Button onClick={onboardingStore.setupCreateLabel}>Configurer le label</Button>
      </div>
    </div>
  );
});
