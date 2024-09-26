import nodemailer from 'nodemailer';

const sendWelcomeEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Our Service',
    text: `Hello! Thank you for registering with us. We are glad to have you!`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendWelcomeEmail;
