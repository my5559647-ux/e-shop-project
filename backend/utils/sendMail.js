const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  if (!process.env.SMPT_MAIL || !process.env.SMPT_PASSWORD) {
    throw new Error("Email service is not configured");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: Number(process.env.SMPT_PORT) || 587,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  console.log("Sending email to:", options.email);
  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully!");
};

module.exports = sendMail;