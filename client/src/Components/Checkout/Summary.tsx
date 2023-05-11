import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Checkout from './Checkout';
import { User, SitterType, InsertedBooking, Kid } from '../../types';
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
  const { userEmail, kids } = user;
  const summaryInfo: InsertedBooking = useSelector((state: any) => state.booking);
  const { sitterName, dateOfBooking, dayNameOfBooking, startTime, endTime } = summaryInfo;


  
  
  const dispatch = useDispatch();

  const hourRate = 6;
  const startRate = 15;
  const extraKidRate = 3;
   
  const duration = (startTime: string, endTime: string): number => {
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');
    const duration = moment.duration(end.diff(start));
    const hourformat = duration.asHours();
    const fixed = parseFloat(hourformat.toFixed(1))      
     return fixed;
  };

    const durationInHours = duration(startTime, endTime);
    const durationPrice = hourRate*durationInHours;

    
    const kidAmountPrice = (kidarray: Kid[]): number => (kidarray.length >= 2) ? (kidarray.length - 2)  * (extraKidRate * durationInHours) : 0;
    const oneExtraChildRate = extraKidRate * durationInHours;
    


    const exPrice = startRate + durationPrice + kidAmountPrice(kids);
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
}, [navigate, dateOfBooking, sitterName]);


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
            <div className="main__container__summarytable--onethree">Starting price</div>
            <div className="main__container__summarytable--threefour">€ { startRate.toFixed(2) }</div>
          </div>
          <div className="main__container__summarytable--small">
            <div className="main__container__summarytable--span tariff">
              {`+  € ${hourRate} p/hour for:`}
            </div>
            { kids.map((val, i) => i < 2 && (                  
            <div className="main__container__summarytable--onethree" key={i}>{val.name}</div>))
            } 
            <div className="main__container__summarytable--threefour">€ { durationPrice.toFixed(2) }</div>


            { kids.length >= 2  && (
               
               <div className="main__container__summarytable--span extra--tariff">
                 {`+  € ${extraKidRate} p/hour for:`}
               </div>
               
            )}

            </div>
            { kids.map((val, i) => i > 1 && (   
                    <div className="main__container__summarytable--small">    
                     
                    <div className="main__container__summarytable--onethree" key={i}>{val.name}</div>
                    <div className="main__container__summarytable--threefour">€ { oneExtraChildRate.toFixed(2) }</div>
                    </div>))
                    
            } 
          
            
            
            
            <div className="main__container__summarytable">
            <div className="main__container__summarytable--calcprice">Amount excl. Btw</div>
            
            <div className="main__container__summarytable--calcprice-out">€ { formatPrice(exPrice) }</div>
            <div className="main__container__summarytable--onethree topspace">Total amount inc. 21% Btw</div>
            <div className="main__container__summarytable--totalprice-out topspace">€ { roundedPrice.toFixed(2) }</div>
          </div>
          <div className='extra--tariff'>For each additional child beyond two, there will be an extra charge of 4 euros per hour.</div>
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
