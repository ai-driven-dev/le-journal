import type { Newsletter, SubscriptionStatusType } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Newsletter as PrismaNewsletter } from '@prisma/client';

export class NewsletterDto implements Newsletter {
  @ApiProperty({
    description: 'The unique identifier of the newsletter subscription',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The user ID who subscribed to the newsletter',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  user_id: string;

  @ApiProperty({
    description: 'The email address subscribed to the newsletter',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The date when the user subscribed to the newsletter',
    example: '2024-02-08T20:00:00.000Z',
  })
  subscribed_at: Date;

  @ApiProperty({
    description: 'The current status of the newsletter subscription',
    enum: ['ACTIVE', 'IN_PROGRESS', 'PENDING', 'FAILED'],
    example: 'ACTIVE',
  })
  subscription_status: SubscriptionStatusType;

  constructor(newsletter: PrismaNewsletter) {
    this.id = newsletter.id;
    this.user_id = newsletter.user_id;
    this.email = newsletter.email;
    this.subscribed_at = newsletter.subscribed_at;
    this.subscription_status = newsletter.subscription_status;
  }
}
