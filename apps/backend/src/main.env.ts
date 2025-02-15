export const env = {
  // Google
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL_FULL: process.env.GOOGLE_CALLBACK_URL_FULL,
  GOOGLE_CALLBACK_URL_READONLY: process.env.GOOGLE_CALLBACK_URL_READONLY,

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
} as const;

const envKeys = Object.keys(env) as Array<keyof typeof env>;

export const isProduction: boolean = process.env.NODE_ENV === 'production';

export function checkEnv(): void {
  for (const key of envKeys) {
    // eslint-disable-next-line security/detect-object-injection
    const envKey = env[key];
    if (envKey === undefined) {
      throw new Error(`${key} is not defined`);
    }
  }
}

export function getEnv(key: keyof typeof env): string {
  // eslint-disable-next-line security/detect-object-injection
  const value = env[key];

  if (value === undefined) {
    throw new Error(`${key} is not defined`);
  }

  return value;
}
