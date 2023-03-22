import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        openModal: false,
        openUptadeDeleteModal:false,
        loading: false,
        isSaved: {
            ok:false,
        },
        sincronized: true,
        deleteNote: false,
        errorMessage: null,
        activeNote: null,
    },
   reducers: {

        openModal: ( state ) =>{

            state.openModal = true

        },

        closeModal: ( state ) =>{

            state.openModal = false
            state.activeNote = null

        },
        setOpenUpdateDeleteModal: ( state ) =>{

            state.openUptadeDeleteModal = true

        },

        closeUpdateDeleteModal: ( state ) =>{

            state.openUptadeDeleteModal = false
            state.activeNote = null

        },

        isSincronized: ( state ) =>{
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

        changeLoading: (state, {payload}) => {

            state.loading = payload
        },

        changeSaved: (state, {payload}) => {

            state.isSaved = payload
        },


}
});

export const { openModal, closeModal,desincronized, isSincronized, setActiveNote, setOpenUpdateDeleteModal, closeUpdateDeleteModal, changeLoading, changeSaved } = notesSlice.actions;