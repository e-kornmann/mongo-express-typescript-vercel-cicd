import React, { useEffect, useState } from 'react';
import { ReactComponent as Delete } from '../../Assets/delete.svg';
import './popup.scss';

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
              <h3 style={{ maxWidth : "230px" }}>Are you experiencing Slow Loading Times?</h3>
              <p>Sometimes, it may take a while to load the available sitters because of 
                the free-tier backend server being used on OnRender. However, this shouldn't take longer than 3 minutes.
              </p>
         
              <Delete onClick={() => setShowOnRenderMessagePopup(!showOnRenderMessagePopup)} className="close-icon" />
              </div>
            </>
            
          )}

  
        
      
    </>
  );
};

export default OnRenderMessage;
