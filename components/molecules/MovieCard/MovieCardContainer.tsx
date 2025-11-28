"use client";

import React from "react";
import { Movie } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";
import { MovieCard } from "./index";

interface MovieCardContainerProps {
  movie: Movie;
}

export const MovieCardContainer: React.FC<MovieCardContainerProps> = ({
  movie,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const toggleFavorite = (m: Movie) => {
    if (favorite) {
      removeFavorite(m.imdbID);
    } else {
      addFavorite(m);
    }
  };

  return (
    <MovieCard
      movie={movie}
      isFavorite={favorite}
      onToggleFavorite={toggleFavorite}
    />
  );
};
