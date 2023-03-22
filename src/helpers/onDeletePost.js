export const onDeletedPost = async (postId, userId) => {

    const res = await fetch( `http://localhost:3004/notes/${postId}`, {
        method:'DELETE',
        headers:{
            'Authorization' : `Basic ${userId}`
        }
    
    } )

    return res;
}