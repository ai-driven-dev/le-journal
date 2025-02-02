import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { UserPrismaMapper } from '../persistence/user.prisma.mapper';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const prismaUser = await this.prisma.user.create({
      data: {
        email: user.getEmail().getValue(),
        name: user.getName()?.getValue(),
      },
    });
    return UserPrismaMapper.toDomain(prismaUser);
  }

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany();
    return prismaUsers.map(UserPrismaMapper.toDomain);
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });
    return prismaUser ? UserPrismaMapper.toDomain(prismaUser) : null;
  }
}
