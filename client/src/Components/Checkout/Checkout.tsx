import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './checkout.scss';
import { useSelector } from 'react-redux';
import { InsertedBooking } from '../../types';

const Checkout = React.memo(() => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const price: InsertedBooking = useSelector((state: any) => state.booking.price);

    const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

    const createOrder = (data: any, actions: any) => {
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
        }).then((orderID: boolean) => {
            
            return orderID;
        });
    };

    const onApprove =  (data: any, actions: any) => {
        return actions.order.capture().then(function (details: any) {
            navigate("/success/booking");
        });
    };



    return (
        <PayPalScriptProvider options={{ "client-id": `${CLIENT_ID}`, currency: "EUR" }}>
            <>
                <div className="btn" onClick={() => setShow(true)}>Checkout</div>
                <div className="payment">
                    {show && (
                        <PayPalButtons
                            className="paypal-btn"
                            style={{ layout: "vertical" }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                        />
                    )}
                </div>
            </>
        </PayPalScriptProvider>
    );
});

export default Checkout;
