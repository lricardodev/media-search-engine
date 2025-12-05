"use client";

import { useEffect, useState } from "react";
import { Movie, MovieDetail } from "@/types";
import { getMovieDetail } from "@/lib/api/omdb";
import { SearchFilters } from "@/components/molecules/SearchFilters";
import { MovieCardContainer } from "@/components/molecules/MovieCard/MovieCardContainer";
import { MovieListItem } from "@/components/molecules/MovieListItem";
import { Loader2 } from "lucide-react";

interface SearchClientProps {
  initialMovies: Movie[];
  totalResults: number;
}

export function SearchClient({
  initialMovies,
  totalResults,
}: SearchClientProps) {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [genreFilter, setGenreFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // Fetch details for all movies to get Genre and Rating
        const detailsPromises = initialMovies.map((movie) =>
          fetch(`/api/movie/${movie.imdbID}`).then((res) => res.json())
        );
        const details = await Promise.all(detailsPromises);
        const validDetails = details.filter((d) => d && d.Response !== "False");
        setMovies(validDetails);

        // Extract available genres
        const genres = new Set<string>();
        validDetails.forEach((movie) => {
          if (movie.Genre && movie.Genre !== "N/A") {
            movie.Genre.split(", ").forEach((g: string) => genres.add(g));
          }
        });
        setAvailableGenres(Array.from(genres).sort());
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (initialMovies.length > 0) {
      fetchDetails();
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [initialMovies]);

  const filteredMovies = movies.filter((movie) => {
    if (genreFilter && (!movie.Genre || !movie.Genre.includes(genreFilter))) {
      return false;
    }
    if (ratingFilter) {
      const rating = parseFloat(movie.imdbRating);
      if (isNaN(rating) || rating < parseFloat(ratingFilter)) {
        return false;
      }
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2
          className="animate-spin text-blue-500 dark:text-brand-accent"
          size={48}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchFilters
        view={view}
        onViewChange={setView}
        onGenreChange={setGenreFilter}
        onRatingChange={setRatingFilter}
        availableGenres={availableGenres}
      />

      {filteredMovies.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-netflix-dark-gray rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No hay resultados que coincidan con tus filtros.
          </p>
          <button
            onClick={() => {
              setGenreFilter("");
              setRatingFilter("");
            }}
            className="mt-2 text-blue-600 dark:text-brand-accent hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <>
          {view === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMovies.map((movie) => (
                <MovieCardContainer key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMovies.map((movie) => (
                <MovieListItem key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
