import { Newsletter, NewsletterStatus, NewsletterStatusType } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class NewsletterDomain extends Newsletter {
  @ApiProperty({
    description: 'The unique identifier of the newsletter subscription',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'The email address subscribed to the newsletter',
    example: 'user@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'The date when the user subscribed to the newsletter',
    example: '2024-02-08T20:00:00.000Z',
  })
  subscribedAt!: Date;

  @ApiProperty({
    description: 'The current status of the newsletter subscription',
    enum: NewsletterStatus,
    example: NewsletterStatus.PENDING,
  })
  subscriptionStatus!: NewsletterStatusType;
}
