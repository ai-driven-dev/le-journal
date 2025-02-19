export const env = {
  // Google
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL_FULL: process.env.GOOGLE_CALLBACK_URL_FULL,

  // Redis
  REDIS_URL: process.env.REDIS_URL,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,

  // Domains
  FRONTEND_URL: process.env.FRONTEND_URL,
  BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
  FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,

  // Admin
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,

  // Logging
  ENABLE_LOGGING: process.env.ENABLE_LOGGING,
  LOG_LEVEL: process.env.LOG_LEVEL,

  // Email
  DEFAULT_SENDER: process.env.DEFAULT_SENDER,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
} as const;

const envKeys = Object.keys(env) as Array<keyof typeof env>;

export const isProduction: boolean = process.env.NODE_ENV === 'production';

export function checkEnv(): void {
  for (const key of envKeys) {
    const envKey = env[key];
    if (envKey === undefined) {
      throw new Error(`${key} is not defined`);
    }
  }
}

export function getEnv(key: keyof typeof env): string {
  const value = env[key];

  if (value === undefined) {
    throw new Error(`${key} is not defined`);
  }

  return value;
}
