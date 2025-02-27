import { useState } from "react";
import { useLocation } from "wouter";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Film } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <Film className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to IMDB Clone</h1>
          <p className="text-muted-foreground mb-6">
            Search for movies and add them to your favorites
          </p>
          <SearchBar onSelect={(id) => setLocation(`/movie/${id}`)} />
        </CardContent>
      </Card>
    </div>
  );
}
