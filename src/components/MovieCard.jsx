import { Link } from 'react-router-dom';
import './MovieCard.css';

// URL base para as imagens do TMDB
const imageUrl = "https://image.tmdb.org/t/p/w500/";
const placeholderImage = "https://placehold.co/500x750/333/FFFFFF?text=Sem+Imagem";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img 
        src={movie.poster_path ? `${imageUrl}${movie.poster_path}` : placeholderImage} 
        alt={`Pôster do filme ${movie.title}`} 
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date ? movie.release_date.split('-')[0] : "Ano não informado"}</p>
        <Link to={`/movie/${movie.id}`} className="details-button">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;