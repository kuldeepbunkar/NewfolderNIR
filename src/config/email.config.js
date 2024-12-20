const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailConfig = {
  from: {
    email: process.env.FROM_EMAIL,
    name: 'Next Innovation Realty'
  },
  templates: {
    welcome: 'd-xxx',
    resetPassword: 'd-xxx',
    propertyApproved: 'd-xxx'
  }
};

const sendEmail = async (to, templateId, dynamicData) => {
  try {
    await sgMail.send({
      to,
      from: emailConfig.from,
      templateId,
      dynamic_template_data: dynamicData
    });
    return true;
  } catch (error) {
    console.error('Send email error:', error);
    return false;
  }
};

module.exports = {
  emailConfig,
  sendEmail
}; 