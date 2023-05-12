import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { db, firebaseAuth } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import Signout from "./Auth/Signout";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from '../store/slices/authSlice'
import { User } from "../types";
import SummaryIconComponent from "./SvgComponents/SummaryIcon";


const AuthDetails = () => {
  const dispatch = useDispatch<any>();
  const user: User = useSelector((state: any) => state.user);
  const summaryInfo = useSelector((state: any) => state.booking.sitterId);
  const { sitterId, dateOfBooking } = summaryInfo;



  const { userId, userEmail } = user;

  useEffect(() => {
    const listen = onAuthStateChanged(firebaseAuth, async (user: any) => {
      if (user && userId !== 'empty') { 
        console.log("user is logged in"); 
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const parsedkids = JSON.parse(data.kids)
          try {
            await dispatch(setUser({
              userId: user?.uid,
              userEmail: user.email,
              firstName: data?.firstName,
              lastName: data?.lastName,
              parent: data?.parent,
              street: data?.street,
              houseNumber: data?.houseNumber,
              zipCode: data?.zipCode,
              city: data?.city,
              telephoneNumber: data?.telephoneNumber,
              kids: parsedkids,
              notes: data?.notes,
              } as User));
            console.log('User info loaded succesfully');
        } catch (error) {
          console.error(error);
        };
        } else {
          dispatch(logout())
          console.log("No such document!");
        }
      }
    });
    return () => {
      listen();
    };
  }, [dispatch, userId]); 
  


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

      { ((sitterId !== "empty" && dateOfBooking !== "empty") && userId !== 'empty') &&  <SummaryIconComponent />}


      
    </>
  );
};

export default AuthDetails;
