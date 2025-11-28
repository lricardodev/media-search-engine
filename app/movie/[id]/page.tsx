import { getMovieDetail } from "@/lib/api/omdb";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import { MovieDetail } from "@/types";

// This is a Server Component
export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetail(id);

  if (!movie) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Movie not found</h2>
        <Link
          href="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          {movie.Poster !== "N/A" ? (
            <img
              className="h-96 w-full object-cover md:w-96"
              src={movie.Poster}
              alt={movie.Title}
            />
          ) : (
            <div className="h-96 w-full md:w-96 bg-gray-200 flex items-center justify-center text-gray-500">
              No Poster
            </div>
          )}
        </div>
        <div className="p-8 w-full">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {movie.Title}
              </h1>
              <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                <span>{movie.Year}</span>
                <span>{movie.Rated}</span>
                <span>{movie.Runtime}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold text-yellow-500 flex items-center">
                ★ {movie.imdbRating}
              </span>
              <span className="text-xs text-gray-400">
                {movie.imdbVotes} votes
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Plot</h3>
            <p className="mt-2 text-gray-600 leading-relaxed">{movie.Plot}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Genre</h4>
              <p className="mt-1 text-gray-900">{movie.Genre}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Director</h4>
              <p className="mt-1 text-gray-900">{movie.Director}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Cast</h4>
              <p className="mt-1 text-gray-900">{movie.Actors}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Awards</h4>
              <p className="mt-1 text-gray-900">{movie.Awards}</p>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <FavoriteButton movie={movie} />
            <Link
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
            >
              <Button variant="secondary">View on IMDb</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Client Component for Favorite Button
import { useFavorites } from "@/hooks/useFavorites";

function FavoriteButton({ movie }: { movie: MovieDetail }) {
  "use client";
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
    >
      {favorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
}
