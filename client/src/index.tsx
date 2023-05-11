import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App';
import './index.css';
import './app.scss';
import Calendar from './Components/Calendar/Calendar';
import Sitters from './Components/Sitters/Sitters';
import SelectedSitter from './Components/Sitters/SelectedSitter';
import Summary from './Components/Checkout/Summary';
import Signup from './Components/Auth/Signup';
import Signin from './Components/Auth/Signin';
import Checkout from './Components/Checkout/Checkout';
import SuccessBooking from './Components/SuccessPage/SuccessBooking';
import SuccessUpdateProfile from './Components/SuccessPage/SuccessUpdateProfile';
import UpdateProfile from './Components/Auth/UpdateProfile';
import { Provider } from 'react-redux';

import MyBookings from './Components/MyBookings/MyBookings';
import { persistor, store } from '../src/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
     <BrowserRouter>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/sitters" element={<Sitters />} />
        <Route path="/selectedsitter" element={<SelectedSitter />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success/booking" element={<SuccessBooking />} />
        <Route path="/success/update" element={<SuccessUpdateProfile />} />
        SuccessUpdateProfile
  
       </Routes>
       </PersistGate>
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

