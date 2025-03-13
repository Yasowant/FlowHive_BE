const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER, // Used for authentication
      pass: process.env.SMTP_PASS, // Used for authentication
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER, // Sent from SMTP_USER
    to, // Sent to the dynamic user email
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
