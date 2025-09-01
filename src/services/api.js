import axios from "axios";

// Pega a chave da API do arquivo .env
const apiKey = import.meta.env.VITE_APP_API_KEY;

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language: "pt-BR",
  },
});

export default api;
