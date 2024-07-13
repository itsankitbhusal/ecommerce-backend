import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private config: ConfigService,
  ) {}

  async sendUserConfirmation(email: string, name: string, otp: string) {
    // console.log('otp: ', otp);
    // console.log('email: ', email);
    // console.log('name: ', name);
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: `Welcome to ${this.config.get('APP_NAME')}!  Confirm your Email`,
      html: `
      <p>Hello ${name},</p>
      <p>Thank you for registering. Please confirm your email using the following OTP:</p>
      <p><b>${otp}</b></p>
      <p>Best regards,<br/>${this.config.get('APP_NAME')}</p>
      <p><img src="${this.config.get('COMPANY_LOGO')}" alt="Company Logo" /></p>
    `,
      // template: './confirmation',
      // context: {
      //   username: name,
      //   otp: otp,
      //   currentYear: new Date().getFullYear(),
      //   company_logo: this.config.get('COMPANY_LOGO'),
      // },
    });

    // console.log('data: ', data);
  }

  async sendPasswordConfirmation(email: string, name: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      from: `"Support Team" <${this.config.get('MAIL_ID')}>`, // override default from
      subject: `Password Reset Confirmation for ${this.config.get('APP_NAME')}`,
      template: './confirmation',
      // text: `Here is your otp ${otp}`,
      html: `
      <p>Hello ${name},</p>
      <p>You requested a password reset. Please use the following OTP to reset your password:</p>
      <p><b>${otp}</b></p>
      <p>Best regards,<br/>${this.config.get('APP_NAME')}</p>
      <p><img src="${this.config.get('COMPANY_LOGO')}" alt="Company Logo" /></p>
    `,
      // context: {
      //   username: name,
      //   otp: otp,
      //   currentYear: new Date().getFullYear(),
      //   company_logo: this.config.get('COMPANY_LOGO'),
      // },
    });
  }
}
