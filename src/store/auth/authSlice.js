import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: null,
        authenticated: 'checking',
        errorMessage: null,
        user: {

            uid: null,
            fullName : null,
            email: null,

        }
    },
   reducers: {

        login: (state,  {payload} ) => {

            state.authenticated = 'authenticated';
            state.user = payload
            state.status = "checked"

        },

        logout: ( state, {payload} ) =>{

            localStorage.removeItem('user')
            
            state.authenticated = "not-authenticated"
            state.user = {

                uid: null,
                fullName : null,
                email: null,
    
            }
        },

        chekingCredentials: (state) => {

            state.status = 'cheking';

        },

        errorRegister: (state, {payload}) =>{
            state.status = 'not-authenticated'
            state.errorMessage = payload
        },
}
});

export const { login, logout, chekingCredentials, errorRegister} = authSlice.actions;