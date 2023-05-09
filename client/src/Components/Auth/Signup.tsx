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
import { 
  validateFirstName, 
  validateLastName, 
  validateParent, 
  validateStreet,
  validateHouseNumber,
  validateZipCode,
  validateCity,
  validateTelephoneNumber,
  validateKids
 } from './formValidation';

const Signup = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

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
      kids: '',
      notes: '',
    });

    const [kids, setKids] = useState<Kid[]>([{name: '', dateOfBirth: '', gender:''}]);

    const addKid = () => {
      setKids([ ...kids, {name: '', dateOfBirth: '', gender:''} ])
    }
  
    const handleKidFieldsChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      i: number,
      key: keyof Kid
    ) => {
      const { value } = event.target;
      const updatedKids = [...kids];
      updatedKids[i][key] = value;
      setKids(updatedKids);
    };
  const handleKidFieldDelete=(i:number)=>{
      const deleteVal = [...kids]
      deleteVal.splice(i,1)
      setKids(deleteVal)
  }
  
  const [errors, setErrors] = useState({});

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors: { [key: string]: string | undefined } = {};

    validationErrors.firstName = validateFirstName(userData.firstName);
    validationErrors.lastName = validateLastName(userData.lastName);
    validationErrors.parent = validateParent(userData.parent);
    validationErrors.street = validateStreet(userData.street);
    validationErrors.houseNumber = validateHouseNumber(userData.houseNumber);
    validationErrors.zipCode = validateZipCode(userData.zipCode);
    validationErrors.city = validateCity(userData.city);
    validationErrors.telephoneNumber = validateTelephoneNumber(userData.telephoneNumber);
    validationErrors.kids = validateKids(kids);

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

    const filteredValidationErrors = Object.fromEntries(
      Object.entries(errors).filter(([key, value]) => value !== undefined)
    );
 
    if (Object.keys(filteredValidationErrors).length === 0)
      try {
        const userDataWithKids = { ...userData, kids: JSON.stringify(kids) };
        console.log(userDataWithKids);
        await dispatch(signUp(userDataWithKids));
        console.log('User created successfully!');
        navigate('/login');
      } catch (error) {
        console.error(error);
      }
    }
    
   

 
  return (
    <>
    <div className="graybg">
    <AuthDetails />
    <Header />
        <h2>Create account</h2>
      <form onSubmit={submitForm} className="form__container">
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
     
      <legend>Your little one(s)</legend>

  
      {
        kids.map((val,i) =>
        <fieldset key={i}>
            <input className="form__container-input stretch" type="text" name="name" value={val.name} onChange={(e) => handleKidFieldsChange(e, i, 'name')}  placeholder="Name" />
            <input className="form__container-input halfleft" type="date" name="dateOfBirth" value={val.dateOfBirth} onChange={(e) => handleKidFieldsChange(e, i, 'dateOfBirth')} />
            <div className="radio-button-wrapper foursix">
              <div className="custom_radio">
                <input type="radio" id={`boy${i + 1}`} value="boy" checked={val.gender === 'boy'} onChange={(e) => handleKidFieldsChange(e, i, 'gender')} />
                <label htmlFor={`boy${i + 1}`}>Boy</label>
              </div>
              <div className="custom_radio">
                <input type="radio" id={`girl${i + 1}`} value="girl" checked={val.gender === 'girl'} onChange={(e) => handleKidFieldsChange(e, i, 'gender')} />
                <label htmlFor={`girl${i + 1}`}>Girl</label>
              </div>
            </div>
          <button className="seveneight" onClick={()=>handleKidFieldDelete(i)}>Delete</button>               
        </fieldset>
        )
      }
          <button className="seveneight" type="button" onClick={addKid}>Add</button>
           


{Object.keys(errors).length > 0 && (
  <div className="stretch">
    {Object.values<string | undefined>(errors).map((error, index) => {
      if (typeof error === 'string') {
        return (
          <div className="form__container__error__container stretch" key={index}>
            {error}
          </div>
        );
      }
      return null;
    })}
  </div>
)}

     
    <button type="submit" className="btn stretch">Submit</button>
    <h4 className="stretch">Already have an account? <Link to='/login' className="form__container-redirect">Please login</Link></h4>

  </form>
  </div>
  </>
  );
      

}

export default Signup;


  
