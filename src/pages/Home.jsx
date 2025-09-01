import { useState } from 'react';
import api from '../services/api';

const Home = () => {
  // Estados para armazenar os dados e controlar a UI
  const [searchTerm, setSearchTerm] = useState(''); 
  const [movies, setMovies] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Função de chamada 
  const handleSearch = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página ao submeter o formulário
    
    if (!searchTerm) return; 

    setIsLoading(true); 
    setError(null); 
    setMovies([]); 

    try {
      // Faz a chamada à API usando nosso serviço
      const response = await api.get('/search/movie', {
        params: {
          query: searchTerm,
          page: 1, 
        },
      });

      if (response.data.results.length === 0) {
        setError("Nenhum filme encontrado com este termo.");
      }

      setMovies(response.data.results); // Guarda os resultados no estado
    } catch (err) {
      setError("Erro ao buscar filmes. Tente novamente mais tarde.");
      console.error(err); 
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <h1>Encontre seu Filme Favorito</h1>
      
      {/* Formulário de Busca */}
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Digite o nome de um filme..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {/* Exibição condicional de Loading e Erros */}
      {isLoading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Listagem dos Filmes (por enquanto, apenas os títulos) */}
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;