import React, { useEffect, useState } from 'react';
import { ReactComponent as Delete } from '../../Assets/delete.svg';
import './popup.scss';
import { Link } from 'react-router-dom';

const OnRenderMessage = () => {
  const [showOnRenderMessagePopup, setShowOnRenderMessagePopup] = useState(false);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnRenderMessagePopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showOnRenderMessagePopup && (
            <>
            <div className="popup">
              <h3 style={{ maxWidth : "230px" }}>Are you experiencing extended wait times for content to load?</h3>
              <p>
              Sometimes it may take a while to load the available TinySitters due to the free-tier backend server running on <Link to='https://render.com/docs/free'>Render.com</Link>.
              However, this should not take more than 3 minutes.
              </p>
         
              <Delete onClick={() => setShowOnRenderMessagePopup(!showOnRenderMessagePopup)} className="close-icon" />
              </div>
            </>
            
        )}

  
        
      
    </>
  );
};

export default OnRenderMessage;
