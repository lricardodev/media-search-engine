import Link from "next/link";
import { MovieCardContainer } from "@/components/molecules/MovieCard/MovieCardContainer";
import { Movie } from "@/types";
import { cn } from "@/lib/utils";

interface MovieGridSectionProps {
  title: string;
  movies: Movie[];
  viewAllLink: string;
  className?: string;
}

export function MovieGridSection({
  title,
  movies,
  viewAllLink,
  className,
}: MovieGridSectionProps) {
  return (
    <section
      className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
    >
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-brand-accent transition-colors cursor-pointer">
          {title}
        </h2>
        <Link
          href={viewAllLink}
          className="text-sm font-medium text-brand-accent hover:underline"
        >
          Ver Todo
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="aspect-[2/3]">
            <MovieCardContainer movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
