import Header from '../Header/Header';

import './mybookings.scss';
import { useSelector } from 'react-redux';
import { InsertedBooking } from '../../types';
import api from "../../Api/api";
import { useEffect, useState } from 'react';
import LoadingSpinner from '../Sitters/Loading';

const MyBookings: React.FC = () => {
  const userId = useSelector((state: any)=> state.user.userId);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getBookings = async (userId: InsertedBooking) => {
      try {
        const response = await api.get(`api/bookings/${userId}`);
        console.log('response.data:', response.data);
        setBookings(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    
    getBookings(userId);
    console.log(`Use this userId for the api call: ${userId}`);
    console.log(`This is being mapped: `);
  }, [userId]);


 return (
    <>
      
      <div className="graybg">
        <Header />
    
        <div className="main__container">
        <h2 className="main__container--titles">My Bookings</h2>
 
        {isLoading ? (
    <LoadingSpinner />
  ) : bookings.length === 0 ? (
    <h3>You haven't made any bookings yet</h3>
  ) : (
    bookings.map((b: InsertedBooking) => {
          const { bookingId, dateOfBooking, dayNameOfBooking, startTime, endTime, sitterName, price } = b;
    
          return (
          <div key={ bookingId } className="main__container__mybookingstable">
            <div key={`${bookingId}-name`} className="main__container__mybookingstable--name">{ sitterName }</div>
            <div key={`${bookingId}-id`} className="main__container__mybookingstable--id">Booking id: {bookingId}</div>
            <div key={`${bookingId}-date`} className="main__container__mybookingstable--date">
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
