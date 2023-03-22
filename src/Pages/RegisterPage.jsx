import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Grid, TextField, Link, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form"

// import { chekingCredentials } from "../../store/auth/authSlice"
// import { startRegisterUser } from "../../store/auth/thunks"
import { AuthLayout } from "../layout/AuthLayout"
import { startRegisterUser } from "../store/auth";


export const RegisterPage = () => {

    const dispatch = useDispatch();

    const {errorMessage} = useSelector( state => state.auth )

    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data)=> {

      const {firstname, lastname} = data

      const displayName = `${firstname[0].toUpperCase() + firstname.substring(1)} ${lastname[0].toUpperCase() + lastname.substring(1)}`

      // console.log({...data, displayName})

        // const info = {...data, myPosts: []}

        // dispatch( chekingCredentials() )

        dispatch( startRegisterUser({...data, displayName}) )
    }

  return (
    <AuthLayout title={"Register New User"}>
      <form onSubmit={ handleSubmit( onSubmit ) }>
      <Grid container>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={5.8}>
            <TextField
                label = "Firstname"
                type="text"
                placeholder= "Your name"
                fullWidth
                {...register("firstname")}
            />
          </Grid>
          <Grid item xs={5.8}>
            <TextField
                label = "Lastname"
                type="text"
                placeholder= "Your name"
                fullWidth
                {...register("lastname")}
            />
          </Grid>
        </Grid>
        <Grid item xs = {12} sx = {{mt: 2}}>
          <TextField
            label = "Correo"
            type="email"
            placeholder= "correo@example.com"
            fullWidth
            name="email"
            {...register('email', {pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/  })}
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

        {/* <Grid item 
            xs={12}
            sx = {{mt:1}}
            display = { !!errorMessage ? '' : 'none' }
        >

              <Alert severity = 'error'>Usuario o contraseña incorrectos</Alert>

        </Grid> */}

        <Grid container spacing={2} sx={{mb:2, mt:1}}>

          <Grid item xs={12} >

            <Button 
              sx ={{backgroundColor: 'secundary.main'}}
              // disabled = { isAuthenticating }
              type = 'submit' 
              variant = 'contained' 
              fullWidth 
            
            >
                Register
            </Button>

          </Grid>

        </Grid>
        
        <Grid container
          direction= 'row'
          justifyContent='end'
        >
          <Typography variant="span" mr={1}>Ya tienes una cuenta? </Typography>
          <Link component= {RouterLink} color='inherit' to = '/auth/login'>
            Login
          </Link>
        </Grid>

      </Grid>
     </form>
    </AuthLayout>
  )

  
}