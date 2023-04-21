import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import "./auth.scss";
import { logout } from '../../store/slices/authSlice';
import { clear } from '../../store/slices/bookingSlice';
import { useDispatch } from 'react-redux';


export default function Signout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
