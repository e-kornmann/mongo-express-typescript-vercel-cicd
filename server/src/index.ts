import express, { Request, Response } from 'express'
import cors from 'cors';
import { InsertBooking } from './types/types';
import { getAvailableSitters } from './handlers';


const app = express()
const port = process.env.PORT || 8080

app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
	return res.send('Express Typescript on Vercel')
})

app.get('/ping', (_req: Request, res: Response) => {
	return res.send('pong 🏓')
})

app.listen(port, () => {
	return console.log(`Server is listening on ${port}`)
})


app.get('/available', async (req, res) => {
	const {
	  dateOfBooking,
	  startTime,
	  endTime,
	  dayNameOfBooking,
	} = req.query as InsertBooking;
	const availableSitters = await getAvailableSitters(
	  dateOfBooking,
	  startTime,
	  endTime,
	  dayNameOfBooking,
	);
	res.json(availableSitters);
  });