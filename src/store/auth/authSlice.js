import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      status      : 'checking', //checking, not-auth, is-auth
      uid         : null,
      email       : null,
      displayName : null,
      photoURL    : null,
      errorMessage: null,

   },
   reducers: {
      login: (state, {payload}) => {
         state.status      = 'is-auth'; 
         state.uid         = payload.uid;
         state.email       = payload.email;
         state.displayName = payload.displayName;
         state.photoURL    = payload.photoURL;
         state.errorMessage= null;         
      },

      logout: (state, {payload}) => {
         state.status      = 'not-auth'; 
         state.uid         = null;
         state.email       = null;
         state.displayName = null;
         state.photoURL    = null;
         state.errorMessage= payload?.errorMessage;
      },

      checkingCredentials: (state) => {
         state.status = 'checking'
      }
   },
})
// act crea func
export const { login, logout, checkingCredentials } = authSlice.actions;