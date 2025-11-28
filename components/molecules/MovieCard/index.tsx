/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Movie } from "@/types";
import { Button } from "@/components/atoms/Button";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link
        href={`/movie/${movie.imdbID}`}
        className="block relative aspect-[2/3] overflow-hidden bg-gray-200"
      >
        {movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="sm"
            className={`!p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${
              isFavorite ? "text-red-500" : "text-gray-400"
            }`}
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(movie);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </Button>
        </div>
      </Link>
      <div className="p-4">
        <h3
          className="text-lg font-semibold text-gray-900 truncate"
          title={movie.Title}
        >
          {movie.Title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-500">{movie.Year}</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600 capitalize">
            {movie.Type}
          </span>
        </div>
      </div>
    </div>
  );
};
