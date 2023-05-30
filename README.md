**`Tinysitters`**

---

**Technologies**

This project is based on MERN with TypeScript:

- MongoDB
- ExpressJS
- React
- NodeJS

This project has 4 dependencies:

**Client:**
- [Firebase](https://firebase.google.com/) for authentication and to store userdata to Firestore.
- [PayPal](https://developer.paypal.com/) for developers. You can create an account (free) and use credentials.

**Server:**
- [MongoDB](https://www.mongodb.com/cloud/atlas/register) for the database to store all our TinySitters and all the Bookings that are made. 
- [Gmail](https://accounts.google.com/) to send email confirmations to application users. You can create an account (free) and add credentials: user email and password to .env file. Note: you have to enable 2-Step verification and afterwards create an application token (the password to use)
  
<br>

---


### **Features**
- Create account
- Log in
- Update available sitters based on previous bookings and availability.
- Update profile with personal details.
- Add or remove your little ones from your personal profile.
- Provide a list of all your previous bookings.
- Make the price dependent on the number of kids and hours of your booking.
- Make a payment through PayPal.
- Send a confirmation email when a booking has succeeded.
- Persist state so you don't have to log in when revisiting the page.

<br>

[The initial app](https://github.com/zuzanakorma/tiny-sitters) has the following contributors: Prabodhi Dissanayake, Elton Körnmann, El-Pachris Obeng and Zuzana Kormancova.

The final version of the app, which has been further developed and improved, is maintained and contributed by Elton Körnmann. You can find the final app in this repository.

<br>

**`Preview`**

---


<img style="padding-right: 30px; padding-bottom: 
32px" align="left" src="https://github.com/e-kornmann/e-kornmann/blob/main/mockups/tinysitters_mockup.jpg?raw=true" alt="React" />

<br>
&nbsp;
<br>
&nbsp;




**`Setup`**

---

**Backend**

1. Open a new terminal

1. Move to directory `server`

   ```console
   cd server
   ```

1. Rename `.env.example` to `.env` and add your details for the MongoDB connection string, database name, and Gmail credentials.

   ```console
   mv .env.example .env
   ```

2. Run the commands

   ```console
   npm install && npm start
   ```

3. Check if the backend service is running on http://localhost:8000 
   
   <br>

---

**Frontend**

1. Open a new terminal

1. Move to directory `client`

   ```console
   cd client
   ```

1. Rename `.env.example` to `.env` and add your details for Firebase and your Paypal Developer account.

   ```console
   mv .env.example .env
   ```


1. Run the commands

   ```console
   npm install && npm start
   ```

1. Visit: http://localhost:3000
