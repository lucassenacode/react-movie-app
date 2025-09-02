import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import api from './services/api';

import './App.css';
import './components/Footer.css';
import './components/Navbar.css';

function App() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const performSearch = async (term, page) => {
    if (!term) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/search/movie', {
        params: { query: term, page: page },
      });
      if (response.data.results.length === 0) {
        setError("Nenhum filme encontrado com este termo.");
        setMovies([]);
        setTotalPages(0);
      } else {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      }
      setCurrentPage(response.data.page);
    } catch (err) {
      setError("Erro ao buscar filmes. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App"> 
      <Navbar />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                movies={movies}
                isLoading={isLoading}
                error={error}
                currentPage={currentPage}
                totalPages={totalPages}
                performSearch={performSearch}
              />
            } 
          />
          <Route path="/movie/:id" element={<MovieDetails />} /> 
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer /> 
    </div>
  );
}

export default App;