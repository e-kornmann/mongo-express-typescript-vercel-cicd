import * as mongoDB from 'mongodb';
import { InsertedBooking } from '../types/types';
import client from '../db/client';

const getAvailableSitters = async (dOfB: string, sT: string, eT: string, dNOfB: string) => {
  await client.connect();
  const db: mongoDB.Db = client.db('saltdb');
  const col: mongoDB.Collection = db.collection('sitters');

  // Find all sitters with the specified availability on the day of the booking
  const sitters = await col.find({
    availability: dNOfB,
  }).toArray();

  // Find all bookings that overlap with the specified time range
  const bookings = await db.collection('bookings').find({
    dateOfBooking: dOfB,
    $or: [
      { startTime: { $lt: eT }, endTime: { $gt: sT } }, // Booking overlaps with the time range
      { startTime: { $lte: sT }, endTime: { $gte: eT } }, // Booking includes the time range
    ],
  }).toArray();

  // Filter out sitters who have bookings that overlap with the specified time range
  const availableSitters = sitters.filter(sitter => {
    const sitterBookings = bookings.filter(booking => booking.sitterId === sitter.id);
    return sitterBookings.length === 0;
  });

  return availableSitters;
};

const getAllSitters = async () => {
  await client.connect();
  const db: mongoDB.Db = client.db('saltdb');
  const col: mongoDB.Collection = db.collection('sitters');
  const sitter = (await col.find({}).toArray())
  return sitter;
};

const getSitterById = async (id:string) => {
  await client.connect();
  const db: mongoDB.Db = client.db('saltdb');
  const col: mongoDB.Collection = db.collection('sitters');
  const sitter = await col.findOne({ id });
  return sitter;
};

const saveBookings = async (booking: InsertedBooking) => {
  await client.connect();
  const db: mongoDB.Db = client.db('saltdb');
  const col: mongoDB.Collection = db.collection('bookings');
  const addBooking = await col.insertOne(booking);
  console.log('created booking', addBooking);
  return addBooking;
};

const getUserBookings = async (id: string) => {
  await client.connect();
  const db: mongoDB.Db = client.db('saltdb');
  const col: mongoDB.Collection = db.collection('bookings');
  const allBookings = await col.find(({ userId: id }) as InsertedBooking).toArray();
  return allBookings;
};

export {
  getAllSitters,
  getAvailableSitters,
  getSitterById,
  saveBookings,
  getUserBookings,
};
