import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../components/Home';
import { MovieView } from '../components/MovieView';
export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/movie/:id" element={<MovieView />} />

            <Route path="*" element={<Navigate to='/'/>} />
        </Routes>
    </BrowserRouter>
  )
}