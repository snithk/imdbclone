import { useState, useEffect } from "react";
import type { Movie } from "@shared/schema";
import { getFavorites, removeFavorite } from "@/lib/favorites";
import MovieCard from "@/components/MovieCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
        <p className="text-muted-foreground">
          Start adding movies to your favorites list!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={() => handleRemoveFavorite(movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
}
