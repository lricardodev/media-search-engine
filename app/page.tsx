import { SearchBar } from "@/components/molecules/SearchBar";
import { searchMovies } from "@/lib/api/omdb";
import { MovieCardContainer } from "@/components/molecules/MovieCard/MovieCardContainer";
import Link from "next/link";

import { Clapperboard, Smile, Tv, Calendar } from "lucide-react";

export default async function Home() {
  // Fetch some initial data for "Featured" and "Popular Series"
  // Since OMDb doesn't have a trending endpoint, we'll search for popular keywords
  const featuredMoviesData = await searchMovies("Marvel", 1, "movie");
  const popularSeriesData = await searchMovies("Star Wars", 1, "series");

  const featuredMovies = featuredMoviesData.Search?.slice(0, 4) || [];
  const popularSeries = popularSeriesData.Search?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-black text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">
            Encuentra tu Próximo <span className="text-blue-400">Favorito</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Explora millones de películas y series. Descubre tramas,
            calificaciones y guarda lo que más te gusta.
          </p>
          <div className="max-w-3xl mx-auto mb-12">
            <SearchBar />
          </div>
          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            <Link
              href="/search?q=Action&type=movie"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm flex items-center gap-2"
            >
              <Clapperboard className="w-4 h-4" /> Acción
            </Link>
            <Link
              href="/search?q=Comedy&type=movie"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm flex items-center gap-2"
            >
              <Smile className="w-4 h-4" /> Comedia
            </Link>
            <Link
              href="/search?q=Drama&type=series"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm flex items-center gap-2"
            >
              <Tv className="w-4 h-4" /> Drama Series
            </Link>
            <Link
              href="/search?q=2024&type=movie"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Estrenos 2024
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Películas Destacadas
          </h2>
          <Link
            href="/search?q=Marvel&type=movie"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Ver más &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredMovies.map((movie) => (
            <MovieCardContainer key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </section>

      {/* Popular Series Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Series Populares
            </h2>
            <Link
              href="/search?q=Star Wars&type=series"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver más &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularSeries.map((series) => (
              <MovieCardContainer key={series.imdbID} movie={series} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
