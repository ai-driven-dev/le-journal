import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

export const meta: MetaFunction = (): ReturnType<MetaFunction> => {
  return [
    { title: 'Le Journal - Accueil' },
    { name: 'description', content: 'Votre veille techno automatique' },
  ];
};

export default observer(function Index(): React.ReactNode {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-900">
            Le Journal : Votre veille techno automatique
          </h1>

          <p className="text-xl text-gray-600">
            Gagnez 3h / semaine en laissant l'IA vous trier vos newsletters pour en retirer
            l'essentiel.
          </p>

          <div className="space-y-4">
            <Link
              to="/onboarding"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              Commencer votre journal
            </Link>
            <div className="mt-4">
              <Link to="/dashboard" className="text-blue-600 hover:text-blue-700">
                Accéder à mon tableau de bord →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});
