import Router from 'express';
import { saveBookings, getUserBookings } from '../handlers';
import { InsertedBooking } from '../types/types';

const bookings = Router();

bookings.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const userBookings = await getUserBookings(userId);
  res.json(userBookings);
});

bookings.post('/', async (req, res) => {
  const insertBooking: InsertedBooking = req.body;
  const booking = await saveBookings(insertBooking);
  res.json(booking);
});

export default bookings;
