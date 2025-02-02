export class Email {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  static create(email: string): Email {
    return new Email(email);
  }

  private validate(email: string): void {
    if (!email || email.trim().length === 0) {
      throw new Error('Email cannot be empty');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    if (!(other instanceof Email)) return false;
    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  getDomain(): string {
    return this.value.split('@')[1];
  }

  getLocalPart(): string {
    return this.value.split('@')[0];
  }
}
