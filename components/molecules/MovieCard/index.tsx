/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SafeImage } from "@/components/atoms/SafeImage";
import { Movie } from "@/types";
import { Heart } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export const MovieCard = ({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) => {
  return (
    <div className="group relative flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      <Link
        href={`/movie/${movie.imdbID}`}
        className="block relative aspect-[2/3] overflow-hidden bg-gray-100"
      >
        <SafeImage
          src={movie.Poster}
          alt={movie.Title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="sm"
            className={`!p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm ${
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(movie);
            }}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </Link>

      <div className="p-3 flex flex-col flex-grow">
        <Link href={`/movie/${movie.imdbID}`} className="hover:underline">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
            {movie.Title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
            {movie.Year}
          </span>
          <span className="text-xs text-gray-400 capitalize">{movie.Type}</span>
        </div>
      </div>
    </div>
  );
};
