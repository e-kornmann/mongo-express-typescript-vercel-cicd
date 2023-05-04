import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Checkout from './Checkout';
import { User, SitterType, InsertedBooking } from '../../types';
import AuthDetails from '../AuthDetails';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setPrice } from '../../store/slices/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const Summary: React.FC = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const propsData: SitterType = location.state;

  const user: User = useSelector((state: any) => state.user);
  const { userEmail } = user;
  const summaryInfo: InsertedBooking = useSelector((state: any) => state.booking);
  const { sitterName, dateOfBooking, dayNameOfBooking, startTime, endTime } = summaryInfo;
  
  const dispatch = useDispatch();

  const hourRate = 12;
  const startRate = 20;
   
  const duration = (startTime: string, endTime: string): number => {
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');
    const duration = moment.duration(end.diff(start));
    const hourformat = duration.asHours();
    const fixed = parseFloat(hourformat.toFixed(1))      
     return fixed;
  };

    const durationInHours = duration(startTime, endTime);
    const exPrice = startRate + (hourRate*durationInHours);
    const incPrice = (exPrice/100)*121;
    const formatPrice = (price: number) => {
      return parseFloat(price.toFixed(2));
    };
    const roundedPrice = formatPrice(incPrice);
        
if (userEmail === "empty") {
  navigate('/login');
} 
useEffect(() => {
  if (dateOfBooking === "empty") {
    navigate('/calendar');
  }
  if (sitterName === "empty" && dateOfBooking !== "empty")
    navigate('/sitters')
}, [navigate, dateOfBooking,sitterName]);


 return (
    <>
      <AuthDetails />
      <div className="graybg">
        <Header />
        <div className="main__container">
          <div className="main__container__summarytable">
            <div className="main__container__summarytable--name">{ sitterName }</div>
            <div className="main__container__summarytable--date">
            { dayNameOfBooking }, { dateOfBooking }, { startTime } till { endTime } h
            </div>
            <div className="main__container__summarytable--duration">{ durationInHours } hours</div>
            <div className="main__container__summarytable--priceinfo">
              {`Starting price € ${startRate} +  € ${hourRate} p/hour`}
            </div>
            <div className="main__container__summarytable--calcprice">Amount excl. Btw</div>
            <div className="main__container__summarytable--calcprice-out">€ { formatPrice(exPrice) }</div>
            <div className="main__container__summarytable--totalprice">Total amount inc. 21% Btw</div>
            <div className="main__container__summarytable--totalprice-out">€ { roundedPrice }</div>
          </div>
          <div className="main__container--button__container">
            <Link to="/selectedsitter" className="btn--back" state={ propsData } style={{ textDecoration: 'none' }}>
              Back
            </Link>
          <div onClick={()=> dispatch(setPrice(
              {
               price: roundedPrice,
              } as InsertedBooking))}><Checkout/>
            </div>
          </div>
      </div>
      </div>
    </>
  );
};

export default Summary;