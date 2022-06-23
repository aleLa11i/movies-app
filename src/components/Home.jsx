
import { useContext, useEffect, useState } from 'react';
import { Button, Card, Container, Form, Navbar } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
import { fetchMovies } from '../helpers/fetch';
import { useNavigate } from 'react-router';
import { MoviesContext } from '../context/MoviesContext';

const api_key   ='f4ace6fff7be070eabd4635f9226d200';
const language  ='es-AR';
const region    ='AR';
const baseEndpoint  =`api_key=${api_key}&language=${language}&region=${region}&include_video=true`

export const Home = () => {

    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [voteAverage, setVoteAverage] = useState({
        value:0,
        text:''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if( !searchText ){
            fetchMovies(`discover/movie?${baseEndpoint}&sort_by=popularity.desc${voteAverage.text}`)
                .then( res =>  res.json() )
                .then( data => setMovies( data.results ) )
        }
        console.log(movies);
    }, [ searchText, voteAverage ])
    
    useEffect(()=>{

        if( searchText ){
            fetchMovies(`search/movie?${baseEndpoint}&query=${searchText.toLowerCase()}&page=1`)
                .then( res =>  res.json() )
                .then( data => setMovies( data.results ) )
        }

    },[ searchText ])

    const ratingChanged = (newRating) => {
        if( newRating === voteAverage.value ){
            setVoteAverage({...voteAverage, value:0, text:''});
        }
        else
        {
            setVoteAverage({...voteAverage, value:newRating, text:`&vote_average.gte=${newRating-2}&vote_average.lte=${newRating}`});
        }
    }

  return (
  <>
        <Navbar 
            bg='dark' 
            variant='primary' 
            className='fixed-top'
        >
            <Container fluid>
                <Navbar.Brand className='text-light'>Movies-App</Navbar.Brand>
                <Rating
                    // style={
                    //     {'position':'absolute'},
                    //     {'right':'0'}
                    // }
                    ratingValue={voteAverage.value*10}
                    size={30}
                    onClick={ rating => ratingChanged(rating/10) }
                />
                <Form className='d-flex'>
                    <Form.Control
                    type='search'
                    placeholder='Búsqueda'
                    className='me-2'
                    aria-label='Search'
                    onChange={ e => setSearchText( e.target.value )}
                    />
                </Form>
            </Container>
        </Navbar>
        
        <div className='d-flex flex-wrap alig-items-center justify-content-center mt-5 pt-3' >
        
        { 
            movies?.map( movie => {
                return (
                    <Card
                    key={ movie.id }
                    className='m-2'
                    style={{'width':'300px'}}
                    >
                        <Card.Body>
                            <Card.Title 
                                style={{'height':'50px'}} 
                            >
                                { movie.title }
                            </Card.Title>
                            <Card.Subtitle 
                                style={{'height':'40px'}} 
                                className='mb-2 text-muted'
                            >
                                {`Título original: ${ movie.original_title }`}
                            </Card.Subtitle>
                            <Card.Img 
                                className='my-3'
                                height='400px'
                                src={ `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                            />
                            <Card.Text 
                                className='text-muted'
                            >
                                {`Popularidad: ${ movie.popularity }`}
                            </Card.Text> 
                            <Button
                                onClick={ () => navigate(`/movie/${movie.id}`) }
                            >
                                Ver detalles
                            </Button>
                        </Card.Body>
                    </Card>
                )
            })
        }
        </div>
  </>
  )
}