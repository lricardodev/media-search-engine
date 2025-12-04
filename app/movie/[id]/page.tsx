import { getMovieDetail, getRecommendations } from "@/lib/api/omdb";
import { getMovieTrailer } from "@/lib/api/youtube";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import { FavoriteButton } from "@/components/molecules/FavoriteButton";
import {
  Star,
  Clock,
  Calendar,
  Film,
  Award,
  User,
  Users,
  Video,
} from "lucide-react";

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
        <h2 className="text-2xl font-bold text-gray-900">
          Película no encontrada
        </h2>
        <Link
          href="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Regresar a la página principal
        </Link>
      </div>
    );
  }

  // Fetch recommendations based on the primary genre
  const recommendations = await getRecommendations(movie.Genre);

  // Get high-res poster by replacing SX300 with SX1000 or removing the size limit
  const highResPoster =
    movie.Poster !== "N/A" ? movie.Poster.replace("SX300", "SX1000") : null;

  // Fetch trailer from YouTube API
  const trailerVideoId = await getMovieTrailer(movie.Title);

  return (
    <div className="space-y-8">
      {/* Main Detail Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Poster Column */}
          <div className="md:flex-shrink-0 md:w-1/3 lg:w-1/4 bg-gray-900 flex items-center justify-center">
            {highResPoster ? (
              <img
                className="w-full h-full object-cover"
                src={highResPoster}
                alt={movie.Title}
              />
            ) : (
              <div className="h-96 w-full flex items-center justify-center text-gray-500 bg-gray-200">
                <Film className="w-16 h-16 opacity-50" />
              </div>
            )}
          </div>

          {/* Content Column */}
          <div className="p-8 w-full md:w-2/3 lg:w-3/4 flex flex-col">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {movie.Title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="px-2 py-1 bg-gray-100 rounded-md font-medium border border-gray-200">
                    {movie.Rated}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {movie.Year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {movie.Runtime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Film className="w-4 h-4" />
                    {movie.Genre}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end min-w-[100px]">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-6 h-6 fill-current" />
                  <span className="text-2xl font-bold text-gray-900">
                    {movie.imdbRating}
                  </span>
                  <span className="text-sm text-gray-500">/10</span>
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  {movie.imdbVotes} votos
                </span>
                {movie.Metascore !== "N/A" && (
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-sm font-bold text-white rounded ${
                        parseInt(movie.Metascore) >= 60
                          ? "bg-green-600"
                          : parseInt(movie.Metascore) >= 40
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                    >
                      {movie.Metascore}
                    </span>
                    <span className="text-xs text-gray-500">Metascore</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sinopsis
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {movie.Plot}
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <User className="w-4 h-4" /> Director
                  </h4>
                  <p className="text-gray-900 font-medium">{movie.Director}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Reparto
                  </h4>
                  <p className="text-gray-900 font-medium">{movie.Actors}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <User className="w-4 h-4" /> Guionistas
                  </h4>
                  <p className="text-gray-900 font-medium">{movie.Writer}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4" /> Premios
                  </h4>
                  <p className="text-gray-900 font-medium">{movie.Awards}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
              <FavoriteButton movie={movie} />
              <Link
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" className="flex items-center gap-2">
                  <span className="font-bold">IMDb</span> Ver ficha completa
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Video className="w-5 h-5" /> Tráiler
        </h3>
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          {trailerVideoId ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerVideoId}`}
              title={`${movie.Title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <p>No se encontró el tráiler</p>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations Section */}
      {recommendations.Search && recommendations.Search.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Títulos Similares
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendations.Search.filter((m) => m.imdbID !== movie.imdbID) // Exclude current movie
              .slice(0, 5) // Limit to 5 recommendations
              .map((rec) => (
                <Link
                  key={rec.imdbID}
                  href={`/movie/${rec.imdbID}`}
                  className="group"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                    {rec.Poster !== "N/A" ? (
                      <img
                        src={rec.Poster}
                        alt={rec.Title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Film className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {rec.Title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{rec.Year}</p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
