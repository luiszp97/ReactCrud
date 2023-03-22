import { useRef } from 'react'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom";


import { AuthLayout } from '../layout/AuthLayout'
import { useDispatch, useSelector } from 'react-redux';
import { chekingCredentials } from '../store/auth/authSlice';
import { startLoginUser } from '../store/auth/thunks';


export const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { errorMessage } = useSelector( state => state.auth )
  const dispatch = useDispatch();

  const onSubmit = (data) => {
  
    dispatch( chekingCredentials() );
    dispatch( startLoginUser( data ) )
    
  }

  return (
  
       <AuthLayout title={"Login"}>
          <form onSubmit={ handleSubmit( onSubmit ) }>
          <Grid container>
            <Grid item xs = {12} sx = {{mt: 2}}>
              <TextField
                label = "Correo"
                type="email"
                placeholder= "correo@example.com"
                fullWidth
                name="email"
                {...register('email', {required:true, pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ })}
              />
            {errors.email?.type === "pattern" && <Alert severity = 'error' sx={{mt:1}}>Introduce un email valido</Alert> }
            </Grid>


            <Grid item xs = {12} sx = {{mt: 2}}>
              <TextField
                {...register('password', {required:true, minLength: 8})}
                label = "Contraseña"
                type="password"
                placeholder= "*********"
                fullWidth
                name="password"
              />
            </Grid>

            <Grid item 
                xs={12}
                sx = {{mt:1}}
                display = { !!errorMessage ? '' : 'none' }
            >

                  <Alert severity = 'error'>Usuario o contraseña incorrectos</Alert>

            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>

              <Grid item xs={12} >

                <Button 
                  sx ={{backgroundColor: 'secundary.main'}}
                  // disabled = { isAuthenticating }
                  type = 'submit' 
                  variant = 'contained' 
                  fullWidth 
                 
                >
                    Login
                </Button>

              </Grid>

            </Grid>
            
            <Grid container
              direction= 'row'
              justifyContent='end'
            >
              <Link component= {RouterLink} color='inherit' to = '/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
        </form>
       </AuthLayout>

  )
}
