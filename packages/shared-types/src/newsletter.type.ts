import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export const SubscriptionStatus = {
  ACTIVE: 'ACTIVE' as const,
  IN_PROGRESS: 'IN_PROGRESS' as const,
  PENDING: 'PENDING' as const,
  FAILED: 'FAILED' as const,
} as const;

export type SubscriptionStatusType = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export class Newsletter {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsDate()
  @IsNotEmpty()
  subscribed_at!: Date;

  @IsEnum(SubscriptionStatus)
  @IsNotEmpty()
  subscription_status!: SubscriptionStatusType;
}
