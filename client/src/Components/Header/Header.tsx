import React from 'react'
import logo from './tinysitters_logo.svg';
import "./header.scss";
import { Link } from 'react-router-dom';


const Header = () => {

  return (
    <>
    <Link to='/'>
    <img className="salt__header--logo" src={logo} alt="logo"/>
    </Link>
    </>
  )
}

export default Header