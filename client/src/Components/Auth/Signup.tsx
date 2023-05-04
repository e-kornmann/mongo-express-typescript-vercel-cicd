import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../store/slices/authSlice';
import background from "../../Assets/bg-green.svg";
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import "./auth.scss";
import { Link } from 'react-router-dom';

const Signup = () =>  {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    
    const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>): void  => {
      setAddress(event.target.value);
    };

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void  => {
      setName(event.target.value);
    };
  
    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void  => {
      setEmail(event.target.value);
    };
  
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setPassword(event.target.value);
    };
  
    const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void  => {
      setConfirmPassword(event.target.value);
    };

    const submitUserData = async (event: React.FormEvent) => {
      event.preventDefault();
      if (email === '' || password === '') {
        console.log('Please fill out all fields.');
        return;
      };
    
      if (password !== confirmPassword) {
        console.log('Passwords do not match.');
        return;
      };
      try {
        await dispatch(signUp({
          userName: name,
          userAddress: address,
          userEmail: email,
          userPassword: password,
        }));
        console.log('User created successfully!');
        navigate('/login');
      } catch (error) {
        console.error(error);
      };
    };


 
  return (
    <>
    <div className="islandaquabg" style={{ backgroundImage: `url(${background})` }}>
    <Header />
      <h2>Create Account</h2>
      <form onSubmit={submitUserData} className="form__container">
      <input
      className="form__container-input"
      type="text"
      value={name}
      onChange={onNameChange}
      placeholder="First name"
    ></input>
      <input
      className="form__container-input"
      type="text"
      value={address}
      onChange={onAddressChange}
      placeholder="Address"

    ></input>
      <input
      className="form__container-input"
      type="text"
      value={email}
      onChange={onEmailChange}
      placeholder="Enter your email"
    ></input>
    <input
      className="form__container-input"
      type="password"
      value={password}
      onChange={onPasswordChange}
      placeholder="Enter your password"
    ></input>
        <input
      className="form__container-input"
      type="password"
      value={confirmPassword}
      onChange={onConfirmPasswordChange}
      placeholder="Confirm password"
    ></input>
    <button type="submit" className="btn">Log in</button>
    <h4>Already have an account? <Link to='/login' className="form__container-redirect">Please login</Link></h4>
  </form>
  </div>
  </>
  )
}



export default Signup;