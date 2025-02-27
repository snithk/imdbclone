import type { Movie, MovieDetails } from "@shared/schema";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "84b19fcd";
const API_URL = "https://www.omdbapi.com";

// Popular movies across different genres
const POPULAR_MOVIE_QUERIES = [
  // Action & Adventure
  "The Dark Knight",
  "Inception",
  "Avengers",
  "Gladiator",
  // Drama
  "The Shawshank Redemption",
  "The Godfather",
  "Forrest Gump",
  // Sci-Fi
  "Interstellar",
  "Matrix",
  "Avatar",
  // Telugu Cinema
  "RRR",
  "Baahubali",
  "Pushpa",
  // Animation
  "Toy Story",
  "Lion King",
  // Crime
  "Pulp Fiction",
  "The Silence of the Lambs",
  // Romance
  "Titanic",
  "La La Land",
  "Casablanca"
];

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];

  try {
    const response = await fetch(
      `${API_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    );
    const data = await response.json();

    if (data.Response === "False") {
      return [];
    }

    return data.Search;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
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

export async function getPopularMovies(): Promise<Movie[]> {
  try {
    const moviesPromises = POPULAR_MOVIE_QUERIES.map(title => 
      fetch(`${API_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}&type=movie`)
        .then(res => res.json())
        .then(data => data.Response === "True" ? data : null)
    );

    const movies = await Promise.all(moviesPromises);
    return movies.filter(movie => movie !== null);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}