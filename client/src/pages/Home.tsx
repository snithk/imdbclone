import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Film } from "lucide-react";
import { getPopularMovies } from "@/lib/movies";
import MovieCard from "@/components/MovieCard";
import type { Movie } from "@shared/schema";
import { getFavorites } from "@/lib/favorites";

export default function Home() {
  const [, setLocation] = useLocation();
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      const movies = await getPopularMovies();
      setPopularMovies(movies);
    };

    const loadFavorites = () => {
      const favMovies = getFavorites();
      setFavorites(favMovies.map(m => m.imdbID));
    };

    loadPopularMovies();
    loadFavorites();
  }, []);

  const handleToggleFavorite = (movie: Movie) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(movie.imdbID);
      if (isFavorite) {
        return prev.filter(id => id !== movie.imdbID);
      } else {
        return [...prev, movie.imdbID];
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="mb-8">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <Film className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to IMDB Clone</h1>
          <p className="text-muted-foreground mb-6">
            Search through millions of movies or explore our curated collection
          </p>
          <SearchBar onSelect={(id) => setLocation(`/movie/${id}`)} />
        </CardContent>
      </Card>

      {popularMovies.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={favorites.includes(movie.imdbID)}
                onToggleFavorite={() => handleToggleFavorite(movie)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}