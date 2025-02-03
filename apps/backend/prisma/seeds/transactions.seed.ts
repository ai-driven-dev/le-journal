import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTransactions() {
  console.log('🌱 Seeding transactions...');

  const premiumUser = await prisma.user.findFirst({
    where: {
      email: 'user.premium@example.com',
    },
  });

  if (!premiumUser) {
    throw new Error('Premium user not found');
  }

  const premiumTransaction: Prisma.TransactionCreateInput = {
    stripe_payment_id: 'stripe_test_premium_123',
    amount: new Prisma.Decimal(99.99),
    currency: 'USD',
    status: 'COMPLETED',
    payment_method: 'CREDIT_CARD',
    invoice_url: 'https://stripe.com/invoice/premium_123',
    user: { connect: { id: premiumUser.id } },
  };

  const transaction = await prisma.transaction.create({ data: premiumTransaction });

  console.log('✅ Transactions seeded');
  return transaction;
}
