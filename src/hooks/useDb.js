
export const useDb = async (endPoint) => {
    
    const baseUrl = "http://localhost:3004";

    const res = await fetch(`${baseUrl}/${endPoint}`);
    const data = await res.json();

  

    return ({

        data,
    })
    
}