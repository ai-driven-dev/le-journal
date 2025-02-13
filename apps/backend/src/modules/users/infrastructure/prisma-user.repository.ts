import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { UserRepository } from '../domain/user.repository.interface';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmailOrGoogleId(
    email: User['email'],
    google_id: User['google_id'],
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { google_id }],
      },
    });
  }

  async findById(id: User['id']): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(userData: {
    email: string;
    name: string;
    avatar: string;
    google_id: string;
    refresh_token: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: userData,
    });
  }

  async updateUser(
    userId: string,
    userData: {
      name: string;
      avatar: string;
      refresh_token: string;
    },
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }
}
