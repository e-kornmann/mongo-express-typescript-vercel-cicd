import Header from '../Header/Header';
import AuthDetails from '../AuthDetails';
import './mybookings.scss';
import { useSelector } from 'react-redux';
import { InsertedBooking } from '../../types';
import api from "../../Api/api";
import { useEffect, useState } from 'react';

const MyBookings: React.FC = () => {
  const userId = useSelector((state: any)=> state.user.userId);
  const [bookings, setBookings] = useState<any[]>([]);
  
  useEffect(() => {
    const getBookings = async (userId: InsertedBooking) => {
      try { 
        const response = await api.get(`api/bookings/${userId}`);
        console.log("response.data:",response.data);
        if (response.data.length > 0) {
          setBookings(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    
    getBookings(userId);
    console.log(`Use this userId for the api call: ${userId}`);
    console.log(`This is being mapped: `);
  }, [userId]);


 return (
    <>
      <AuthDetails />
      <div className="graybg">
        <Header />
        <h2>My Bookings</h2>
        <div className="main__container">
        {bookings.length === 0 ? (
          <h3>You haven't any bookings yet</h3>
        ) : (
        bookings.map((b: InsertedBooking) => {
          const { bookingId, dateOfBooking, dayNameOfBooking, startTime, endTime, sitterName, price } = b;
    
          return (
          <div key={ bookingId } className="main__container__mybookingstable">
            <div key={`${dateOfBooking}-name`} className="main__container__mybookingstable--name">{ sitterName }</div>
            <div key={`${bookingId}-id`} className="main__container__mybookingstable--id">Booking id: {b.bookingId}</div>
            <div key={`${dateOfBooking}-date`} className="main__container__mybookingstable--date">
              { dayNameOfBooking }, { dateOfBooking }, { startTime } till { endTime } h
            </div>
            <div key={`${dateOfBooking}-price`} className="main__container__mybookingstable--price">€ { price }</div>
          </div>
          );
        }))}
       </div>
      </div>
    </>
  );
};

export default MyBookings;
