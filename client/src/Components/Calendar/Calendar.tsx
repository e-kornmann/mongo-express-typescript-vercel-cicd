import React, { useState, Fragment, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import Header from '../Header/Header';
import background from '../../Assets/bg.svg';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.scss';
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import { subDays, addMonths } from 'date-fns';
import moment from 'moment';
import TimeRange from 'react-time-range';
import { Link } from 'react-router-dom';
import AuthDetails from '../AuthDetails';
import { InsertedBooking, Reservation } from '../../types';
import { useDispatch } from 'react-redux';
import { setBookingData } from '../../store/slices/bookingSlice';

export default function Calendar() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 0), 12));
  

  function handleChange(value: Date | null) {
    if (value) {
      setStartDate(value);
    }
  }

  const pickupTimeEarliest = moment()
    .startOf('day')
    .add(30, 'minutes')
    .format();
  const pickupTimeLatest = moment()
    .endOf('day')
    .subtract(30, 'minutes')
    .format();

const [startTime, setStartTime] = useState(pickupTimeEarliest);
const [endTime, setEndTime] = useState(pickupTimeLatest);
const start = (event: { startTime: SetStateAction<string>; }) => setStartTime(event.startTime);
const end = (event: { endTime: SetStateAction<string>; }) => setEndTime(event.endTime);


console.log(`Starttijd ${startTime}`)
console.log(`Eindtijd ${endTime}`)
console.log(`Startdatum ${startDate}`)

const selectedDate: Reservation = { 
  dateOfBooking: moment(startDate).format('DD-MM-YYYY'),
  startTime: moment(startTime).format('HH:mm'),
  endTime: moment(endTime).format('HH:mm'),
  dayNameOfBooking: moment(startDate).format('dddd'),
};

return (
    <>  
       <AuthDetails />
       <div className='mainpage' style={{ backgroundImage: `url(${background})` }}>
        <Header />
        <h2> DatePicker</h2>
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
          <Fragment>

          <TimeRange
            onStartTimeChange={start}
            onEndTimeChange={end}
            startMoment={startTime}
            endMoment={endTime}
            minuteIncrement={30}
            startLabel={null}
            endLabel={null}
            use24Hours={true}
          />
         </Fragment>

         <Link to="/sitters" state={selectedDate} onClick={() => {
          dispatch(setBookingData({   
            dateOfBooking: selectedDate.dateOfBooking,
            dayNameOfBooking: selectedDate.dayNameOfBooking,
            startTime: selectedDate.startTime,
            endTime: selectedDate.endTime,
          } as InsertedBooking))
        }} className='lonely-next-btn'>Next</Link>       
       </div>
      </div>
    </>
  );
}
