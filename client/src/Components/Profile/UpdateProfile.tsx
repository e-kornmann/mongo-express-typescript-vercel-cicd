import React, { useState } from 'react';
import Header from '../Header/Header';
import './profile.scss';
import { useSelector, useDispatch } from 'react-redux';
import AuthDetails from '../AuthDetails';
import { Kid, User } from '../../types';
import { setUser, updateUser } from '../../store/slices/authSlice'
import { validateFirstName,
   validateLastName,
   validateParent, validateStreet, validateHouseNumber, validateZipCode, validateCity, validateTelephoneNumber, validateKids } from '../Auth/formValidation';
import { useNavigate } from 'react-router-dom';
import AddIcon from '../SvgComponents/AddIcon';


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
    setNewKids([ ...newKids, {name: '', dateOfBirth: '', gender:''} ])
    setUserData({ ...userData, kids: newKids });
  }

  const handleKidFieldsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number,
    key: keyof Kid
  ) => {
    const { value } = event.target;
    const updatedKids = [...newKids];
    updatedKids[i] = {
      ...updatedKids[i],
      [key]: value,
    };
    setNewKids(updatedKids);
    setUserData({ ...userData, kids: updatedKids });
  };
const handleKidFieldDelete=(i:number)=>{
    const deleteVal = [...newKids]
    deleteVal.splice(i,1)
    setNewKids(deleteVal)
    setUserData({ ...userData, kids: deleteVal });
}

const [errors, setErrors] = useState({});

const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setUserData({ ...userData, [event.target.name]: event.target.value });
};

  const handleUpdate =  async (event: React.FormEvent)  => {
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
        // navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  }



  console.log(userData)
 

  return (
    <>
    <div className="graybg">
    <AuthDetails />
    <Header />
      <h2>Update Prfile</h2>
      <h3>{userId}, { userEmail }</h3>
      <form onSubmit={handleUpdate} className="form__container">
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

  
      <hr />

      <h4>Your little one(s)</h4>

  
      {
        newKids.map((val,i) =>
        <fieldset key={i}>
            <input className="form__container-input stretch" type="text" name="name" value={val.name} onChange={(e) => handleKidFieldsChange(e, i, 'name')} />
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
            {i === newKids.length - 1 ? (
        <button className="sixseven" onClick={() => handleKidFieldDelete(i)}>Delete</button>
      ) : (
        <button className="seveneight" onClick={() => handleKidFieldDelete(i)}>Delete</button>
      )}
        </fieldset>
        )
      }
          <button className="seveneight" type="button" onClick={addKid}><AddIcon /></button>
           
        

          <input className="form__container-textfieldinput stretch" type="textfield" name="notes" value={userData.notes} onChange={onInputChange} />


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


  </form>
  </div>
  </>
  );
      
  }


  export default UpdateProfile;