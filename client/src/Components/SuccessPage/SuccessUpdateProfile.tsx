import React, { useEffect }  from 'react'
import './successPage.scss';
import { useNavigate } from 'react-router-dom';

const SuccessUpdateProfile: React.FC = () => {
const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => navigate("/summary"), 2000);
     }, [navigate])
  

  return (
    <>
      
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <div className="successPage">
        <h2>Your Profile is updated!</h2>
      </div>
    </>
  )
}
export default SuccessUpdateProfile;
