import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";
import type { Movie } from "@shared/schema";
import { Link } from "wouter";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/movie/${movie.imdbID}`}>
        <a>
          <div className="aspect-[2/3] relative">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
              alt={movie.Title}
              className="object-cover w-full h-full"
            />
          </div>
        </a>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold line-clamp-1">{movie.Title}</h3>
            <p className="text-sm text-muted-foreground">{movie.Year}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className={isFavorite ? "text-red-500" : ""}
          >
            {isFavorite ? <Heart className="h-5 w-5 fill-current" /> : <Heart className="h-5 w-5" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
