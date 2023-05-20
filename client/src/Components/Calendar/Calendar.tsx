import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Header from '../Header/Header';
import background from '../../Assets/bg.svg';
import 'react-datepicker/dist/react-datepicker.css';
import './slider.scss'
import './calendar.scss';
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import { subDays, addMonths } from 'date-fns';
import moment from 'moment';
import { Link } from 'react-router-dom';
import AuthDetails from '../AuthDetails';
import { InsertedBooking } from '../../types';
import { useDispatch } from 'react-redux';
import { setBookingData } from '../../store/slices/bookingSlice';


import TimeRangeSlider from './TimeRangeSlider';

export default function Calendar() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date().setDate(new Date().getDate() + 1), 0), 12));


  
const [startTime, setStartTime] = useState("08:00");
const [endTime, setEndTime] = useState("18:00");
  
  function handleChange(value: Date | null) {
    if (value) {
      setStartDate(value);
    }
  }

  function handleTimeChange(start: string, end: string) {
    setStartTime(start);
    setEndTime(end);
  }

  const dateOfBooking = moment(startDate).format('DD-MM-YYYY');
  const dayNameOfBooking = moment(startDate).format('dddd');
  

  return (
    <>  
      <AuthDetails />
      <div className='mainpage' style={{ backgroundImage: `url(${background})` }}>
        
        <Header />
        <h2>Handpick a date and select your time-range for your plans.</h2>
        <div className='picker'>
       
          <DatePicker
            selected={startDate}
            startDate={startDate}
            onChange={(value) => handleChange(value)}
            minDate={new Date()}
            maxDate={addMonths(new Date(), 3)}
            excludeDates={[new Date(), subDays(new Date(), 0)]}
            placeholderText="Select a date other than today or yesterday"
            showDisabledMonthNavigation
            inline
          />
          <div className='sub-caption'>
            {dayNameOfBooking}, {dateOfBooking}</div>
          <TimeRangeSlider onTimeChange={handleTimeChange} />

      
          <Link to="/sitters" onClick={() => {
            dispatch(setBookingData({   
              dateOfBooking: dateOfBooking,
              dayNameOfBooking: dayNameOfBooking,
              startTime: startTime,
              endTime: endTime,
            } as InsertedBooking));
          }} className='lonely-next-btn'>Next</Link>       
           
        </div>
      </div>
    </>
  );
}
