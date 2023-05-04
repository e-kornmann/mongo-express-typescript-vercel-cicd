import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, firebaseAuth } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import Signout from "./Auth/Signout";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState() as any;

  useEffect(() => {
    const listen = onAuthStateChanged(firebaseAuth, async (user: any) => {
      if (user) { 
        setAuthUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          setAuthUser(undefined);
          console.log("No such document!");
        }
      }
    });
    return () => {
      listen();
    };
  }, []); 
  
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { firebaseAuth } from "../firebase";
// import Signout from "./Auth/Signout";


// const AuthDetails = () => {
//   const [authUser, setAuthUser] = useState() as any;


// //put get profile here so we have all the data in the store

//   useEffect(() => {
//     const listen = onAuthStateChanged(firebaseAuth, (user: any) => {
//       if (user) {
//         setAuthUser(user);
        
//       } else {
//         setAuthUser(undefined);
//       }
//     });
  
//     return () => {
//       listen();
//     };
//   });


  return (
    <>
    <nav className="navigation">
    <Link to="/">Home</Link> 
    <p>About us</p>
      {authUser ? (
        <>
          <p style={{ lineHeight: '14px' }}>Signed in as <br /> <span style={{ color: 'black' }}> {authUser.email}</span></p>
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
