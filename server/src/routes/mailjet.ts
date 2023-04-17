import Router from 'express';
import mailjet from 'node-mailjet';

const mailer = Router();

mailer.post('/send-email', async (req, res) => {
    const mailjetClient = mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE,
    );
  
    const { email, bookingId } = req.body;
    if (!email || !bookingId) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    const request = mailjetClient
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'elpachris.obeng@appliedtechnology.se',
              Name: 'Tinny Sitters',
            },
            To: [
              {
                Email: email,
              },
            ],
            Subject: 'Booking Confirmation',
            TextPart: 'Testing testing',
            HTMLPart:
            `<h3>Thank you for booking a sitter. Your booking Id is:${bookingId} TinnySitters®</h3>`,
            CustomID: 'Tinny Sitters',
          },
        ],
      });
  
    request
      .then(result => {
        console.log(result.body);
      })
      .catch(err => {
        console.log(err.statusCode);
      });
  });

  export default mailer;