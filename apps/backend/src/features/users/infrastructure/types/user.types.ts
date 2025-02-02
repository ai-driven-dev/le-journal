import type { ApiUser, CreateApiUser } from '@le-journal/shared-types';
import type { Prisma, User } from '@prisma/client';

/**
 * Type validation pour s'assurer que ApiUser correspond au type Prisma User
 */
export type ValidateApiUser = ApiUser extends User ? true : never;

/**
 * Type validation pour s'assurer que CreateApiUser correspond au type Prisma UserCreateInput
 */
export type ValidateCreateApiUser = CreateApiUser extends Prisma.UserCreateInput ? true : never;

// Force TypeScript à évaluer les types

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _typeValidation: {
  apiUser: ValidateApiUser;
  createApiUser: ValidateCreateApiUser;
} = {
  apiUser: true as ValidateApiUser,
  createApiUser: true as ValidateCreateApiUser,
};
