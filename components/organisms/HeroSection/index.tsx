import Link from "next/link";
import { Play, Info } from "lucide-react";
import { Movie } from "@/types";

interface HeroSectionProps {
  movie: Movie | null;
}

export function HeroSection({ movie }: HeroSectionProps) {
  return (
    <section className="h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        {movie && (
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
            {movie ? movie.Title : "Película Destacada"}
          </h1>
          <div className="flex items-center gap-4 text-lg font-medium text-gray-200">
            <span className="text-brand-accent font-bold">
              98% de Coincidencia
            </span>
            <span>{movie?.Year}</span>
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
              href={movie ? `/movie/${movie.imdbID}#trailer` : "#"}
              className="flex items-center gap-2 px-8 py-3 bg-brand-accent text-white rounded hover:bg-brand-accent/90 transition-colors font-bold text-lg shadow-lg shadow-brand-accent/30"
            >
              <Play className="fill-current w-6 h-6" /> Trailer
            </Link>
            <Link
              href={movie ? `/movie/${movie.imdbID}` : "#"}
              className="flex items-center gap-2 px-8 py-3 bg-gray-200/80 dark:bg-gray-500/40 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500/60 transition-colors font-bold text-lg backdrop-blur-sm"
            >
              <Info className="w-6 h-6" /> Más Información
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
