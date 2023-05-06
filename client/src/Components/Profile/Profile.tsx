import React, { useState } from 'react';
import Header from '../Header/Header';
import './profile.scss';
import { useSelector, useDispatch } from 'react-redux';
import AuthDetails from '../AuthDetails';
import { User } from '../../types';
import { updateUser } from '../../store/slices/authSlice'

export default function Profile() {
  const dispatch = useDispatch<any>();
  const user: User = useSelector((state: any) => state.user);
  const { userId, firstName, lastName, userEmail, street, houseNumber } = user;
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newParent, setNewParent] = useState(lastName);
  const [newStreet, setNewStreet] = useState(street);
  const [newHouseNumber, setNewHouseNumber] = useState(houseNumber);




  const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewFirstName(event.target.value);
  };

  const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewLastName(event.target.value);
  };

  const handleTypeOfParentChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewParent(event.target.value);
  };

  const onStreetChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewStreet(event.target.value);
  };

  const onHouseNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewHouseNumber(event.target.value);
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
   
    dispatch(
      updateUser({
        userId: userId,
        firstName: newFirstName,
        lastName: newLastName,
        parent: newParent,
        street: newStreet,
        houseNumber: newHouseNumber,
        userEmail: userEmail,
      }),
    );
  };

  return (
    <>
    <div className="graybg">
    <AuthDetails />
    <Header />
      <h1 className='user-profile'>My Profile</h1>
      <div>
        <h1 className='user-profile__details'>Id: {userId}</h1>
        <form onSubmit={handleUpdate} className="form__container">

 
          <input type='text' value={newFirstName} onChange={onFirstNameChange} placeholder={newFirstName} />
          <input type='text' value={newLastName} onChange={onLastNameChange} placeholder={newLastName} />
          <input type='text' value={newStreet} onChange={onStreetChange} placeholder={newStreet} />
          <button type='submit'>Update</button>
        </form>
        <h1 className='user-profile__details'>Email: {userEmail}</h1>
      </div>
      </div>
    </>
  );
}
