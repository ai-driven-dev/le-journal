import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

type PropertyKeys = keyof typeof propertyFields;

export function Property(key: PropertyKeys, customDescription?: string): PropertyDecorator;
export function Property(
  key: Exclude<string, PropertyKeys>,
  customDescription: string,
): PropertyDecorator;

export function Property(key: string, customDescription?: string): PropertyDecorator {
  const propertyField = propertyFields[key as PropertyKeys];

  return applyDecorators(
    ApiProperty({
      example: propertyField?.example,
      description: customDescription ?? propertyField?.description,
    }),
  );
}

type ApiPropertyKey =
  | 'id'
  | 'name'
  | 'email'
  | 'slug'
  | 'userId'
  | 'emailAlias'
  | 'number'
  | 'createdAt';

interface ApiPropertyField {
  example: string | number;
  description: string;
}

const propertyFields: Record<ApiPropertyKey, ApiPropertyField> = {
  id: {
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID',
  },
  name: {
    example: 'Project Alpha',
    description: 'Nom',
  },
  email: {
    example: 'user@example.com',
    description: 'Email',
  },
  slug: {
    example: 'project-alpha',
    description: 'Slug',
  },
  createdAt: {
    example: '2021-01-01T00:00:00.000Z',
    description: 'Date de création',
  },
  userId: {
    example: 'usr_b6a9ef32d8c2',
    description: 'ID du propriétaire',
  },
  emailAlias: {
    example: 'newsletter+le-journal@ai-driven-dev.com',
    description: 'Alias unique pour les newsletters',
  },
  number: {
    example: 1,
    description: 'Numéro',
  },
};
