import type { Movie } from "@shared/schema";

const STORAGE_KEY = "favorite_movies";

export function getFavorites(): Movie[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(movie: Movie) {
  const favorites = getFavorites();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...favorites, movie])
  );
}

export function removeFavorite(id: string) {
  const favorites = getFavorites();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites.filter(m => m.imdbID !== id))
  );
}

export function isFavorite(id: string): boolean {
  return getFavorites().some(m => m.imdbID === id);
}
