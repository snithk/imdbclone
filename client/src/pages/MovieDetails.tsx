import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { getMovieDetails } from "@/lib/movies";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDetails() {
  const { id } = useParams();
  const [favorite, setFavorite] = useState(false);

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id
  });

  useEffect(() => {
    if (id) {
      setFavorite(isFavorite(id));
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!movie) return;
    
    if (favorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
    setFavorite(!favorite);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="w-64 h-96" />
              <div className="flex-1">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/4 mb-6" />
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
              alt={movie.Title}
              className="w-64 h-96 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFavorite}
                  className={favorite ? "text-red-500" : ""}
                >
                  <Heart className={`h-6 w-6 ${favorite ? "fill-current" : ""}`} />
                </Button>
              </div>
              <p className="text-muted-foreground mb-6">
                {movie.Year} • {movie.Runtime} • {movie.Genre}
              </p>
              <p className="mb-4">{movie.Plot}</p>
              <dl className="grid gap-2">
                <div className="grid grid-cols-[120px,1fr]">
                  <dt className="font-medium">Director</dt>
                  <dd>{movie.Director}</dd>
                </div>
                <div className="grid grid-cols-[120px,1fr]">
                  <dt className="font-medium">Cast</dt>
                  <dd>{movie.Actors}</dd>
                </div>
                <div className="grid grid-cols-[120px,1fr]">
                  <dt className="font-medium">Released</dt>
                  <dd>{movie.Released}</dd>
                </div>
                <div className="grid grid-cols-[120px,1fr]">
                  <dt className="font-medium">IMDB Rating</dt>
                  <dd>{movie.imdbRating}/10</dd>
                </div>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
