import { Link } from 'react-router-dom';
import './MovieCard.css';

const imageUrl = "https://image.tmdb.org/t/p/w500/";
const placeholderImage = "https://placehold.co/500x750/333/FFFFFF?text=Sem+Imagem";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
       <div className="rating-badge">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      <img 
        src={movie.poster_path ? `${imageUrl}${movie.poster_path}` : placeholderImage} 
        alt={`Pôster do filme ${movie.title}`} 
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date ? movie.release_date.split('-')[0] : "Ano não informado"}</p>
      </div>
    </Link>
  );
};

export default MovieCard;