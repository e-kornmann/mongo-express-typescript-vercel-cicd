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
  const { userId, userName, userEmail, userAddress } = user;
  const [newName, setNewName] = useState(userName)
  const [newAddress, setNewAddress] = useState(userAddress);

  const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>): void  => {
    setNewAddress(event.target.value);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void  => {
    setNewName(event.target.value);
  };


  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
   
    dispatch(
      updateUser({
        userId: userId,
        userName: newName,
        userAddress: newAddress,
        userEmail: userEmail,
      }),
    );
  };

  return (
    <>
      <AuthDetails />
      <Header />
      <h1 className='user-profile'>My Profile</h1>
      <div>
        <h1 className='user-profile__details'>Id: {userId}</h1>
        <form onSubmit={handleUpdate}>
          <input type='text' value={newName} onChange={onNameChange} placeholder={newName} />
          <input type='text' value={newAddress} onChange={onAddressChange} placeholder={newAddress} />
          <button type='submit'>Update</button>
        </form>
        <h1 className='user-profile__details'>Email: {userEmail}</h1>
      </div>
    </>
  );
}
