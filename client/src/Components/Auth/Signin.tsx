import React, { useState } from 'react';
import { signIn } from '../../store/slices/authSlice';
import background from "../../Assets/bg-green.svg";
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import "./auth.scss";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '../../types';


const Signin = () =>  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
  
    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void  => {
      setEmail(event.target.value);
    };
  
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setPassword(event.target.value);
    };

    const submitUserData = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        dispatch(signIn({
          userEmail: email,
          userPassword: password,
        }) as unknown as AuthUser)
        .then(()=> navigate('/'));
      } catch (error) {
        console.error(error);
      };
    };

  return (
    <>
    <div className="islandaquabg" style={{ backgroundImage: `url(${ background })` }}>
    <Header />
    <h2>Log In to your Account</h2>
    <form onSubmit={submitUserData} className="form__container">
        <input
        className="form__container-input"
        type="email"
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
      <button type="submit" className="btn">Log in</button>
      <h4>No account yet? <Link to='/register' className="form__container-redirect">Create Account</Link></h4>
    </form>
  </div>

  </>
  )
 }


export default Signin;