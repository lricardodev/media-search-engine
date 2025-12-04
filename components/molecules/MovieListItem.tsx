import { MovieDetail } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "./FavoriteButton";

interface MovieListItemProps {
  movie: MovieDetail;
}

export function MovieListItem({ movie }: MovieListItemProps) {
  return (
    <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-32 h-48 flex-shrink-0 bg-gray-100">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <Link href={`/movie/${movie.imdbID}`}>
              <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 mb-1">
                {movie.Title}
              </h3>
            </Link>
            <FavoriteButton movie={movie} />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span className="bg-gray-100 px-2 py-0.5 rounded">
              {movie.Year}
            </span>
            <span className="capitalize">{movie.Type}</span>
            {movie.Rated && <span>• {movie.Rated}</span>}
            {movie.Runtime && <span>• {movie.Runtime}</span>}
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
            {movie.Plot !== "N/A" ? movie.Plot : "No plot available."}
          </p>
          <div className="flex flex-wrap gap-2">
            {movie.Genre &&
              movie.Genre.split(", ").map((g) => (
                <span
                  key={g}
                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold">{movie.imdbRating}</span>
              <span className="text-gray-500 text-sm">/10</span>
            </div>
          )}
          {movie.Director && movie.Director !== "N/A" && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Director:</span> {movie.Director}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
