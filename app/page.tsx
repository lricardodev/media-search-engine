import { Suspense } from "react";
import { SearchBar } from "@/components/molecules/SearchBar";
import { DebugPanel } from "@/components/molecules/DebugPanel";
import { DeveloperBadge } from "@/components/molecules/DeveloperBadge";
import { HeroSection } from "@/components/organisms/HeroSection";
import { MovieGridSection } from "@/components/organisms/MovieGridSection";
import { getHomePageData } from "@/lib/services/home";

export default async function Home(): Promise<React.JSX.Element> {
  const { heroMovie, featuredMovies, popularSeries, debugEntries } =
    await getHomePageData();

  return (
    <div className="min-h-screen bg-white dark:bg-netflix-black transition-colors duration-300">
      <DebugPanel entries={debugEntries} />

      {/* Hero Section */}
      <HeroSection movie={heroMovie} />

      {/* Search Section */}
      <section className="relative z-10 -mt-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div>Cargando búsqueda...</div>}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      {/* Featured Movies Section */}
      <MovieGridSection
        title="Tendencias Ahora"
        movies={featuredMovies}
        viewAllLink="/search?q=movie&type=movie"
        className="pt-28"
      />

      {/* Popular Series Section */}
      <MovieGridSection
        title="Series Populares"
        movies={popularSeries}
        viewAllLink="/search?q=Star Wars&type=series"
        className="py-8 pb-20"
      />

      {/* Developer Badge */}
      <DeveloperBadge />
    </div>
  );
}
