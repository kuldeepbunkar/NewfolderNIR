const nodemailer = require('nodemailer');
const ejs = require('ejs');
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
  }

  async sendEmail(to, subject, template, data) {
    try {
      const templatePath = path.join(__dirname, `../templates/emails/${template}.ejs`);
      const html = await ejs.renderFile(templatePath, data);

      await this.transporter.sendMail({
        from: `"Next Innovation Realty" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html
      });
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  }

  async sendVerificationEmail(user) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${user.verificationToken}`;
    await this.sendEmail(
      user.email,
      'Verify Your Email',
      'verification',
      { name: user.name, verificationUrl }
    );
  }

  async sendPasswordResetEmail(user) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${user.resetPasswordToken}`;
    await this.sendEmail(
      user.email,
      'Reset Your Password',
      'password-reset',
      { name: user.name, resetUrl }
    );
  }

  async sendEnquiryNotification(enquiry) {
    await this.sendEmail(
      enquiry.agent.email,
      'New Property Enquiry',
      'enquiry-notification',
      { 
        agentName: enquiry.agent.name,
        propertyTitle: enquiry.property.title,
        message: enquiry.message,
        userName: enquiry.user.name
      }
    );
  }
}

module.exports = new EmailService(); 