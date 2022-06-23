import { useContext, useEffect, useState } from "react";
import { fetchMovies } from "../helpers/fetch";
import { useNavigate, useParams } from "react-router";
import { MovieDetails } from "./MovieDetails";

const api_key   ='f4ace6fff7be070eabd4635f9226d200';

export const MovieView = () => {

  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    
      fetchMovies(`movie/${id}/videos?api_key=${api_key}&language=en`)
        .then( res =>  res.json() )
        .then( data => setVideos( data.results ) )
    
  }, []);

  useEffect(() => {
    fetchMovies(`movie/${id}?api_key=${api_key}&language=es-MX`)
        .then( res =>  res.json() )
        .then( data => setMovie( data ) );

  }, []);

  const videoSelected = videos.find( video => video.type==="Trailer") || videos[0];

  return (
    <div
      style={{'background':'#000'}}
      className='text-white'
      >  
        {
          movie
            &&
          <MovieDetails movie={ movie } video={ videoSelected } />
        }

    </div>
  )
}