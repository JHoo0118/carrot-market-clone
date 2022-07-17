import nodemailer from 'nodemailer';

const smtpTransport = nodemailer.createTransport({
  service: 'GMail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.NODEMAILER_ID,
    pass: process.env.NODEMAILER_GOOGLE_APP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default smtpTransport;
