import { SearchBar } from "@/components/molecules/SearchBar";
import { searchMovies, getOmdbSearchUrl } from "@/lib/api/omdb";
import { MovieCardContainer } from "@/components/molecules/MovieCard/MovieCardContainer";
import { DebugPanel } from "@/components/molecules/DebugPanel";
import { DeveloperBadge } from "@/components/molecules/DeveloperBadge";
import Link from "next/link";
import { Suspense } from "react";

import {
  Clapperboard,
  Smile,
  Tv,
  Calendar,
  Play,
  Plus,
  Info,
} from "lucide-react";

// Helper to measure latency
const fetchWithTiming = async <T,>(fn: () => Promise<T>) => {
  const start = Date.now();
  const data = await fn();
  const end = Date.now();
  return { data, latency: end - start };
};

export default async function Home(): Promise<React.JSX.Element> {
  // Fetch some initial data for "Featured" and "Popular Series"
  const [
    featuredMovies1,
    featuredMovies2,
    popularSeries1,
    popularSeries2,
    heroMovieResult,
  ] = await Promise.all([
    fetchWithTiming(() => searchMovies("movie", 1, "movie")),
    fetchWithTiming(() => searchMovies("movie", 2, "movie")),
    fetchWithTiming(() => searchMovies("Star Wars", 1, "series")),
    fetchWithTiming(() => searchMovies("Star Wars", 2, "series")),
    fetchWithTiming(() => searchMovies("zootopia 2", 1, "movie")),
  ]);

  const featuredMoviesData1 = featuredMovies1.data;
  const featuredMoviesData2 = featuredMovies2.data;
  const popularSeriesData1 = popularSeries1.data;
  const popularSeriesData2 = popularSeries2.data;

  const featuredMovies = Array.from(
    new Map(
      [
        ...(featuredMoviesData1.Search || []),
        ...(featuredMoviesData2.Search || []),
      ].map((movie) => [movie.imdbID, movie])
    ).values()
  );
  const popularSeries = Array.from(
    new Map(
      [
        ...(popularSeriesData1.Search || []),
        ...(popularSeriesData2.Search || []),
      ].map((series) => [series.imdbID, series])
    ).values()
  );

  // Prepare Debug Entries
  const debugEntries = [
    {
      source: "OMDb Search (movie, Page 1)",
      url: getOmdbSearchUrl("movie", 1, "movie"),
      latency: featuredMovies1.latency,
      response: featuredMoviesData1,
    },
    {
      source: "OMDb Search (movie, Page 2)",
      url: getOmdbSearchUrl("movie", 2, "movie"),
      latency: featuredMovies2.latency,
      response: featuredMoviesData2,
    },
    {
      source: "OMDb Search (Star Wars, Page 1)",
      url: getOmdbSearchUrl("Star Wars", 1, "series"),
      latency: popularSeries1.latency,
      response: popularSeriesData1,
    },
    {
      source: "OMDb Search (Star Wars, Page 2)",
      url: getOmdbSearchUrl("Star Wars", 2, "series"),
      latency: popularSeries2.latency,
      response: popularSeriesData2,
    },
    {
      source: "OMDb Search (zootopia 2)",
      url: getOmdbSearchUrl("zootopia 2", 1, "movie"),
      latency: heroMovieResult.latency,
      response: heroMovieResult.data,
    },
  ];

  // Featured Hero Movie (Simulated)
  // Featured Hero Movie (Simulated)
  const heroMovie = heroMovieResult.data.Search?.[0] || featuredMovies[0];

  return (
    <div className="min-h-screen bg-white dark:bg-netflix-black transition-colors duration-300">
      <DebugPanel entries={debugEntries} />

      {/* Hero Section */}
      <section className="h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {heroMovie && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/heroNetflix.jpg"
              alt="Hero Background"
              className="w-full h-full object-cover object-top opacity-60 dark:opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent dark:from-netflix-black dark:via-netflix-black/60 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent dark:from-netflix-black dark:via-transparent" />
          {/* Netflix-style Curved Bottom Border */}
          <div className="absolute -bottom-1 left-0 right-0 h-16 z-20 overflow-hidden pointer-events-none">
            <div className="absolute top-[50%] left-[-25%] w-[150%] h-[200%] rounded-[100%] border-t-4 border-green-500 shadow-[0_0_20px_rgba(57,255,20,0.4)] bg-transparent" />
          </div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-white drop-shadow-lg">
              {heroMovie ? heroMovie.Title : "Película Destacada"}
            </h1>
            <div className="flex items-center gap-4 text-lg font-medium text-gray-200">
              <span className="text-brand-accent font-bold">
                98% de Coincidencia
              </span>
              <span>{heroMovie?.Year}</span>
              <span className="border border-gray-500 px-2 py-0.5 rounded text-sm">
                HD
              </span>
            </div>
            <p className="text-xl text-gray-300 line-clamp-3 drop-shadow-md">
              Este proyecto es un buscador de películas. Descubre lo último y lo
              mejor en entretenimiento. Sumérgete en historias que cautivan e
              inspiran.
              {/* Note: OMDb search results don't have plot, would need detailed fetch */}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={heroMovie ? `/movie/${heroMovie.imdbID}#trailer` : "#"}
                className="flex items-center gap-2 px-8 py-3 bg-brand-accent text-white rounded hover:bg-brand-accent/90 transition-colors font-bold text-lg shadow-lg shadow-brand-accent/30"
              >
                <Play className="fill-current w-6 h-6" /> Trailer
              </Link>
              <Link
                href={heroMovie ? `/movie/${heroMovie.imdbID}` : "#"}
                className="flex items-center gap-2 px-8 py-3 bg-gray-200/80 dark:bg-gray-500/40 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500/60 transition-colors font-bold text-lg backdrop-blur-sm"
              >
                <Info className="w-6 h-6" /> Más Información
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative z-10 -mt-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div>Cargando búsqueda...</div>}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-brand-accent transition-colors cursor-pointer">
            Tendencias Ahora
          </h2>
          <Link
            href="/search?q=movie&type=movie"
            className="text-sm font-medium text-brand-accent hover:underline"
          >
            Ver Todo
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {featuredMovies.map((movie) => (
            <div key={movie.imdbID} className="aspect-[2/3]">
              <MovieCardContainer movie={movie} />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Series Section */}
      <section className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-brand-accent transition-colors cursor-pointer">
            Series Populares
          </h2>
          <Link
            href="/search?q=Star Wars&type=series"
            className="text-sm font-medium text-brand-accent hover:underline"
          >
            Ver Todo
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {popularSeries.map((series) => (
            <div key={series.imdbID} className="aspect-[2/3]">
              <MovieCardContainer movie={series} />
            </div>
          ))}
        </div>
      </section>
      {/* Developer Badge */}
      <DeveloperBadge />
    </div>
  );
}
