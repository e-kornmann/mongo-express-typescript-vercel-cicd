import React, { useState } from 'react';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';

import { Kid, User } from '../../types';
import { setUser, updateUser } from '../../store/slices/authSlice'
import {
  validateFirstName,
  validateLastName,
  validateParent, validateStreet, validateHouseNumber, validateZipCode, validateCity, validateTelephoneNumber, validateKids
} from './formValidation';
import { useNavigate } from 'react-router-dom';
import AddIcon from '../SvgComponents/AddIcon';
import DeleteIcon from '../SvgComponents/DeleteIcon';


const UpdateProfile = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const user: User = useSelector((state: any) => state.user);
  const { userId, userEmail, firstName, lastName, parent, street, houseNumber, zipCode, city, telephoneNumber, kids, notes } = user;

  const [newKids, setNewKids] = useState<Kid[]>(kids);

  const [userData, setUserData] = useState<User>({
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    parent: parent,
    street: street,
    houseNumber: houseNumber,
    zipCode: zipCode,
    city: city,
    telephoneNumber: telephoneNumber,
    kids: newKids,
    notes: notes,
  });


  const addKid = () => {
    setNewKids([...newKids, { name: '', dateOfBirth: '', gender: '' }])
    setUserData({ ...userData, kids: newKids });
  }

  const handleKidFieldsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number,
    key: keyof Kid
  ) => {
    const { value } = event.target;
    const updatedKids = [...newKids];
    updatedKids[i] = { ...updatedKids[i],
      [key]: value,
    };
    setNewKids(updatedKids);
    setUserData({ ...userData, kids: updatedKids });
  };
  const handleKidFieldDelete = (i: number) => {
    const deleteVal = [...newKids]
    deleteVal.splice(i, 1)
    setNewKids(deleteVal)
    setUserData({ ...userData, kids: deleteVal });
  }

  const [errors, setErrors] = useState({});

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleUpdate = async (event: React.FormEvent) => {
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
    validationErrors.kids = validateKids(newKids);


    setErrors(validationErrors);

    const filteredValidationErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([key, value]) => value !== undefined)
    );



    if (Object.keys(filteredValidationErrors).length === 0) {
      try {
        console.log(`This supposed to be dispatched ${userData}`);
        await dispatch(updateUser(userData));
        dispatch(setUser(userData));
        console.log('User updated!');
        navigate('/success/update');
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className="graybg">
        
        <Header />
          <form onSubmit={handleUpdate} className="form-container">
          <h2 className="main-container--titles">Update Profile</h2>
          <fieldset className="formgrid">
            <legend>Personal details</legend>
            <div className="email light-purple">Email:<br /><span className="asphalt">{userEmail}</span></div>
            <div className="userid light-purple">UserId<br /><span className="asphalt">{userId}</span></div>
            <hr className="oneeleven" />

            <input className="form-container-input oneeleven" type="text" name="firstName" value={userData.firstName} onChange={onInputChange} placeholder="First name" />
            <input className="form-container-input oneeleven" type="text" name="lastName" value={userData.lastName} onChange={onInputChange} placeholder="Last name" />
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
            <input className="form-container-input street" type="text" name="street" value={userData.street} onChange={onInputChange} placeholder="Street" />
            <input className="form-container-input housenumber" type="text" name="houseNumber" value={userData.houseNumber} onChange={onInputChange} placeholder="no." />
            <input className="form-container-input zipcode" type="text" name="zipCode" value={userData.zipCode} onChange={onInputChange} placeholder="Postal code" />
            <input className="form-container-input place" type="text" name="city" value={userData.city} onChange={onInputChange} placeholder="City" />
            <input className="form-container-input oneeleven" type="text" name="telephoneNumber" value={userData.telephoneNumber} onChange={onInputChange} placeholder="Telephone number" />
            <hr className="oneeleven" />
          </fieldset>


          <fieldset>
            <legend>Your little one(s)</legend>

            {
              newKids.map((val, i) =>
                <div className="formgrid" key={i}>
                  <input key={`kidname${i + 1}`} autoComplete='none' className="form-container-input oneeleven" type="text" name="name" value={val.name} onChange={(e) => handleKidFieldsChange(e, i, 'name')} placeholder="Name" />
                  <input autoComplete='none' className="form-container-input dateofbirth" type="date" name="dateOfBirth" value={val.dateOfBirth} onChange={(e) => handleKidFieldsChange(e, i, 'dateOfBirth')} placeholder="Date of birth" />
                  <div className="radio-button-wrapper boygirl">
                    <div className="custom_radio">
                      <input type="radio" id={`boy${i + 1}`} value="boy" checked={val.gender === 'boy'} onChange={(e) => handleKidFieldsChange(e, i, 'gender')} />
                      <label htmlFor={`boy${i + 1}`}>Boy</label>
                    </div>
                    <div className="custom_radio">
                      <input type="radio" id={`girl${i + 1}`} value="girl" checked={val.gender === 'girl'} onChange={(e) => handleKidFieldsChange(e, i, 'gender')} />
                      <label htmlFor={`girl${i + 1}`}>Girl</label>
                    </div>
                  </div>

                  {i === newKids.length - 1 && newKids.length > 1 ? (
                    <div className="icon eightnine" onClick={() => handleKidFieldDelete(i)}>
                      <DeleteIcon />
                    </div>
                  ) : i !== newKids.length - 1 ? (
                    <div className="icon nineten" onClick={() => handleKidFieldDelete(i)}>

                      <DeleteIcon />
                    </div>
                  ) : null}
                  {i === newKids.length - 1 ? (
                    <div className="icon nineten" onClick={addKid}><AddIcon /></div>

                  ) : null}
                  <hr className='oneeleven' />
                </div>
              )
            }
          </fieldset>
          <fieldset>
            <legend>Notes:</legend>

            <textarea className="form-container-textfieldinput oneeleven" name="notes" value={userData.notes} onChange={onInputChange} />
          </fieldset>


          {Object.keys(errors).length > 0 && (
            <div className="oneeleven">
              {Object.values<string | undefined>(errors).map((error, index) => {
                if (typeof error === 'string') {
                  return (
                    <div className="form-container__error__container oneeleven" key={index}>
                      {error}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}

          <button type="submit" className="btn auth-btn" style={{ paddingBottom: "4px"}}>Update profile</button>


        </form>
      </div>
    </>
  );

}


export default UpdateProfile;