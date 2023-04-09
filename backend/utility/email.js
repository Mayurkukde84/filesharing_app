const nodemailer = require("nodemailer");

const sendMail = async function({ from, to, subject, text, html }) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
  console.log(info)
}

module.exports = sendMail;
