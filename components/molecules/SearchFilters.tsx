"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { LayoutGrid, List as ListIcon, X } from "lucide-react";

interface SearchFiltersProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  onGenreChange: (genre: string) => void;
  onRatingChange: (rating: string) => void;
  availableGenres: string[];
}

export function SearchFilters({
  view,
  onViewChange,
  onGenreChange,
  onRatingChange,
  availableGenres,
}: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [year, setYear] = useState(searchParams.get("y") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");

  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset page when filtering
      params.set("page", "1");
      router.push(`/search?${params.toString()}`);
    },
    [searchParams, router]
  );

  // Debounce year input
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentYear = searchParams.get("y") || "";
      if (year !== currentYear) {
        updateSearchParams("y", year);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [year, searchParams, updateSearchParams]);

  const handleTypeChange = (newType: string) => {
    setType(newType);
    updateSearchParams("type", newType);
  };

  const handleGenreChange = (newGenre: string) => {
    setGenre(newGenre);
    onGenreChange(newGenre);
  };

  const handleRatingChange = (newRating: string) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  const clearFilters = () => {
    setYear("");
    setType("");
    setGenre("");
    setRating("");
    onGenreChange("");
    onRatingChange("");
    router.push(`/search?q=${searchParams.get("q") || ""}`);
  };

  return (
    <div className="bg-white dark:bg-netflix-dark-gray p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filtros
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewChange("grid")}
            className={`p-2 rounded-md ${
              view === "grid"
                ? "bg-blue-100 text-blue-600 dark:bg-brand-accent/20 dark:text-brand-accent"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`p-2 rounded-md ${
              view === "list"
                ? "bg-blue-100 text-blue-600 dark:bg-brand-accent/20 dark:text-brand-accent"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            aria-label="List view"
          >
            <ListIcon size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Year Filter (Server-side) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Año
          </label>
          <input
            type="number"
            placeholder="e.g. 2023"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-brand-accent bg-white dark:bg-black text-gray-900 dark:text-white"
          />
        </div>

        {/* Type Filter (Server-side) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo
          </label>
          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-brand-accent bg-white dark:bg-black text-gray-900 dark:text-white"
          >
            <option value="">Todo</option>
            <option value="movie">Película</option>
            <option value="series">Serie</option>
            <option value="episode">Episodio</option>
          </select>
        </div>

        {/* Genre Filter (Client-side) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {" "}
            Género
          </label>
          <select
            value={genre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-brand-accent bg-white dark:bg-black text-gray-900 dark:text-white"
          >
            <option value="">Todo</option>
            {availableGenres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter (Client-side) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Calificación Mínima
          </label>
          <select
            value={rating}
            onChange={(e) => handleRatingChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-brand-accent bg-white dark:bg-black text-gray-900 dark:text-white"
          >
            <option value="">Todo</option>
            <option value="9">9+ ⭐⭐⭐⭐⭐</option>
            <option value="8">8+ ⭐⭐⭐⭐</option>
            <option value="7">7+ ⭐⭐⭐</option>
            <option value="6">6+ ⭐⭐</option>
            <option value="5">5+ ⭐</option>
          </select>
        </div>
      </div>

      {(year || type || genre || rating) && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1"
          >
            <X size={16} /> Limpiar Filtros
          </Button>
        </div>
      )}
    </div>
  );
}
