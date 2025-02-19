import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { UserDomain } from '../domain/user.domain';
import { UserRepository } from '../domain/user.repository.interface';
import { UserMapper } from '../presentation/user.mapper';

import { CryptoService } from './crypto.service';

import { AppLogger } from 'src/infrastructure/logger/logger.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly logger: AppLogger,
    private readonly userMapper: UserMapper,
  ) {}

  async findAll(): Promise<UserDomain[]> {
    const users: User[] = await this.prisma.user.findMany();

    const decryptedUsers = users.map((user) => ({
      ...user, // Copie de l'objet pour éviter la mutation directe
      google_refresh_token: this.cryptoService.decryptToken(
        user.google_refresh_token,
        user.google_refresh_token_iv,
      ),
    }));

    return decryptedUsers.map((user) => this.userMapper.toDomain(user));
  }

  async findByEmailOrGoogleId(
    email: User['email'],
    google_id: User['google_id'],
  ): Promise<UserDomain | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { google_id }],
      },
    });

    if (!user) {
      return null;
    }

    if (user.google_refresh_token) {
      user.google_refresh_token = this.cryptoService.decryptToken(
        user.google_refresh_token,
        user.google_refresh_token_iv,
      );
    }

    return this.userMapper.toDomain(user);
  }

  async findById(id: User['id']): Promise<UserDomain | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    user.google_refresh_token = this.cryptoService.decryptToken(
      user.google_refresh_token,
      user.google_refresh_token_iv,
    );

    return this.userMapper.toDomain(user);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserDomain> {
    const { iv, encryptedToken } = this.cryptoService.encryptToken(data.google_refresh_token);

    this.logger.log('Create a new user', {
      service: 'PrismaUserRepository',
      method: 'createUser',
      metadata: {
        data,
      },
    });

    const user = await this.prisma.user.create({
      data: {
        ...data,
        google_refresh_token: encryptedToken,
        google_refresh_token_iv: iv,
      },
    });

    return this.userMapper.toDomain(user);
  }

  async updateUser(userId: string, data: Prisma.UserUpdateInput): Promise<UserDomain> {
    this.logger.log('Update a user', {
      service: 'PrismaUserRepository',
      method: 'updateUser',
      metadata: {
        userId,
        data,
      },
    });

    if (
      'google_refresh_token' in data &&
      data.google_refresh_token !== null &&
      data.google_refresh_token !== undefined
    ) {
      const token =
        typeof data.google_refresh_token === 'string'
          ? data.google_refresh_token
          : data.google_refresh_token.set;

      if (!token) {
        throw new Error('Google refresh token is required');
      }

      this.logger.log('Encrypt the refresh token', {
        service: 'PrismaUserRepository',
        method: 'updateUser',
      });

      const { iv, encryptedToken } = this.cryptoService.encryptToken(token);

      data.google_refresh_token = encryptedToken;
      data.google_refresh_token_iv = iv;
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
      },
    });

    return this.userMapper.toDomain(user);
  }
}
