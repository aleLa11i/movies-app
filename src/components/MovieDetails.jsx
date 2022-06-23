import { Rating } from "react-simple-star-rating";
import { Container } from "react-bootstrap";
import YouTube from 'react-youtube';

export const MovieDetails = ({ movie, video }) => {

    console.log(movie);

  return (
    <>
    {
        video
            &&
        <YouTube 
            className="mb-5 youtube-video"
            videoId={ video.key } 
            opts={{
            height:'100%',
            width:'100%',
            playerVars:{
                autoplay:1,
                controls:0,
            }
            }}  
            style={{
            'aspectRatio':'20/9.15'
            }}
            onReady={ e => e.target.setVolume(10) }
            onEnd={ e => e.target.playVideo() }
        />
    }
    <Container 
        className="py-5"
    >
        <div
            className="d-flex align-items-center"
        >
            <img 
                className='my-5 me-5 d-block'
                width='100px'
                src={ `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
            />
            <div>
                <h1 
                    style={{'height':'50px'}} 
                >
                    { movie.title }
                </h1>
                <h3 
                    style={{'height':'40px'}} 
                    className='mb-2 text-muted'
                >
                    {`Título original: ${ movie.original_title }`}
                </h3>
        </div>
        </div>
        <p> { movie.overview } </p>

        <h6>
            Géneros: { movie.genres.map( genre =>{
                return ' '+genre.name
            }) }
        </h6>
    
        <Rating
            style={{'pointerEvents':'none'}}
            className="my-3"
            ratingValue={movie.vote_average*10}
            size={40}
        />
        <p 
            className='text-muted'
        >
            {`Popularidad: ${ movie.popularity }`}
        </p> 
        <h5>
            Fecha de estreno:  { movie.release_date }
        </h5>
        
        <img 
            className='my-3' 
            src={ `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} 
        />        
    </Container>
    </>
  )
}