import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/lib/movies";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function SearchBar({ onSelect }: { onSelect: (value: string) => void }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: movies, isLoading } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchMovies(debouncedSearch),
    enabled: debouncedSearch.length > 2
  });

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />
      
      {isLoading && (
        <div className="absolute top-12 w-full bg-background rounded-md shadow-lg p-4 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}

      {movies && movies.length > 0 && (
        <Card className="absolute top-12 w-full bg-background rounded-md shadow-lg divide-y">
          {movies.map((movie) => (
            <button
              key={movie.imdbID}
              className="w-full p-2 text-left hover:bg-accent flex items-center gap-2"
              onClick={() => {
                onSelect(movie.imdbID);
                setSearch("");
              }}
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
                alt={movie.Title}
                className="h-12 w-8 object-cover"
              />
              <div>
                <div className="font-medium">{movie.Title}</div>
                <div className="text-sm text-muted-foreground">{movie.Year}</div>
              </div>
            </button>
          ))}
        </Card>
      )}
    </div>
  );
}
