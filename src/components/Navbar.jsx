import { useState } from 'react';
import { Container, Form, Navbar } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';

export const NavbarScreen = ({voteAverage, setVoteAverage, setSearchText}) => {

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
    </>
  )
}