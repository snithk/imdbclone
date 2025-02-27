import type { Movie, MovieDetails } from "@shared/schema";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "84b19fcd";
const API_URL = "https://www.omdbapi.com";

// Telugu movies title queries for better search results
const TELUGU_MOVIE_QUERIES = [
  "RRR",
  "Baahubali",
  "Pushpa",
  "Magadheera",
  "KGF",
  "Rangasthalam",
  "Arjun Reddy"
];

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

export async function getTeluguMovies(): Promise<Movie[]> {
  try {
    const moviesPromises = TELUGU_MOVIE_QUERIES.map(title => 
      fetch(`${API_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}&type=movie`)
        .then(res => res.json())
        .then(data => data.Response === "True" ? data : null)
    );

    const movies = await Promise.all(moviesPromises);
    return movies.filter(movie => movie !== null);
  } catch (error) {
    console.error("Error fetching Telugu movies:", error);
    return [];
  }
}