import MovieCard from '../components/MovieCard';
import '../components/MovieCard.css';
import Pagination from '../components/Pagination';
import '../components/Pagination.css';


const Home = ({ 
  searchTerm, 
  setSearchTerm, 
  movies, 
  isLoading, 
  error, 
  currentPage, 
  totalPages, 
  performSearch 
}) => {


  const handleFormSubmit = (e) => {
    e.preventDefault();
    performSearch(searchTerm, 1);
  };
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      performSearch(searchTerm, newPage);
      window.scrollTo(0, 0);
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