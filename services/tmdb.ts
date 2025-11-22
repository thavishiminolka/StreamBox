const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
};

export const tmdbApi = {
  getPopularMovies: () => 
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, options).then(res => res.json()),
  
  getTrendingMovies: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`, options).then(res => res.json()),
  
  searchMovies: (query: string) =>
    fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`, options).then(res => res.json()),
};