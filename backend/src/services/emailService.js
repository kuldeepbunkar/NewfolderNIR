const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    this.email = new Email({
      message: {
        from: process.env.EMAIL_FROM
      },
      transport: this.transporter,
      views: {
        root: path.join(__dirname, '../templates/email'),
        options: {
          extension: 'ejs'
        }
      }
    });
  }

  async sendWelcomeEmail(user) {
    try {
      await this.email.send({
        template: 'welcome',
        message: {
          to: user.email
        },
        locals: {
          name: user.name,
          confirmationUrl: `${process.env.FRONTEND_URL}/confirm-email?token=${user.confirmationToken}`
        }
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }
  }

  async sendPasswordReset(user) {
    try {
      await this.email.send({
        template: 'password-reset',
        message: {
          to: user.email
        },
        locals: {
          name: user.name,
          resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${user.resetToken}`
        }
      });
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw error;
    }
  }

  // Add more email methods as needed
}

module.exports = new EmailService(); 