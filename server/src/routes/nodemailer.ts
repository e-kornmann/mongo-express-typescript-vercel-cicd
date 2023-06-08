import Router from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const nodegmailmailer = Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

nodegmailmailer.post('/', async (req, res) => {
  const { email, bookingId } = req.body;
  if (!email || !bookingId) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const mailOptions = {
    from: 'info@tinysitters.com',
    to: email,
    subject: 'Booking Confirmation',
    text: `Thank you for booking a sitter. Your booking Id is:${bookingId} TinnySitters®`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

export default nodegmailmailer;
