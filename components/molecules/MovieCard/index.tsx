import Link from "next/link";
import { SafeImage } from "@/components/atoms/SafeImage";
import { Movie } from "@/types";
import { Heart, Play, Info } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./MovieCard.module.css";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(
    () => {
      const container = containerRef.current;
      const info = infoRef.current;
      const image = imageRef.current;

      if (!container || !info || !image) return;

      const onMouseEnter = contextSafe(() => {
        gsap.to(container, {
          scale: 1.1,
          zIndex: 50,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 0 20px rgba(57, 255, 20, 0.4)",
        });
        gsap.to(info, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.1,
        });
        gsap.to(image, {
          filter: "brightness(0.4)",
          duration: 0.3,
        });
      });

      const onMouseLeave = contextSafe(() => {
        gsap.to(container, {
          scale: 1,
          zIndex: 1,
          duration: 0.3,
          ease: "power2.in",
          boxShadow: "none",
        });
        gsap.to(info, {
          opacity: 0,
          y: 20,
          duration: 0.2,
        });
        gsap.to(image, {
          filter: "brightness(1)",
          duration: 0.3,
        });
      });

      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    { scope: containerRef, dependencies: [contextSafe] }
  );

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col h-full bg-netflix-dark-gray rounded-md overflow-hidden transition-all duration-300 ${styles.cardContainer}`}
    >
      <Link
        href={`/movie/${movie.imdbID}`}
        className="block relative aspect-[2/3] w-full h-full"
      >
        <div className="relative w-full h-full">
          <SafeImage
            ref={imageRef}
            src={movie.Poster}
            alt={movie.Title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        <div
          ref={infoRef}
          className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 translate-y-4"
        >
          <div className="flex gap-2 mb-3">
            <Button
              variant="ghost"
              size="sm"
              className={`!p-2 rounded-full border-2 border-gray-400 hover:border-white hover:bg-white/10 ${
                isFavorite
                  ? "text-brand-accent border-brand-accent"
                  : "text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(movie);
              }}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
              />
            </Button>
            <button className="p-2 rounded-full border-2 border-gray-400 hover:border-white hover:bg-white/10 text-white ml-auto">
              <Info className="w-4 h-4" />
            </button>
          </div>

          <h3 className="font-bold text-white text-sm line-clamp-2 mb-1 drop-shadow-md">
            {movie.Title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
            <span className="text-brand-accent font-bold">{movie.Year}</span>
            <span className="capitalize border border-gray-500 px-1 rounded text-[10px]">
              {movie.Type === "movie"
                ? "Película"
                : movie.Type === "series"
                ? "Serie"
                : movie.Type}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
