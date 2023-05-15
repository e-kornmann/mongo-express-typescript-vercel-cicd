import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import mailer from './routes/mailjet'
import sitters from './routes/sitters'
import bookings from './routes/bookings';

dotenv.config();

const app = express()
const port = process.env.PORT || 8000

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://tinysitters.vercel.app'],
  })
);



app.use('/api/sitters', sitters);
app.use('/api/send-email', mailer);
app.use('/api/bookings', bookings);

app.get('/', (_req: Request, res: Response) => {
	return res.send('API is running')
})

app.listen(port, () => {
	return console.log(`Server is listening on ${port}`)
})

