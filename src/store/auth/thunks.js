import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, sigInWithGoogle } from "../../firebase/providers";
import { clearNotesWhenLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
   return async(dispatch) => {

      dispatch(checkingCredentials());

   }
}

export const starGoogleSignIn = () => {
   return async(dispatch) => {

      dispatch(checkingCredentials());

      const result = await sigInWithGoogle();
      if (!result.ok) return dispatch(logout(result.errorMessage));

      dispatch (login(result));
   }
}

export const starCreatingUserWithEmailPassword = ({email, password, displayName}) => {
   return async( dispatch ) => {
      
      dispatch( checkingCredentials() );

      const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

      if ( !ok ) return dispatch( logout({ errorMessage }))

      dispatch( login({ uid, displayName, email, photoURL }));
   }
}

export const startLoginWithEmailPassword = ({email, password}) => {
   return async( dispatch ) => {
      dispatch( checkingCredentials() );

      const result = await loginWithEmailPassword({email, password});

      if ( !result.ok ) return dispatch ( logout( result ));

      dispatch( login(result));
   }
}

export const startLogout = () => {
   return async(dispatch) => {
      await logoutFirebase();
      dispatch( clearNotesWhenLogout() );
      dispatch( logout() );
   }
}