import {Link as RouterLink} from 'react-router-dom'
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { starCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
   email: '',
   password: '',
   displayName: ''
}

const formValidations = {
   email: [(value) => value.includes('@'), 'incorrect email, missing @'],
   password: [(value) => value.length >= 6, 'incorrect pasword, need at least 6 characters'],
   displayName: [(value) => value.length >= 1, 'this field is obligatory'],
}

export const RegisterScreen = () => {

   const [formSubmited, setFormSubmited] = useState(false);
   const dispatch = useDispatch();

   const { status, errorMessage } = useSelector( state => state.auth );
   const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

   const {
      email, password, displayName,
      passwordValid, displayNameValid, emailValid,
      onInputChange, isFormValid, formState
   } = useForm(formData, formValidations);

   const onSubmit = (event) => {
      event.preventDefault();
      setFormSubmited(true)

      if (!isFormValid) return;

      dispatch( starCreatingUserWithEmailPassword(formState) )
   }

   return (
      <AuthLayout title="Register new account">
         <form 
            onSubmit={onSubmit}            
            className="animate__animated animate__fadeIn animate__faster"
         >
            <Grid container>
               <Grid item xs={12} sx={{mt: 2}}>
                  <TextField 
                     label="Name" 
                     type="text" 
                     placeholder="yout name"
                     name='displayName'
                     value={displayName}
                     onChange={onInputChange}
                     error={ !!displayNameValid && formSubmited}
                     helperText={ displayNameValid }
                     fullWidth/>
               </Grid>
               
               <Grid item xs={12} sx={{mt: 2}}>
                  <TextField 
                     label="e-mail" 
                     type="email" 
                     placeholder="test@mail.com"
                     name='email'
                     value={email}
                     onChange={onInputChange}
                     error={!!emailValid && formSubmited}
                     helperText={emailValid}
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
                     error={!!passwordValid && formSubmited}
                     helperText={passwordValid}
                     fullWidth/>
               </Grid>

               <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

                  <Grid 
                     item 
                     xs={ 12 }
                     display={ !!errorMessage ? '': 'none'}
                  >
                     <Alert severity='error'>{ errorMessage }</Alert>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <Button 
                        type='submit' 
                        variant='contained' 
                        fullWidth
                        disabled={isCheckingAuthentication}
                     >
                        Create account
                     </Button>
                  </Grid>
               </Grid>
               <Grid container direction='row' justifyContent='end'>
                  <Typography>Already have an account? </Typography>
                  <Link component={RouterLink} color='inherit' to="/auth/login">                        
                     Log in
                  </Link>
               </Grid>
            </Grid>
         </form>
      </AuthLayout>

   )
}
