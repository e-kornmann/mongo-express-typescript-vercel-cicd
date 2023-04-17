import Router from 'express';
import { saveBookings, getUserBookings } from '../handlers';

const bookings = Router();

bookings.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const userBookings = await getUserBookings(userId);
  res.json(userBookings);
});

bookings.post('/', async (req, res) => {
  const InsertBooking = req.body;
  const booking = await saveBookings(InsertBooking);
  res.json(booking);
});

export default bookings;
