import * as mongoDB from 'mongodb';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { User } from 'types';

import { AuthUser, InsertedBooking } from '../types/types';
import client from '../db/client';


const moment = extendMoment(Moment);


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
      { startTime: { $lte: sT }, endTime: { $gt: sT } }, // Booking starts within the time range
      { startTime: { $gte: sT, $lt: eT } }, // Booking starts before and ends within the time range
      { startTime: { $lte: sT }, endTime: { $gte: eT } },
      // Booking starts before and ends after the time range
    ],
  }).toArray();

  // Filter out sitters who have bookings that overlap with the specified time range
  const availableSitters = sitters.filter(sitter => {
    const sitterBookings = bookings.filter(booking => booking.sitterId === sitter.id);
    return sitterBookings.every(booking => {
      const bookingStart = moment(`${booking.dateOfBooking} ${booking.startTime}`, 'DD/MM/YYYY HH:mm');
      const bookingEnd = moment(`${booking.dateOfBooking} ${booking.endTime}`, 'DD/MM/YYYY HH:mm');
      const bookingRange = moment.range(bookingStart, bookingEnd);
      const startParam = moment(sT, 'HH:mm');
      const endParam = moment(sT, 'HH:mm');
      const bookingOverlaps = bookingRange.overlaps(moment.range(startParam, endParam));
      return !bookingOverlaps;
    });
  });
  return availableSitters;
};

const getAllSitters = async () => {
  await client.connect();
  const db: mongoDB.Db = client.db('saltdb');
  const col: mongoDB.Collection = db.collection('sitters');
  const sitter = col.find({});
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

const saveUser = async (user: User) => {
  await client.connect();
  const db: mongoDB.Db = client.db('saltdb');
  const col: mongoDB.Collection = db.collection('users');
  const addUser = await col.insertOne(user);
  return addUser
};

const getUser = async (email: string) => {
  await client.connect();
  const db: mongoDB.Db = client.db('saltdb');
  const col: mongoDB.Collection = db.collection('users');
  const user = await col.findOne(({ userEmail: email }) as AuthUser);
  return user
};

export {
  getAllSitters,
  getAvailableSitters,
  getSitterById,
  saveBookings,
  getUserBookings,
  saveUser,
  getUser
};
