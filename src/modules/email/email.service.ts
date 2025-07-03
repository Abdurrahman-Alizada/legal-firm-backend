import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendResetPasswordEmail(to: string, resetLink: string) {
    const info = await this.transporter.sendMail({
      from: `"LawFirm App" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: "Reset Your Password",
      html: `
        <p>Hello,</p>
        <p>You requested to reset your password. Click the link below:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you didn’t request this, please ignore this email.</p>
      `,
    });

    this.logger.log(`📤 Email sent: ${info.messageId}`);
  }

  async sendGenericEmail(to: string, subject: string, html: string) {
    const info = await this.transporter.sendMail({
      from: `"LawFirm" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    });

    this.logger.log(`📨 Email sent to ${to}: ${info.messageId}`);
    return info;
  }
}
