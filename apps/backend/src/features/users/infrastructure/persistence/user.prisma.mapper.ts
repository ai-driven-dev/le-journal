import { User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';

export class UserPrismaMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return User.reconstitute(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }
}
