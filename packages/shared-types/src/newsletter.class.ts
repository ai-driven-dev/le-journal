import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';


export const NewsletterStatus = {
  ACTIVE: 'ACTIVE' as const,
  IN_PROGRESS: 'IN_PROGRESS' as const,
  PENDING: 'PENDING' as const,
  FAILED: 'FAILED' as const,
} as const;

export type NewsletterStatusType = (typeof NewsletterStatus)[keyof typeof NewsletterStatus];

export class Newsletter {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsDate()
  @IsNotEmpty()
  subscribedAt!: Date;

  @IsEnum(NewsletterStatus)
  @IsNotEmpty()
  subscriptionStatus!: NewsletterStatusType;
}
