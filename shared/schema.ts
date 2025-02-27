import { z } from "zod";

export const movieSchema = z.object({
  imdbID: z.string(),
  Title: z.string(),
  Year: z.string(),
  Poster: z.string(),
  Type: z.string()
});

export const movieDetailsSchema = movieSchema.extend({
  Plot: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Actors: z.string(),
  imdbRating: z.string(),
  Released: z.string()
});

export type Movie = z.infer<typeof movieSchema>;
export type MovieDetails = z.infer<typeof movieDetailsSchema>;
