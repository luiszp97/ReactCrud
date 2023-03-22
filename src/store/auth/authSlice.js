import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: null,
        authenticated: 'checking',
        openModal: false,
        sincronized: true,
        deleteNote: false,
        modalType: null,
        errorMessage: null,
        activeNote: null,
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

        openModal: ( state ) =>{

            state.openModal = true

        },

        closeModal: ( state ) =>{

            state.openModal = false
            state.activeNote = null

        },

        modalType: ( state, {payload} ) =>{

            state.modalType = payload
            
        },

        isSincronized: ( state, {payload} ) =>{
            state.sincronized = true
        },

        desincronized: ( state ) =>{
            state.sincronized = false
        },

        setActiveNote: ( state, {payload} ) =>{

            state.activeNote = payload

        },

        setDeleteNote: ( state, {payload} ) =>{
            state.deleteNote = false
        },
}
});

export const { login, logout, chekingCredentials, errorRegister, openModal, closeModal,desincronized, isSincronized, setActiveNote } = authSlice.actions;