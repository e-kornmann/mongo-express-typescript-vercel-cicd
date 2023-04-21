import React, { useEffect, useState } from 'react'
import api from '../../Api/api';
import Header from '../Header/Header';
import './profile.scss';
import { useSelector } from 'react-redux';
import AuthDetails from '../AuthDetails';
import { User } from '../../types';


export default function Profile() {
  const signedInUser = useSelector((state: any)=> state.user)
  const { userId } = signedInUser as User;
    const [user, setUser] = useState<User>({ userId: "", userName: "", userEmail: "", userAddress: "" });
    const { userName, userEmail, userAddress } = user;

    const getUserInfo = async (id: string) => {
        try {
          const response = await api.get(`/api/users/${id}`)
          setUser(response.data)
          } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        const fetchData = async () => {
          await getUserInfo(userId);
        };
        fetchData();
      });

  return (
    <>
    <AuthDetails />
    <Header/>
    <h1 className='user-profile'>My Profile</h1>
    <div>
        <h1 className='user-profile__details'>Name: {userName}</h1>
        <h1 className='user-profile__details'>Email: {userEmail}</h1>
        <h1 className='user-profile__details'>Address: {userAddress}</h1>
    </div>
    </>
  )
  }