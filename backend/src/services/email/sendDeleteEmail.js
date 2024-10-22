// backend/src/services/email/sendDeleteEmail.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.strato.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates (optional)
    },
  });


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Deletion Confirmation',
    text: `We're sorry to see you go! Your account has been successfully deleted. You are welcome to create a new account anytime on our site.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Deletion email sent to ${email}`);
  } catch (error) {
    console.error('Error sending deletion email:', error);
  }

export default sendDeleteEmail;
