import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import background from "../../Assets/bg-twirls.svg";
import Header from "../Header/Header";
import '../Auth/auth.scss';
import moment from 'moment';
import { SitterType } from "../../types";
import './sitters.scss';
import './selectedSitter.scss';
import AuthDetails from '../AuthDetails';




const SelectedSitter: React.FC = (props) => {
  const location = useLocation();
  const propsData = location.state;
  const { name, description, dateOfBirth, image, gender, availability } = propsData.sitter as SitterType;
  const dob = moment(dateOfBirth, 'DD/MM/YYYY');
  const age = moment().diff(dob, 'years');
  

  return (
    <>
      <AuthDetails />
      <div className="islandaquabg" style={{ backgroundImage: `url(${background})` }}>
        <Header />
       <br />
       
       <div className="main__container">
      
        <div className="maincontainer__sitterinfo">
          <div className="maincontainer__sitterinfo--image">
            <img className="availablessitters__card__sitterimg--large" src={ image } alt={ name } />
          </div>
          <div className="maincontainer__sitterinfo--name">{ name }</div>
          <div className="maincontainer__sitterinfo--age">{ age }y</div>
          <div className="maincontainer__sitterinfo--gender">{ gender }</div>
          <div className="maincontainer__sitterinfo--description">{ description }</div>
          
        </div>
        <p>Availability: {availability.join(', ')}</p>
      </div>

      <div className="main__container--button__container">
        <Link to='/sitters' className="btn--back" style={{textDecoration: 'none'}}>Back</Link>
        <Link to='/summary' className="btn" state= { propsData }>Next</Link>
      </div>
      </div>
    </>
  );
};

export default SelectedSitter;
