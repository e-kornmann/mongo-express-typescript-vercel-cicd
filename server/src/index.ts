import express, { Request, Response } from 'express'
import cors from 'cors';
import { InsertBooking } from './types/types';
import { getAvailableSitters } from './handlers';
import mailer from './routes/mailjet'
import sitters from './routes/sitters'
import bookings from './routes/bookings';

const app = express()
const port = process.env.PORT || 8080

app.use(express.json());
app.use(cors());

app.use('/api/sitters', sitters);
app.use('/send-email', mailer);
app.use('/api/bookings', bookings);

app.get('/', (_req: Request, res: Response) => {
	return res.send('Express Typescript on Vercel')
})

app.listen(port, () => {
	return console.log(`Server is listening on ${port}`)
})

