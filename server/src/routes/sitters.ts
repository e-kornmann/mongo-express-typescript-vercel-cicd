import Router from 'express';
import { getAllSitters, getAvailableSitters, getSitterById } from '../handlers';
import { InsertBooking } from '../types/types';

const sitters = Router();

sitters.get('/', async (_req, res) => {
  const sitter = await getAllSitters();
  res.json(sitter);
});

sitters.get('/available', async (req, res) => {
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

sitters.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sitter = await getSitterById(id);
  res.json(sitter);
});

export default sitters;
