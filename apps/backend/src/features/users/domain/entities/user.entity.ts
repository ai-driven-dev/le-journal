import { Email } from '../value-objects/email.value-object';
import { UserName } from '../value-objects/user-name.value-object';

export class User {
  constructor(
    private readonly id: string | undefined,
    private readonly email: Email,
    private readonly name: UserName | undefined,
    private readonly createdAt: Date = new Date(),
    private readonly updatedAt: Date = new Date(),
  ) {
    this.validateState();
  }

  private validateState(): void {
    if (!this.email) {
      throw new Error('User must have an email');
    }
  }

  static create(email: Email, name?: UserName): User {
    return new User(
      undefined,
      email,
      name,
    );
  }

  static reconstitute(
    id: string,
    email: string,
    name: string | null,
    createdAt: Date,
    updatedAt: Date,
  ): User {
    return new User(
      id,
      Email.create(email),
      name ? UserName.create(name) : undefined,
      createdAt,
      updatedAt,
    );
  }

  equals(other: User): boolean {
    if (!(other instanceof User)) return false;
    if (!this.id || !other.id) return false;
    return this.id === other.id;
  }

  hasName(): boolean {
    return !!this.name;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email.getValue(),
      name: this.name?.getValue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  getId(): string | undefined {
    return this.id;
  }

  getEmail(): Email {
    return this.email;
  }

  getName(): UserName | undefined {
    return this.name;
  }
}
