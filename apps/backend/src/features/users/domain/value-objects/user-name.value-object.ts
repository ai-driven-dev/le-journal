export class UserName {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  static create(name: string): UserName {
    return new UserName(name);
  }

  private validate(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('User name cannot be empty');
    }
    if (name.trim().length < 2) {
      throw new Error('User name must be at least 2 characters long');
    }
    if (name.trim().length > 50) {
      throw new Error('User name cannot be longer than 50 characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserName): boolean {
    if (!(other instanceof UserName)) return false;
    return this.value === other.value;
  }
}
