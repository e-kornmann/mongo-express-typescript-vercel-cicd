import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../store/slices/authSlice';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import './auth.scss';
import './customradiobuttons.scss';
import { Link } from 'react-router-dom';
import AuthDetails from '../AuthDetails';
import { User, Kid } from '../../types';

const Signup = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [kid1Data, setKid1Data] = useState<Kid>({
    name: '',
    dateOfBirth: '',
    gender: ''
  });
    
  const [userData, setUserData] = useState<User>({
    firstName: '',
    lastName: '',
    parent: '',
    street: '',
    houseNumber: '',
    zipCode: '',
    userEmail: '',
    userPassword: '',
    confirmPassword: '',
    city: '',
    telephoneNumber: '',
    kids: [],
    notes: '',
  });

  const onKid1Change = (event: React.ChangeEvent<HTMLInputElement>): void  => {
    setKid1Data({ ...kid1Data, [event.target.name]: event.target.value  });
  }

  const [errors, setErrors] = useState({});

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const submitUserData = async (event: React.FormEvent) => {
    event.preventDefault();


    const consoleUser = {
      ...userData,
      kids: [kid1Data]
    };
    console.log(consoleUser);
    const validationErrors: { [key: string]: string } = {};

    if (!userData.firstName) {
      validationErrors.firstName = 'Please enter your first name';
    }

    if (!userData.lastName) {
      validationErrors.lastName = 'Please enter your last name';
    }
    
    if (!userData.parent) {
      validationErrors.parent = 'Please indicate your parental status';
    }
    
    if (!userData.zipCode) {
      validationErrors.zipCode = 'Please enter your postal code';
    }

    if (!userData.houseNumber) {
      validationErrors.houseNumber = 'Please enter your house number';
    }

    if (!userData.telephoneNumber.trim()) {
      validationErrors.telephoneNumber = 'Please enter your telephone number';
  
    if (!userData.userEmail) {
      validationErrors.userEmail = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(userData.userEmail)) {
      validationErrors.userEmail = 'Please enter a valid email';
    }

    if (!userData.userPassword) {
      validationErrors.userPassword = 'Please enter your password';
    } else if (userData.userPassword.length < 6) {
      validationErrors.userPassword = 'Password must be at least 6 characters long';
    }

    if (!userData.confirmPassword) {
      validationErrors.confirmPassword = 'Please confirm your password';
    } else if (userData.confirmPassword !== userData.userPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const newUser = {
          ...userData,
          kids: [kid1Data]
        };
        await dispatch(signUp(newUser));
        console.log('User created successfully!');
        navigate('/login');
      } catch (error) {
        console.error(error);
      }
    }
    }
  }

 
  return (
    <>
    <div className="graybg">
    <AuthDetails />
    <Header />
        <h2>Create account</h2>
      <form onSubmit={submitUserData} className="form__container">
      <fieldset>
      <legend>Personal details</legend>
      <input className="form__container-input stretch" type="text" name="firstName" value={userData.firstName} onChange={onInputChange} placeholder="First name" />
      <input className="form__container-input stretch" type="text" name="lastName" value={userData.lastName} onChange={onInputChange} placeholder="Last name" />
      <div className="radio-button-wrapper stretch">
      <div className="custom_radio">
      <input type="radio" id="father" value="father" checked={userData.parent === 'father'} onChange={onInputChange} name="parent" />
       <label htmlFor="father">Father</label>
      </div>
      <div className="custom_radio">
      <input type="radio" id="mother" value="mother" checked={userData.parent === 'mother'} onChange={onInputChange} name="parent" />
       <label htmlFor="mother">Mother</label>
      </div>
      <div className="custom_radio">
      <input type="radio" id="other" value="other" checked={userData.parent === 'other'} onChange={onInputChange} name="parent" />
       <label htmlFor="other">Other</label>
      </div>
      </div>
      </fieldset>
      <hr />
      <fieldset>
      <input className="form__container-input longleft" type="text" name="street" value={userData.street} onChange={onInputChange} placeholder="Street" />
      <input className="form__container-input shortright" type="text" name="houseNumber" value={userData.houseNumber} onChange={onInputChange} placeholder="no." />
      <input className="form__container-input shortleft" type="text" name="zipCode" value={userData.zipCode} onChange={onInputChange} placeholder="Postal code" />
      <input className="form__container-input longright" type="text" name="city" value={userData.city} onChange={onInputChange} placeholder="City" />
      <input className="form__container-input stretch" type="text" name="telephoneNumber" value={userData.telephoneNumber} onChange={onInputChange} placeholder="Telephone number" />
      </fieldset>

      <fieldset>
      <input className="form__container-input stretch" type="text" name="userEmail" value={userData.userEmail} onChange={onInputChange} placeholder="Email" />
      <input className="form__container-input stretch" type="password" name="userPassword" value={userData.userPassword} onChange={onInputChange} placeholder="Password" />
      <input className="form__container-input stretch" type="password" name="confirmPassword" value={userData.confirmPassword} onChange={onInputChange} placeholder="Confirm Password" />
      
      </fieldset>
      <hr />
      <fieldset>
      <legend>Your little one(s)</legend>
      <input className="form__container-input stretch" type="text" name="name" value={kid1Data.name} onChange={onKid1Change} placeholder="name" />
      <div className="custom_radio">
      <input type="radio" id="boy" value="boy" checked={kid1Data.gender === 'boy'} onChange={onKid1Change} name="gender" />
       <label htmlFor="boy">Boy</label>
      </div>
      <div className="custom_radio">
      <input type="radio" id="girl" value="girl" checked={kid1Data.gender === 'girl'} onChange={onKid1Change} name="gender" />
       <label htmlFor="girl">Girl</label>
      </div>
      
    
 




 {Object.keys(errors).length > 0 && (
  <div className="stretch">
    
      {Object.values(errors).map((error: unknown) => (
        <div className="form__container__error__container stretch" key={typeof error === 'string' ? error : undefined}>
        {typeof error === 'string' && error}
      </div>
      ))}
    
  </div>
)}
     



    <button type="submit" className="btn stretch">Submit</button>
    <h4 className="stretch">Already have an account? <Link to='/login' className="form__container-redirect">Please login</Link></h4>
    </fieldset>
  </form>
  </div>
  </>
  )
}



export default Signup;



