import React, { useEffect, useState } from 'react';
import { ReactComponent as Minimize } from '../../Assets/exclude.svg';
import { ReactComponent as Maximize } from '../../Assets/include.svg';
import './popup.scss';
type Props = {
  sitterName: string,
}

const FakePayment = ({sitterName}: Props) => {
  const [showFakePaymentPopup, setShowFakePaymentPopup] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFakePaymentPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showFakePaymentPopup && (
        <div className={`popup ${minimized ? 'minimized' : ''}`}>
          {!minimized && (
            <>
              <h3>Book { sitterName }<br /> with a fake PayPal ID</h3>
              <p>
                Use this PayPal account to get access to infinite "play" money so you can complete your order:
              </p>
              <div className="popup--details">
                <div className="key">Email:</div>
                <div className="value">sb-4ml14725343226@personal.example.com</div>
                <div className="key">Password:</div>
                <div className="value">b%qs1iNp</div>
              </div>
              <Minimize onClick={() => setMinimized(!minimized)} className="minimize-icon" />

            </>
          )}

          {minimized && (
            <>
               <Maximize onClick={() => setMinimized(!minimized)} className="maximize-icon" />
            </>
          )}

         
        </div>
      )}
    </>
  );
};

export default FakePayment;
