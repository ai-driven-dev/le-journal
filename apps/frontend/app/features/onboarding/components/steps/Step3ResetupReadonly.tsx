import { observer } from 'mobx-react-lite';

import { Button } from '~/components/ui/button';

export const StepSetup = observer(() => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Configuration</h2>
      <p>Configurez vos préférences.</p>
      <p>Nous allons appeler le service Google pour : </p>
      <ul>
        <li>
          Créez un nouveau label <code>Le Journal</code> dans votre boite mail.{' '}
        </li>
        <li>
          Créer un filtre pour affecter vos emails à ce label <code>Le Journal</code>
        </li>
        <li>Redirigez les newsletters en dehors de la boîte de réception sur ce filtre.</li>
      </ul>

      <p>
        De cette manière là, vous n'aurez plus l'esprit encombré par les newsletters et elles se
        trairont automatiquement sur le dashboard.
      </p>

      <Button onClick={() => {}}>On y va ?</Button>
    </div>
  );
});
