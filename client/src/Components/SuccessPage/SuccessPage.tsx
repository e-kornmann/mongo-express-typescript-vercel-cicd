import React, { useCallback, useEffect }  from 'react'
import './successPage.scss';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../Api/api';
import { clear } from '../../store/slices/bookingSlice';
import { AuthUser, InsertedBooking } from '../../types';

const SuccessPage: React.FC = () => {
  

  const booking: InsertedBooking = useSelector((state: any) => state.booking);
  const user: AuthUser = useSelector((state: any) => state.user);
  const { userId, userEmail } = user;


  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const uniqueId = uuid();
  const small_id = uniqueId.slice(0, 8);
  const currentYear = new Date().getFullYear();
  const bookingId = `${currentYear}${small_id}`;



  const completedBooking: InsertedBooking = {
    ...booking, 
    bookingId: bookingId,
    userId: userId,
    userEmail: userEmail,
  }

    
  const sendEmailFunction = useCallback(async () => {
    await api
      .post('api/sitters/send-email', { email: userEmail, bookingId: bookingId })
      .then((response) => {
        console.log('Response:', response.data);
        setTimeout(() => navigate('/'), 10000); // add timeout here
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [userEmail, bookingId, navigate]);

 
  
  useEffect(() => {
    api
      .post('api/bookings', completedBooking)
      .then(() => sendEmailFunction())
      .then(() => {
      dispatch(clear())
      setTimeout(() => navigate("/"), 4000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
  

console.log(3)
  return (
    <>
      <h1>Payment Successful</h1>
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <div className="successPage">
        <h3>Thank you for your booking!</h3>
        <p>Your order id = { bookingId }. <br/>A confirmation email is sent to { userEmail }.</p>
      </div>
    </>
  )
}

export default SuccessPage;
