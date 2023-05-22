import React from 'react'
import logo from '../../Assets/tinysitters_logo.svg';
import Navbar from './Menu';
import "./header.scss";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import SummaryIconComponent from "../SvgComponents/SummaryIcon";
import { InsertedBooking, User } from "../../types";



const Header = () => {
  const user: User = useSelector((state: any) => state.user);
  const { userId } = user;
  
    
  const summaryInfo: InsertedBooking = useSelector((state: any) => state.booking);
  const { includedKids, dateOfBooking, sitterId } = summaryInfo;



  return (
    <>

    { (includedKids.length !== 0 && dateOfBooking !== "empty" && userId !== 'empty' && sitterId !== 'empty' ) && <SummaryIconComponent /> }    
    <Navbar />
    
    
    <Link to='/'>
          <img className="salt__header--logo" src={logo} alt="logo"  />
        </Link>
 
    

    
    </>
  )
}

export default Header;