import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { 
  firebaseAuth,
  // firestoreDB,
} from '../../firebase';

import { AuthUser } from '../../types';


export const signUp = createAsyncThunk('user/signUp', async (data: any) => {
  const { userEmail, userPassword } = data;
  const userCredential = await createUserWithEmailAndPassword(firebaseAuth, userEmail, userPassword);

  const { uid, email } = userCredential.user;

  return { uid, email };

});

export const signIn = createAsyncThunk('user/signIn', async (data: any) => {
  const { userEmail, userPassword } = data;
  const userCredential = await signInWithEmailAndPassword(firebaseAuth, userEmail, userPassword);

  const { uid, email, displayName } = userCredential.user;

  return { uid, email, displayName };
});


const emptyUserState = { 
  userId: "empty", 
  userEmail: "empty", 
  status: "",
} as AuthUser;


const userSlice = createSlice({
  name: 'user',
  initialState: emptyUserState,
  reducers: {
    login: (state: AuthUser, { payload }): AuthUser => {
      return {
        ...state,
        userId: payload.uid,
        userEmail: payload.email,
      };
    },
    logout: (state) => {
      localStorage.removeItem('user');
      signOut(firebaseAuth);
      return emptyUserState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled as any, (state, { payload }) => {
        state.userId = payload.uid;
        state.userEmail = payload.email;
        state.status = 'success';
      })
      .addCase(signUp.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled as any, (state, { payload }) => {
        state.userId = payload.uid;
        state.userEmail = payload.email;
        state.status = 'success';
      })
      .addCase(signIn.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
 

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;