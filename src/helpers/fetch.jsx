// const baseURL=process.env.REACT_APP_API_URL;
const baseURL='https://api.themoviedb.org/3';
// const api_key=process.env.REACT_APP_API_KEY;
const api_key='f4ace6fff7be070eabd4635f9226d200';

console.log(api_key);

export const fetchMovies = (endpoint , data, method = "GET" ) => {
    
    const url = `${baseURL}/${endpoint}?api_key=${api_key}&language=es-AR&region=AR&sort_by=popularity.desc`;

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
