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
    await this.mailerService.sendMail({
      to: email,
      from: `"Support Team" <${this.config.get('MAIL_ID')}>`,
      subject: `Welcome to ${this.config.get('APP_NAME')}!  Confirm your Email`,
      html: this.getConfirmationEmailTemplate(
        name,
        otp,
        new Date().getFullYear(),
        this.config.get('COMPANY_LOGO'),
      ),
    });
  }

  async sendPasswordConfirmation(email: string, name: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      from: `"Support Team" <${this.config.get('MAIL_ID')}>`,
      subject: `Password Reset Confirmation for ${this.config.get('APP_NAME')}`,
      html: this.getWelcomeEmailTemplate(
        name,
        otp,
        new Date().getFullYear(),
        this.config.get('COMPANY_LOGO'),
      ),
    });
  }
  private getWelcomeEmailTemplate(
    name: string,
    otp: string,
    currentYear: number,
    companyLogo: string,
  ): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to ${this.config.get('APP_NAME') || 'e-commerce'}</title>
          <style>
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; padding: 20px; }
            .logo { max-width: 200px; }
            .content { padding: 20px; }
            .footer { text-align: center; background-color: #f5f5f5; padding: 10px; }
            .otp-container { text-align: center; padding: 10px; background-color: #f0f0f0; border-radius: 4px; margin: 10px 0; }
            .otp { font-size: 24px; color: #007bff; user-select: text; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; }
            @media (max-width: 500px) { .container { border-radius: 0; } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src=${companyLogo} alt="Company Logo" class="logo" />
            </div>
            <div class="content">
              <h2>Welcome to Our eCommerce Store!</h2>
              <p>Dear ${name},</p>
              <p>Thank you for creating an account with us. Here is your OTP to complete the registration:</p>
              <div class="otp-container">
                <strong class="otp">${otp}</strong>
              </div>
              <p>Use this OTP to confirm your email and start shopping with us.</p>
              <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
              <p>Happy Shopping!</p>
            </div>
            <div class="footer">
              <p>&copy; ${currentYear} Our eCommerce Store. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getConfirmationEmailTemplate(
    name: string,
    otp: string,
    currentYear: number,
    companyLogo: string,
  ): string {
    const appName = this.config.get('APP_NAME') || 'e-commerce';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to ${appName}</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px;
            }
            .logo {
              max-width: 200px;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              background-color: #f5f5f5;
              padding: 10px;
            }
            .otp-container {
              text-align: center;
              padding: 10px;
              background-color: #f0f0f0;
              border-radius: 4px;
              margin: 10px 0;
            }
            .otp {
              font-size: 24px;
              color: #007bff;
              user-select: text;
              -moz-user-select: text;
              -webkit-user-select: text;
              -ms-user-select: text;
            }
            @media (max-width: 500px) {
              .container {
                border-radius: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="${companyLogo}" alt="Company Logo" class="logo" />
            </div>
            <div class="content">
              <h2>Welcome to ${appName}!</h2>
              <p>Dear ${name},</p>
              <p>Thank you for registering. Please confirm your email using the following OTP:</p>
              <div class="otp-container">
                <strong class="otp">${otp}</strong>
              </div>
              <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
              <p>Best regards,<br/>${appName}</p>
            </div>
            <div class="footer">
              <p>&copy; ${currentYear} ${appName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}
