import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { clear } from "../../store/slices/bookingSlice";

import "./auth.scss";



export default function Signout() {
const dispatch = useDispatch()
    const navigate = useNavigate();
    const userSignOut = () => {
        signOut(firebaseAuth)
          .then(() => {
            console.log("sign out successful");
            dispatch(logout());
            dispatch(clear())
            navigate("/")
          })
          
          .catch((error) => console.log(error));
      };
    
  return (
        <p className="signout" onClick={userSignOut}>Sign Out</p>
      )
}
