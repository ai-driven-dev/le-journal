export const ACCESS_TOKEN_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes
export const REFRESH_TOKEN_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000; // 30 jours

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

export type JwtPayload = {
  userId: string;
};
