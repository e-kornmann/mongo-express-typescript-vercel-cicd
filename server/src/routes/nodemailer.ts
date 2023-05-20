import Router from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const nodegmailmailer = Router();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'elton.kornmann@gmail.com',
          pass: process.env.NODEMAILER_PASS
        }
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
    text: `Thank you for booking a sitter. Your booking Id is:${bookingId} TinnySitters®`
  };
  
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
})

export default nodegmailmailer;