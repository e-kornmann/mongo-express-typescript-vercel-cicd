import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../Header/Header";
import '../Auth/auth.scss';
import moment from 'moment';
import { SitterType } from "../../types";
import './sitters.scss';
import './selectedSitter.scss';
import AuthDetails from '../AuthDetails';
import { useSelector } from 'react-redux';





const SelectedSitter: React.FC = () => {
  const sitterInfo: SitterType = useSelector((state: any) => state.sitter);
  const { name, image, dateOfBirth, gender, description, availability } = sitterInfo;


  const dob = moment(dateOfBirth, 'DD/MM/YYYY');
  const age = moment().diff(dob, 'years');



  return (
    <>
      <AuthDetails />
      <div className='graybg'>
        <Header />
        <br />

        <div className="main__container">
 
            <div className="maincontainer__sitterinfo--image">
            <img className="availablessitters__card__sitterimg--large" src={image} alt={name} />
              
            </div>
            <div className="maincontainer__sitterinfo">
            <div className="maincontainer__sitterinfo--name">{name}</div>
                        <div className="maincontainer__sitterinfo--gender">Age: {age}<br />{gender}</div>
            <div className="maincontainer__sitterinfo--description">{description}</div>
          </div>
        
          <div className="day__container" style={{ paddingBottom: '10px' }}>
          {name} is available on:
        </div>
         <div className="day__container">
          <div className={`day ${availability.includes('Monday') ? 'available' : 'unavailable'}`}>Mon</div>
          <div className={`day ${availability.includes('Tuesday') ? 'available' : 'unavailable'}`}>Tue</div>
          <div className={`day ${availability.includes('Wednesday') ? 'available' : 'unavailable'}`}>Wed</div>
          <div className={`day ${availability.includes('Thursday') ? 'available' : 'unavailable'}`}>Thu</div>
          <div className={`day ${availability.includes('Friday') ? 'available' : 'unavailable'}`}>Fri</div>
          <div className={`day ${availability.includes('Saturday') ? 'available' : 'unavailable'}`}>Sat</div>
          <div className={`day ${availability.includes('Sunday') ? 'available' : 'unavailable'}`}>Sun</div>
   

        
          <div className="main__container--button__container" style={{ paddingTop: '20px' }}>
            <Link to='/sitters' className="btn--back" style={{ textDecoration: 'none' }}>Back</Link>
            <Link to='/summary' className="btn">Next</Link>
          </div>
        </div>
      </div>
           </div>


    </>
  );
};

export default SelectedSitter;

