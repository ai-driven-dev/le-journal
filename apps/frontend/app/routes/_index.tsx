import { type MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Le Journal - Accueil' },
    { name: 'description', content: 'Bienvenue sur Le Journal - Votre journal personnel' },
  ];
};

export default function Index() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur Le Journal</h1>
      <p className="text-lg">Votre espace personnel pour écrire et organiser vos pensées.</p>
    </main>
  );
}
