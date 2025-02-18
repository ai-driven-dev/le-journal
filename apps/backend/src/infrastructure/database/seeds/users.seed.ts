import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';

@Injectable()
export class UsersSeed {
  private readonly adminEmail = process.env.ADMIN_EMAIL;

  private readonly standardUser: Prisma.UserCreateInput = {
    email: 'user.standard@example.com',
    name: 'Standard User',
    role: 'REGULAR',
    google_id: '1234567891',
    avatar: '',
    google_scopes: [],
    google_refresh_token: '',
    google_refresh_token_iv: '',
  };

  private readonly adminUser: Prisma.UserCreateInput = {
    email: this.adminEmail!, // !: This is safe because we check for the admin email in the seed function
    name: 'Admin Premium',
    role: 'ADMIN',
    google_id: '1234567892',
    avatar: '',
    google_scopes: [],
    google_refresh_token: '',
    google_refresh_token_iv: '',
  };

  private readonly premiumUser: Prisma.UserCreateInput = {
    email: 'user.premium@example.com',
    name: 'Premium User',
    role: 'PREMIUM',
    google_id: '1234567893',
    avatar: '',
    google_scopes: [],
    google_refresh_token: '',
    google_refresh_token_iv: '',
  };

  async seed(
    tx: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ): Promise<User[]> {
    if (this.adminEmail === undefined) {
      throw new Error('ADMIN_EMAIL is not set');
    }

    console.info('- Seeding users...');

    const users = await Promise.all([
      tx.user.create({ data: this.standardUser }),
      tx.user.create({ data: this.adminUser }),
      tx.user.create({ data: this.premiumUser }),
    ]);

    return users;
  }
}
