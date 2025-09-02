import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import '../components/MovieCard.css';
import Pagination from '../components/Pagination';
import '../components/Pagination.css';
import Spinner from '../components/Spinner';
import '../components/Spinner.css';
import api from '../services/api';

const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const endpoint = query ? '/search/movie' : '/movie/upcoming';
      const params = query ? { query, page: currentPage } : { page: currentPage };

      try {
        const response = await api.get(endpoint, { params });

        if (response.data.results.length === 0) {
          setError("Nenhum filme foi encontrado.");
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
    
    fetchData();
  }, [query, currentPage]); // Re-executa sempre que a busca ou a página muda

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="home-container">
      {!isLoading && movies.length > 0 && (
        <h1 className="search-title">
          {query ? `Resultados para: "${query}"` : "Próximos Lançamentos"}
        </h1>
      )}

      {isLoading && <Spinner />}
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