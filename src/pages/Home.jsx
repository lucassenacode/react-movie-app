import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import '../components/MovieCard.css';
import Pagination from '../components/Pagination';
import '../components/Pagination.css';
import api from '../services/api';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Novos estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Função central para realizar a busca
  const performSearch = async (term, page) => {
    if (!term) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/search/movie', {
        params: {
          query: term,
          page: page,
        },
      });

      if (response.data.results.length === 0) {
        setError("Nenhum filme encontrado com este termo.");
        setMovies([]);
      } else {
        setMovies(response.data.results);
      }

      setCurrentPage(response.data.page);
      setTotalPages(response.data.total_pages);

    } catch (err) {
      setError("Erro ao buscar filmes. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler para o envio do formulário de busca
  const handleFormSubmit = (e) => {
    e.preventDefault();
    performSearch(searchTerm, 1); // Sempre busca a página 1 em uma nova pesquisa
  };
  
  // Handler para mudança de página pela paginação
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      performSearch(searchTerm, newPage);
      window.scrollTo(0, 0); // Volta a pagina para topo ao mudar de página
    }
  };

  return (
    <div className="home-container">
      <h1>Encontre seu Filme Favorito</h1>
      
      <form onSubmit={handleFormSubmit} className="search-form">
        <input 
          type="text" 
          placeholder="Digite o nome de um filme..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {isLoading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

       <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </div>
  );
};

export default Home;