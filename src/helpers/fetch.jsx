// const baseURL=process.env.REACT_APP_API_URL;
const baseURL='https://api.themoviedb.org/3';
// const api_key=process.env.REACT_APP_API_KEY;

export const fetchMovies = (endpoint , data, method = "GET" ) => {
    
    const url = `${baseURL}/${endpoint}`;

    if( method === "GET" ){
        return fetch( url )
    }
    else 
    {
        return fetch( url, {
            method,
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify( data )
        });
    };
};
