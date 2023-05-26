import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Checkout from './Checkout';
import { User, InsertedBooking, Kid } from '../../types';

import { Link, useNavigate } from 'react-router-dom';
import { setKidsToSit, setPrice } from '../../store/slices/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import '../SvgComponents/icons.scss';
import FakePayment from '../Popups/FakePayment';

const Summary: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: User = useSelector((state: any) => state.user);
  const summaryInfo: InsertedBooking = useSelector((state: any) => state.booking);
  const { userEmail, kids = [] } = user; // Provide a default empty array for kids
  const { sitterName, dateOfBooking, dayNameOfBooking, startTime, endTime } = summaryInfo;
 
  const [includedKids, setIncludedKids] = useState<Kid[]>(kids);
  const [newKidArray, setNewKidArray] = useState<Kid[]>(includedKids);


  useEffect(() => {
    if (userEmail === "empty") {
      navigate('/login');
    } 
    if (dateOfBooking === "empty") {
      navigate('/calendar');
    }
    if (sitterName === "empty" && dateOfBooking !== "empty") {
      navigate('/sitters');
    }
    if (includedKids.length === 0) {
      navigate('/selectedsitter');
    }
  }, [userEmail, dateOfBooking, sitterName, includedKids, navigate]);


  useEffect(() => {
  dispatch(setKidsToSit({ includedKids } as InsertedBooking ));
}, [dispatch, includedKids]);

  const handleClickEvent = (kid: Kid) => {
    if (includedKids.includes(kid)) {
      // Kid is included, exclude it
      setIncludedKids(prevIncludedKids => prevIncludedKids.filter((k) => k !== kid));
      // Display full array always and put excluded kids at the end of the array
      setNewKidArray(prevNewKidArray => [...prevNewKidArray.filter((k) => k !== kid), kid]);
    } else {
      // Kid is not included, include it
      setIncludedKids(prevIncludedKids => [kid, ...prevIncludedKids]);
      // Display full array and put at the beginning of the array
      setNewKidArray(prevNewKidArray => {
        const updatedNewKidArray = prevNewKidArray.filter((k) => k !== kid);
        updatedNewKidArray.unshift(kid);
        return updatedNewKidArray;
      });
    }
  };

  
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
  const durationPrice = hourRate * durationInHours;
  const kidAmountPrice = (kidarray: Kid[]): number => includedKids.length >= 2 ? (includedKids.length - 2) * (extraKidRate * durationInHours) : 0;
  const oneExtraChildRate = extraKidRate * durationInHours;
  const exPrice = startRate + durationPrice + kidAmountPrice(includedKids);
  const incPrice = (exPrice / 100) * 121;
  const formatHalfHour = (duration: number) => {
    if (duration % 1 === 0.5) {
      return Math.floor(duration) + "½";
    } else {
      return duration.toString();
    }
  }
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
      <FakePayment sitterName={sitterName!} />
      <div className="graybg">
        <Header />
        <div className="main-container">
        <h2 className="main-container--titles">Proforma receipt</h2>
          <div className="main-container__summarytable">
            <div className="main-container__summarytable--name">{sitterName}</div>
            <div className="main-container__summarytable--date">
              {dayNameOfBooking}, {dateOfBooking}, {startTime} till {endTime} h
            </div>
            <div className="main-container__summarytable--duration">{formatHalfHour(durationInHours)} hours</div>
            <div className="main-container__summarytable--onethree start-price">Starting price</div>
            <div className="main-container__summarytable--threefour start-price">€ {startRate.toFixed(2)}</div>
          </div>
          <div className="main-container__summarytable--small">
            <div className="main-container__summarytable--span tariff label">
              {`€ ${hourRate} p/hour for:`}
            </div>
            {newKidArray.map((kid, i) => i <= 1 && (
              <div
                className={`main-container__summarytable--onethree ${!includedKids.includes(kid) ? 'excluded' : 'included'}`}
                key={i}
                onClick={() => handleClickEvent(kid)}
              >
                {kid.name}
              </div>
            ))}
          <div className="main-container__summarytable--threefour">€ {durationPrice.toFixed(2)}</div>
          </div>

        {kids.length > 2 && (
          <div className="main-container__summarytable">
          <div className="main-container__summarytable--span extra--tariff label">
            {`€ ${extraKidRate} p/hour for:`}
          </div>
          </div>
        )}

        {newKidArray.map((kid, i) => i > 1 && (
          <div className="main-container__summarytable--extrasmall">
            <div
              className={`main-container__summarytable--onethree ${!includedKids.includes(kid) ? 'excluded' : 'included'}`}
              key={i}
              onClick={() => handleClickEvent(kid)}
            >
              {kid.name}
            </div>

            <div
              className={`main-container__summarytable--threefour ${!includedKids.includes(kid) ? 'hide' : ''}`}>
              € {oneExtraChildRate.toFixed(2)}
            </div>
          </div>))
        }
      
      <div className="main-container__summarytable">
        <div className='main-container__summarytable--span extra--tariff tarif-note'>If you have more than two children, there will be a small additional charge of € {extraKidRate.toFixed(2)} per hour for each extra child.</div>
        </div>
        <div className="main-container__summarytable" style={{ paddingBottom: '30px', paddingTop: '20px' }}>
          <div className="main-container__summarytable--calcprice">Amount excl. Btw</div>
          <div className="main-container__summarytable--calcprice-out">€ {exPrice.toFixed(2)}</div>
        <div className="main-container__summarytable--onethree topspace">Total amount inc. 21% Btw</div>
        <div className="main-container__summarytable--totalprice-out topspace">€ {incPrice.toFixed(2)}</div>
      </div>
      <div className="main-container--button-container">
        <Link to="/selectedsitter" className="btn--back" style={{ textDecoration: 'none' }}>
          Back
        </Link>
        <div onClick={() => dispatch(setPrice(
          { 
            price: parseFloat(incPrice.toFixed(2)),
          } as InsertedBooking))}><Checkout />
        </div>
      </div>
      </div>
    </div >
    </>
  );
};

export default Summary;
