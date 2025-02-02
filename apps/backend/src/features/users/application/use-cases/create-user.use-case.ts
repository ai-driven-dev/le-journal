import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import { Email } from '../../domain/value-objects/email.value-object';
import { UserName } from '../../domain/value-objects/user-name.value-object';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(emailStr: string, nameStr?: string): Promise<User> {
    const email = Email.create(emailStr);

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(emailStr);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const name = nameStr ? UserName.create(nameStr) : undefined;
    const user = User.create(email, name);

    return this.userRepository.create(user);
  }
}
