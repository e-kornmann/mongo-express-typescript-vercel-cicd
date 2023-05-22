import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, setUser } from '../../store/slices/authSlice';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import './auth.scss';
import './customradiobuttons.scss';
import { Link } from 'react-router-dom';
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
import AddIcon from '../SvgComponents/AddIcon';
import DeleteIcon from '../SvgComponents/DeleteIcon';


const Signup = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  
  const [kids, setKids] = useState<Kid[]>([{ name: '', dateOfBirth: '', gender: '' }]);


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

  const addKid = () => {
    setKids([...kids, { name: '', dateOfBirth: '', gender: '' }])
  }
  const handleKidFieldsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number,
    key: keyof Kid
  ) => {
    const { value } = event.target;
    const updatedKids = [...kids];
    updatedKids[i] = { ...updatedKids[i], [key]: value }; // Update the specific kid object
    setKids(updatedKids);
    setUserData({ ...userData, kids: updatedKids });
  };

  const handleKidFieldDelete = (i: number) => {
    const deleteVal = [...kids]
    deleteVal.splice(i, 1)
    setKids(deleteVal)
    setUserData({ ...userData, kids: deleteVal });
  }

  
  const [errors, setErrors] = useState({});

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
      Object.entries(validationErrors).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredValidationErrors).length === 0) {
      try {
        await dispatch(signUp(userData));
        dispatch(setUser(userData));
        console.log('User created successfully!');
        navigate('/login');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="graybg">
        <Header />
        <form onSubmit={submitForm} className="form__container">
        <h2 className="main__container--titles">Create account</h2>
          <fieldset className="formgrid">
            <legend>Personal details</legend>
            <input className="form__container-input oneeleven" type="text" name="firstName" value={userData.firstName} onChange={onInputChange} placeholder="First name" />
            <input className="form__container-input oneeleven" type="text" name="lastName" value={userData.lastName} onChange={onInputChange} placeholder="Last name" />
            <div className="radio-button-wrapper oneeleven">
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
            <hr className="oneeleven" />
          </fieldset>
          <fieldset className="formgrid">
            <input className="form__container-input street" type="text" name="street" value={userData.street} onChange={onInputChange} placeholder="Street" />
            <input className="form__container-input housenumber" type="text" name="houseNumber" value={userData.houseNumber} onChange={onInputChange} placeholder="no." />
            <input className="form__container-input zipcode" type="text" name="zipCode" value={userData.zipCode} onChange={onInputChange} placeholder="Postal code" />
            <input className="form__container-input place" type="text" name="city" value={userData.city} onChange={onInputChange} placeholder="City" />
            <input className="form__container-input oneeleven" type="text" name="telephoneNumber" value={userData.telephoneNumber} onChange={onInputChange} placeholder="Telephone number" />
          </fieldset>

          <fieldset className="formgrid">
            <input className="form__container-input oneeleven" type="text" name="userEmail" value={userData.userEmail} onChange={onInputChange} placeholder="Email" />
            <input className="form__container-input oneeleven" type="password" name="userPassword" value={userData.userPassword} onChange={onInputChange} placeholder="Password" />
            <input className="form__container-input oneeleven" type="password" name="confirmPassword" value={userData.confirmPassword} onChange={onInputChange} placeholder="Confirm Password" />
            <hr className="oneeleven" />
          </fieldset>

          <fieldset>
            <legend>Your little one(s)</legend>

            {
              kids.map((val, i) =>
                <div className="formgrid" key={i}>
                  <input key={`kidname${i + 1}`} autoComplete='none' className="form__container-input oneeleven" type="text" name="name" value={val.name} onChange={(e) => handleKidFieldsChange(e, i, 'name')} placeholder="Name" />
                  <input autoComplete='none' className="form__container-input dateofbirth" type="date" name="dateOfBirth" value={val.dateOfBirth} onChange={(e) => handleKidFieldsChange(e, i, 'dateOfBirth')} />
                  <div className="radio-button-wrapper">
                    <div className="custom_radio">
                      <input type="radio" id={`boy${i + 1}`} value="boy" checked={val.gender === 'boy'} onChange={(e) => handleKidFieldsChange(e, i, 'gender')} />
                      <label htmlFor={`boy${i + 1}`}>Boy</label>
                    </div>
                    <div className="custom_radio">
                      <input type="radio" id={`girl${i + 1}`} value="girl" checked={val.gender === 'girl'} onChange={(e) => handleKidFieldsChange(e, i, 'gender')} />
                      <label htmlFor={`girl${i + 1}`}>Girl</label>
                    </div>
                  </div>

                  {i === kids.length - 1 && kids.length > 1 ? (
                    <div className="icon eightnine" onClick={() => handleKidFieldDelete(i)}>
                      <DeleteIcon />
                    </div>
                  ) : i !== kids.length - 1 ? (
                    <div className="icon nineten" onClick={() => handleKidFieldDelete(i)}>

                      <DeleteIcon />
                    </div>
                  ) : null}
                  {i === kids.length - 1 ? (
                    <div className="icon nineten" onClick={addKid}><AddIcon /></div>

                  ) : null}
                  <hr className='oneeleven' />
                </div>


              )
            }
          </fieldset>
          <fieldset>
            <legend>Notes:</legend>

            <textarea className="form__container-textfieldinput oneeleven" name="notes" value={userData.notes} onChange={onInputChange} />
          </fieldset>


          {Object.keys(errors).length > 0 && (
            <div className="oneeleven">
              {Object.values<string | undefined>(errors).map((error, index) => {
                if (typeof error === 'string') {
                  return (
                    <div className="form__container__error__container oneeleven" key={index}>
                      {error}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}


          <button type="submit" className="btn oneeleven">Submit</button>
          <h4 className="oneeleven">Already have an account? <Link to='/login' className="form__container-redirect">Please login</Link></h4>

        </form>
      </div>
    </>
  );
}

export default Signup;
