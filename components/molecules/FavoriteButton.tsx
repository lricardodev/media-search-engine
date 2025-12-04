"use client";

import { Button } from "@/components/atoms/Button";
import { useFavorites } from "@/hooks/useFavorites";
import { MovieDetail } from "@/types";
import { Heart } from "lucide-react";

export function FavoriteButton({ movie }: { movie: MovieDetail }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Button
      onClick={toggleFavorite}
      className={favorite ? "bg-red-100 text-red-600 hover:bg-red-200" : ""}
      aria-label={favorite ? "Remove from Favorites" : "Add to Favorites"}
    >
      <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
    </Button>
  );
}
