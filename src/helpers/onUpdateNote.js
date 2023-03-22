
export const updatePost = async ( info, id )=>{
    
    const resp = await fetch( `http://localhost:3004/notes/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( info )
    } )

    return resp;
} 