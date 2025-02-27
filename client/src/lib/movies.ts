import type { Movie, MovieDetails } from "@shared/schema";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "84b19fcd";
const API_URL = "https://www.omdbapi.com";

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];
  
  const response = await fetch(
    `${API_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
  );
  const data = await response.json();
  
  if (data.Response === "False") {
    return [];
  }
  
  return data.Search;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const response = await fetch(
    `${API_URL}/?apikey=${API_KEY}&i=${id}&plot=full`
  );
  const data = await response.json();
  
  if (data.Response === "False") {
    throw new Error(data.Error);
  }
  
  return data;
}
