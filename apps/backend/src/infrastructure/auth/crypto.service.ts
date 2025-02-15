import * as crypto from 'crypto';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService implements OnModuleInit {
  private readonly algorithm = 'aes-256-ctr';
  private readonly keyLength = 32; // 256 bits
  private encryptionKey!: Buffer;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const secret = this.configService.get<string>('REFRESH_TOKEN_SECRET');

    if (!secret) {
      throw new Error('REFRESH_TOKEN_SECRET environment variable is not set');
    }

    // Create a key using PBKDF2
    this.encryptionKey = crypto.pbkdf2Sync(
      secret,
      'salt', // You might want to make this configurable too
      100000, // iterations
      this.keyLength,
      'sha512',
    );
  }

  encryptToken(token: string): { iv: string; encryptedToken: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);

    const encryptedBuffer = Buffer.concat([cipher.update(token, 'utf8'), cipher.final()]);

    return {
      iv: iv.toString('hex'),
      encryptedToken: encryptedBuffer.toString('hex'),
    };
  }

  decryptToken(encryptedToken: string, iv: string): string {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.encryptionKey,
      Buffer.from(iv, 'hex'),
    );

    const decryptedBuffer = Buffer.concat([
      decipher.update(Buffer.from(encryptedToken, 'hex')),
      decipher.final(),
    ]);

    return decryptedBuffer.toString('utf8');
  }
}
