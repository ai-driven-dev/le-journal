export class MissingGoogleConfigurationException extends Error {
  readonly cause: { clientID?: string; clientSecret?: string; callbackURL?: string };

  constructor(
    name: string,
    config: { clientID?: string; clientSecret?: string; callbackURL?: string },
  ) {
    super('Missing Google OAuth configuration');
    this.name = name;
    this.cause = config;
  }
}
