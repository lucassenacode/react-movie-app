import { useState, useEffect } from 'react';

const useFavorites = () => {
  // Começa o estado lendo do localStorage. Se não houver nada, começa com um array vazio.
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Erro ao ler favoritos do localStorage", error);
      return [];
    }
  });

  // useEffect que salva os favoritos no localStorage sempre que o estado 'favorites' muda.
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Erro ao salvar favoritos no localStorage", error);
    }
  }, [favorites]);

  const addFavorite = (movie) => {
    // Adiciona o filme ao array de favoritos, evitando duplicatas
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (movieId) => {
    // Filtra o array, mantendo apenas os filmes cujo id é DIFERENTE do movieId a ser removido
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };
  
  // Retorna o estado e as funções para que os componentes possam usá-los
  return { favorites, addFavorite, removeFavorite };
};

export default useFavorites;