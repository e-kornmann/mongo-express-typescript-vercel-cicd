import React, { useState } from "react" ;
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './checkout.scss';
import { useSelector } from 'react-redux';
import { InsertedBooking } from '../../types';


const Checkout = React.memo(() => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const price: InsertedBooking = useSelector((state: any) => state.booking.price );
    const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;
    const createOrder = (data:any, actions:any) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Sitter Service",
                    amount: {
                        currency_code: "EUR",
                        value: price,
                    },
                },
            ],
        }).then((orderID:boolean) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    const onApprove = (data:any, actions:any) => {
        return actions.order.capture().then(function (details:any) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    const onError = (data:any, actions:any) => {
        setErrorMessage("An Error occured with your payment ");
    };

    const navigate = useNavigate();
        setTimeout(() => (500))
        if (success) {
            navigate("/success/booking");
        }

    
    return (
        <PayPalScriptProvider options={{ "client-id": `${CLIENT_ID}`, currency: "EUR" }}>
        <>
          <div className="btn" onClick={() => setShow(true)}>Confirm</div>
            <div className="payment">
              {show ? (
                <PayPalButtons 
                  className='paypal-btn'
                  style={{ layout: "vertical" }}
                  createOrder={createOrder}
                  onApprove={onApprove}/>
                  ) : null}
             </div>
        </>
        </PayPalScriptProvider>
        )
    })

export default Checkout

