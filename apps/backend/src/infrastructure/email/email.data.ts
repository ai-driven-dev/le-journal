import { getEnv } from '../../main.env';

import type { EmailTemplate } from './email.types';

export const DEFAULT_SENDER = getEnv('DEFAULT_SENDER');

export const WELCOME_EMAIL: EmailTemplate = {
  from: DEFAULT_SENDER,
  subject: 'Bienvenue sur Le Journal! 🎉',
  html: `
    <h1>Bienvenue sur Le Journal!</h1>
    <p>Ceci est un email de test pour vérifier que vos filtres Gmail fonctionnent correctement.</p>
    <p>Voici quelques liens utiles pour commencer :</p>
    <ul>
      <li><a href="https://le-journal.dev">Votre dose de tech chaque semaine, triée à l'IA.</a></li>
      <li><a href="https://bit.ly/alexsoyes-discord">Le groupe de la communauté AI-Driven Devs</a></li>
      <li><a href="https://youtube.com/@alexsoyes">La chaîne YouTube d'Alex Soyes</a></li>
    </ul>
    <p>Cordialement,<br>L'équipe Le Journal</p>
  `,
};
