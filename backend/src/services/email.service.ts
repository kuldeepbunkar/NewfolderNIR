import nodemailer, { Transporter } from 'nodemailer';
import { IUser } from '../models/interfaces';
import { AppError } from '../utils/errors';

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Next Innovation Realty" <${process.env.SMTP_USER}>`,
        ...options
      });
    } catch (error) {
      throw new AppError('Email sending failed', 500);
    }
  }

  async sendVerificationEmail(user: IUser): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${user.verificationToken}`;
    
    await this.sendEmail({
      to: user.email,
      subject: 'Verify Your Email',
      html: `
        <h1>Welcome ${user.name}!</h1>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
      `
    });
  }
}

export const emailService = new EmailService(); 