
import { useEffect, useState } from 'react';
import { Button, Card, Container, Form, ListGroup, ListGroupItem, ModalFooter, Navbar } from 'react-bootstrap';
import { fetchMovies } from './helpers/fetch';

export const MoviesApp = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
      
        fetchMovies('discover/movie')
            .then( res =>  res.json() )
            .then( data => setMovies( data.results ) )
      
    }, [ ])
    
    console.log( movies )

  return (
  <>
        <Navbar 
            bg='dark' 
            variant='primary' 
            className='fixed-top'
        >
            <Container fluid>
                <Navbar.Brand className='text-light'>Movies-App</Navbar.Brand>
                <Form className='d-flex'>
                    <Form.Control
                    type='search'
                    placeholder='Search'
                    className='me-2'
                    aria-label='Search'
                    />
                    <Button>Search</Button>
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
                                src={ `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                            />
                            <Card.Text 
                                className='text-muted'
                            >
                                {`Popularidad: ${ movie.popularity }`}
                            </Card.Text> 
                        </Card.Body>
                    </Card>
                )
            })
        }
        </div>
  </>
  )
}