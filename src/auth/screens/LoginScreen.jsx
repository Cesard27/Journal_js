import {Link as RouterLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { checkingAuthentication, starGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';

const formData = {
   email: '',
   password: ''
}

export const LoginScreen = () => {

   const {status, errorMessage} = useSelector(state => state.auth)

   const dispatch = useDispatch();

   const {email, password, onInputChange, formState} = useForm(formData);

   const isAuthenticating = useMemo(() => status === 'checking', [status])

   const onSubmit = (event) => {
      event.preventDefault();

      dispatch(startLoginWithEmailPassword(email, password));
   }

   const onGoogleSignIn = () => {
      dispatch( starGoogleSignIn() );
   }

   const onEmailPasswordSignIn = () => {
      dispatch( startLoginWithEmailPassword(formState) );
   }

   return (
      <AuthLayout title="Login">
         <form 
            onSubmit={onSubmit} 
            className="animate__animated animate__fadeIn animate__faster"
         >
            <Grid container>
               <Grid item xs={12} sx={{mt: 2}}>
                  <TextField 
                     label="e-mail" 
                     type="email" 
                     placeholder="test@mail.com"
                     name='email'
                     value={email}
                     onChange={onInputChange}
                     fullWidth/>
               </Grid>

               <Grid item xs={12} sx={{mt: 2}}>
                  <TextField 
                     label="Password" 
                     type="password" 
                     placeholder="**********"
                     name='password'
                     value={password}
                     onChange={onInputChange}
                     fullWidth/>
               </Grid>

               <Grid container>
                  <Grid 
                     item
                     xs={ 12 }
                     display={ !!errorMessage ? '' : 'none'}
                  >
                     <Alert severity='error'>{errorMessage}</Alert>
                  </Grid>
               </Grid>

               <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                  <Grid item xs={12} sm={6}>
                     <Button 
                        type='submit' 
                        variant='contained'
                        disabled={isAuthenticating} 
                        onClick={onEmailPasswordSignIn}
                        fullWidth
                     >
                        Login
                     </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <Button 
                        variant='contained' 
                        onClick={onGoogleSignIn} 
                        disabled={isAuthenticating}
                        fullWidth
                     >
                        <Google />
                        <Typography sx={{ml:1}}>Google</Typography>
                     </Button>
                  </Grid>
               </Grid>
               <Grid container direction='row' justifyContent='end'>
                  <Link component={RouterLink} color='inherit' to="/auth/register">                        
                     Create and account
                  </Link>
               </Grid>
            </Grid>
         </form>
      </AuthLayout>

   )
}
