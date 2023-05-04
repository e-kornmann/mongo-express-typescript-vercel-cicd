import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { 
  db,
  firebaseAuth,
} from '../../firebase';

import { AuthUser, User } from '../../types';
import { doc, setDoc, updateDoc } from 'firebase/firestore';


export const signUp = createAsyncThunk('user/signUp', async (data: User) => {
  const { userName, userEmail, userPassword, userAddress } = data;
  const userCredential = await createUserWithEmailAndPassword(firebaseAuth, userEmail, userPassword!);
  const { uid } = userCredential.user;
  try {
   await setDoc(doc(db, 'users', uid), {
    userName: userName,
    userAddress: userAddress
  })
  } catch (error) {
  console.log(error);
}
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ userId, userName, userAddress }: User) => {
  if (!userId) {
    throw new Error('Invalid userId');
  }
  const docRef = doc(db, 'users', userId);
  updateDoc(docRef, {userName: userName, userAddress: userAddress})
  .then(docRef => { console.log("Document updated") });
});


export const signIn = createAsyncThunk('user/signIn', async (data: AuthUser) => {
  const { userEmail, userPassword } = data;
  const userCredential = await signInWithEmailAndPassword(firebaseAuth, userEmail, userPassword!);

  const { uid, email, displayName } = userCredential.user;

  return { uid, email, displayName };
});

const emptyUserState = { 
  userId: "empty", 
  userName: "empty", 
  userEmail: "empty", 
  userAddress: "empty",
  status: "logged-out",
  stored: ""
} as User;

const userSlice = createSlice({
  name: 'user',
  initialState: emptyUserState,
  reducers: {
    login: (state: User, { payload }): User => {
      return {
        ...state,
        userId: payload.uid,
        userEmail: payload.email,
      }
    },
    setUser: (state: User, { payload }): User => {
      return {
        ...state,
      userName: payload.userName,
      userAddress: payload.userAddress
    }
  },
    logout: () => {
      signOut(firebaseAuth);
      return emptyUserState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.stored = 'loading';
      })
      .addCase(signUp.fulfilled as any, (state, { payload }) => {
        state.stored = 'user added';
      })
      .addCase(signUp.rejected, (state) => {
        state.stored = 'failed';
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled as any, (state, { payload }) => {
        state.userId = payload.uid;
        state.userEmail = payload.email;
        state.status = 'logged-in';
      })
      .addCase(signIn.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateUser.pending, (state) => {
        state.stored = 'loading';
      })
      .addCase(updateUser.fulfilled as any, (state, { payload }) => {
        state.stored = 'user updated';
      })
      .addCase(updateUser.rejected, (state) => {
        state.stored = 'failed';
      });
  },
});
 

export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;