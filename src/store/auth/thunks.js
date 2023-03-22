import { closeModal, desincronized, errorRegister, login } from "./authSlice"

export const startRegisterUser = ( info )=>{

    
    return async ( dispatch ) =>{

        const resp = await fetch( "http://localhost:3004/users" );
        const data = await resp.json();

        const existingEmail = data.some ( user => user.email === info.email )
    

        if(!existingEmail){

            const randomUid =  Date.now().toString(36) + Math.random().toString(36).substring(2)

            const userInfo = {...info, id: `${randomUid}` }

            console.log(userInfo)

            await fetch( "http://localhost:3004/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( userInfo )
            } )

            dispatch ( login( userInfo ) )

            const stringifyData = JSON.stringify({...userInfo, status:'authenticated'});
            localStorage.setItem('user', stringifyData)

        }

        if(existingEmail){
            dispatch( errorRegister('Correo existente') )
        }

    }
};

export const startLoginUser = ( info ) => {
    return async ( dispatch )=>{

        const resp = await fetch( "http://localhost:3004/users" );
        const data = await resp.json();

        const existingUser = data.some( user => user.email === info.email && user.password === info.password )
            
        if(existingUser){

           const index =  data.findIndex( user => user.email === info.email);
           const stringifyData = JSON.stringify({...data[index], status:'authenticated'})

           dispatch( login( data[index] ) )

           localStorage.setItem('user', stringifyData)
        } else {

            dispatch( errorRegister( "Usuario o Contraseña Invalidos" ) )

        }
    }
};

export const startSaveNewNote = ( data ) => {

    return async (dispatch) =>{

        const id =  Date.now().toString(36) + Math.random().toString(36).substring(2)

        await fetch( "http://localhost:3004/notes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        } )
       
        dispatch( closeModal() )
        dispatch( desincronized() )

        
        

    }
}
