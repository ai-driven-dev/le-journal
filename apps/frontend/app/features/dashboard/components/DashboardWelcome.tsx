import { observer } from 'mobx-react-lite';
import type { ReactNode } from 'react';

import { dashboardStore } from '../stores/dashboardStore';

export const DashboardWelcome = observer((): ReactNode => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenue {dashboardStore.userName}</h1>

        <p className="mt-2 text-gray-600">Votre espace personnel est prêt à être utilisé.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900">Prochainement</h2>
          <p className="mt-2 text-blue-700">
            De nouvelles fonctionnalités seront bientôt disponibles.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-green-900">Commencer</h2>
          <p className="mt-2 text-green-700">
            Créez votre première entrée de journal dès maintenant.
          </p>
        </div>
      </div>
    </div>
  );
});
