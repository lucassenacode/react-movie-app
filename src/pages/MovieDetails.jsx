import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import '../components/Spinner.css';
import useFavorites from '../hooks/useFavorites';
import api from '../services/api';
import './MovieDetails.css';

const imageUrl = "https://image.tmdb.org/t/p/w500/";
const placeholderImage = "https://placehold.co/500x750/333/FFFFFF?text=Sem+Imagem";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === movie?.id);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/movie/${id}`, {
          params: { append_to_response: 'credits' },
        });
        setMovie(response.data);
      } catch (err) {
        setError("Erro ao buscar detalhes do filme.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error) return <p className="error-message">{error}</p>;
  if (!movie) return <p>Filme não encontrado.</p>;

  const director = movie.credits?.crew.find(member => member.job === 'Director');
  const cast = movie.credits?.cast.slice(0, 5);


  return (
    <div className="movie-details-container">
    
      <div className="details-content">
        <img 
          src={movie.poster_path ? `${imageUrl}${movie.poster_path}` : placeholderImage} 
          alt={`Pôster de ${movie.title}`} 
          className="details-poster"
        />
        <div className="details-info">
          <h1>{movie.title} ({movie.release_date.split('-')[0]})</h1>
          <p className="tagline">{movie.tagline}</p>
          
          <div className="info-chips">
            <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
            <span>🕒 {movie.runtime} min</span>
            <button 
              onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}
              className={`favorite-chip ${isFavorite ? 'favorited' : ''}`}
              title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>

          <div className="genres">
            {movie.genres.map(genre => <span key={genre.id}>{genre.name}</span>)}
          </div>
          
          <h3>Sinopse</h3>
          <p>{movie.overview}</p>
          
          {director && ( <><h3>Diretor</h3><p>{director.name}</p></> )}

          {cast && cast.length > 0 && (
            <>
              <h3>Elenco Principal</h3>
              <div className="cast-list">
                {cast.map(actor => <span key={actor.cast_id}>{actor.name}</span>)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;