export interface EmailTemplate {
  subject: string;
  html: string;
}

export interface EmailContent {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface EmailServiceRepository {
  sendEmail(content: EmailContent): Promise<boolean>;
}
