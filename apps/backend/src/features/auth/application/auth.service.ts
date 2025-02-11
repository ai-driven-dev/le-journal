import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async handleGoogleAuth(googleUser: any): Promise<{ accessToken: string; user: User }> {
    const { email, name, avatar, googleId } = googleUser;

    let user = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { google_id: googleId }] },
    });

    if (!user) {
      // Create new user
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          avatar,
          google_id: googleId,
        },
      });
    } else {
      // Update existing user
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          avatar,
          google_id: googleId,
        },
      });
    }

    const accessToken = this.generateToken(user);

    return { accessToken, user };
  }

  private generateToken(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }
}
