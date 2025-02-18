import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

type ApiPropertyKey = 'name' | 'slug' | 'userId' | 'newsletterAlias' | 'number';

interface ApiPropertyField {
  example: string | number;
  description: string;
}

const propertyFields: Record<ApiPropertyKey, ApiPropertyField> = {
  name: {
    example: 'Project Alpha',
    description: 'Nom',
  },
  slug: {
    example: 'project-alpha',
    description: 'Slug',
  },
  userId: {
    example: 'usr_b6a9ef32d8c2',
    description: 'ID du propriétaire',
  },
  newsletterAlias: {
    example: 'newsletter+le-journal@ai-driven-dev.com',
    description: 'Alias unique pour les newsletters',
  },
  number: {
    example: 1,
    description: 'Numéro',
  },
};

export const ApiAuthProperty = (
  key: ApiPropertyKey,
  customDescription?: string,
): PropertyDecorator => {
  const propertyField = propertyFields[key];

  return applyDecorators(
    ApiProperty({
      ...propertyField,
      description: customDescription ?? propertyField.description,
    }),
  );
};
