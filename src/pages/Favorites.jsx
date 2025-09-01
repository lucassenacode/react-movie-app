import MovieCard from '../components/MovieCard';
import useFavorites from '../hooks/useFavorites';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-container">
      <h1>Meus Filmes Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Sua lista de favoritos está vazia.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;