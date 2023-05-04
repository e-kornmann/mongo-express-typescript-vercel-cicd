import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { db, firebaseAuth } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import Signout from "./Auth/Signout";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../store/slices/authSlice'
import { User } from "../types";


const AuthDetails = () => {
  const dispatch = useDispatch<any>();
  const user: User = useSelector((state: any) => state.user);
  const { userId, userEmail } = user;

  useEffect(() => {
    const listen = onAuthStateChanged(firebaseAuth, async (user: any) => {
      if (user) { 
        console.log("user is logged in");
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data);
          dispatch(
            setUser({
              userId: user.uid,
              userEmail: user.email,
              userName: data?.userName,
              userAddress: data?.userAddress,
            })
          );
        } else {
          console.log("No such document!");
        }
      }
    });
    return () => {
      listen();
    };
  }, [dispatch]); 
  


  return (
    <>
    <nav className="navigation">
    <Link to="/">Home</Link> 
    <p>About us</p>
      {userId !== 'empty' ? (
        <>
          <p style={{ lineHeight: '14px' }}>Signed in as <br /> <span style={{ color: 'black' }}> {userEmail}</span></p>
          <Link to="/mybookings">My Bookings</Link><br />
          <Link to="/profile">Profile</Link>
          <Signout/>
        </>
      ) : (
        <>
          <Link to='/login'>Log in</Link>
        </>
      )}
      </nav>
    </>
  );
};

export default AuthDetails;
