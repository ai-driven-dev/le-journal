import { ApiProperty } from '@nestjs/swagger';
import { EmailStatus } from '@prisma/client';

export class EmailDto {
  @ApiProperty({
    description: "ID unique de l'email",
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'ID du projet associé',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  project_id!: string;

  @ApiProperty({
    description: 'ID de la newsletter associée',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  newsletter_id!: string;

  @ApiProperty({
    description: "Sujet de l'email",
    example: 'Newsletter #42 - Les dernières actualités tech',
  })
  subject!: string;

  @ApiProperty({
    description: "Contenu brut de l'email",
    example: "Contenu de l'email au format texte...",
  })
  raw_content!: string;

  @ApiProperty({
    description: "Date de réception de l'email",
    example: '2024-03-20T10:00:00Z',
  })
  received_at!: Date;

  @ApiProperty({
    description: "Statut de traitement de l'email",
    enum: EmailStatus,
    example: 'RECEIVED',
  })
  status!: EmailStatus;

  constructor(partial: Partial<EmailDto>) {
    Object.assign(this, partial);
  }
}
