import React, { useState } from 'react';
import { signIn } from '../../store/slices/authSlice';
import background from "../../Assets/bg-green.svg";
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import "./auth.scss";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '../../types';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [error, setError] = useState('');

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const submitUserData = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await dispatch(signIn({ userEmail: email, userPassword: password }) as unknown as AuthUser);
      if (response.error) {
        const { message } = response.error;
        const errorMessage = message.includes('wrong') && message.includes('password')
          ? 'Wrong password, please try again'
          : message;
        setError(errorMessage);
      } else {
        navigate('/summary');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  }  
  

  return (
    <>
      <div className="islandaquabg" style={{ backgroundImage: `url(${background})` }}>
        <Header />
        <h2>Log In to your Account</h2>
    
        <form onSubmit={submitUserData} className="form__container">
          <input
            className="form__container-input"
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Enter your email"
          />
          <input
            className="form__container-input"
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Enter your password"
          />
           {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn">Log in</button>
          <h4>No account yet? <Link to='/register' className="form__container-redirect">Create Account</Link></h4>
        </form>
      </div>
    </>
  )
}

export default Signin;
