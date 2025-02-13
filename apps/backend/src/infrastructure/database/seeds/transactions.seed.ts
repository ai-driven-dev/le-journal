import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Transaction } from '@prisma/client';

@Injectable()
export class TransactionsSeed {
  async seed(
    tx: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ): Promise<Transaction[]> {
    console.info('- Seeding transactions...');

    const premiumUser = await tx.user.findFirst({
      where: { email: 'user.premium@example.com' },
    });

    if (!premiumUser) {
      throw new Error('Premium user not found');
    }

    const transactionsData: Prisma.TransactionCreateInput[] = [
      {
        stripe_payment_id: 'stripe_test_premium_123',
        amount: new Prisma.Decimal(99.99),
        currency: 'USD',
        status: 'COMPLETED',
        payment_method: 'CREDIT_CARD',
        invoice_url: 'https://stripe.com/invoice/premium_123',
        user: { connect: { id: premiumUser.id } },
      },
    ];

    const transactions = await Promise.all(
      transactionsData.map((transaction) => tx.transaction.create({ data: transaction })),
    );

    return transactions;
  }
}
