import { onDeletedPost, updatePost } from "../../helpers";
import { changeLoading, changeSaved, closeModal, closeUpdateDeleteModal, desincronized } from "./notesSlice";

export const startSaveNewNote = ( data ) => {

    return async (dispatch) =>{

        const id = Math.random().toString(36).substring(2, 18);

        const res = await fetch( "http://localhost:3004/notes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {...data, id} )
        } )

        if(res.ok){

            dispatch( desincronized() )
            dispatch( closeModal() )
            dispatch( changeSaved({ok: true, mesage: 'Tu nota fue guardada'}) )
            dispatch( changeLoading(false) )

        } else {

            dispatch( changeSaved({ok: false}) )

        }
       

    }
}

export const startDeletePost = (post, id) => {


    return async (dispatch) => {

        const res = await onDeletedPost(post, id)
    
        if(res.ok){

            dispatch( closeUpdateDeleteModal() )
            dispatch( desincronized() )
            dispatch( changeSaved({ok: true}) )
            dispatch( changeLoading(false) )

        } else {

            dispatch( changeSaved({ok: false}) )

        }


    }
};

export const startUpdateNote = (note, noteId) => {

    return async (dispatch)=>{

        const res = await updatePost(note, noteId)

        if(res.ok){

            dispatch( desincronized() )
            dispatch( closeUpdateDeleteModal() )
            dispatch( changeLoading(false) )

        } else {

            dispatch( changeSaved({ok: false}) )

        }

    }

}
