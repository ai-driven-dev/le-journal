import type { EmailTemplate } from './email.types';

export const WELCOME_EMAIL: EmailTemplate = {
  subject: 'Welcome to Le Journal! 🎉',
  html: `
    <h1>Welcome to Le Journal!</h1>
    <p>This is a test email to verify your Gmail filters are working correctly.</p>
    <p>Here are some useful links to get started:</p>
    <ul>
      <li><a href="https://discord.gg/lejournal">Join our Discord community</a></li>
      <li><a href="https://blog.lejournal.dev">Read our Blog</a></li>
      <li><a href="https://linkedin.com/company/lejournal">Follow us on LinkedIn</a></li>
      <li><a href="https://youtube.com/@lejournal">Subscribe to our YouTube channel</a></li>
    </ul>
    <p>Best regards,<br>The Le Journal Team</p>
  `,
};

export const DEFAULT_SENDER = 'Le Journal <no-reply@lejournal.dev>';
