"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const triggerSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto group z-50">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/30 to-green-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex items-center w-full h-16 rounded-full bg-gray-100 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-2xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-white/20 hover:border-gray-300 dark:hover:border-white/30 focus-within:ring-2 focus-within:ring-brand-accent/50 focus-within:bg-gray-200 dark:focus-within:bg-white/20">
        <div className="pl-6 text-gray-500 dark:text-gray-200 group-focus-within:text-brand-accent transition-colors duration-300">
          <Search className="w-6 h-6" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Buscar películas, series, actores..."
          className="w-full h-full bg-transparent border-none outline-none text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 px-4 font-light tracking-wide"
        />
        <button
          onClick={triggerSearch}
          className="mr-2 px-8 py-3 bg-brand-accent hover:bg-brand-accent/80 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-accent/20 flex items-center gap-2"
        >
          <span>Buscar</span>
        </button>
      </div>
    </div>
  );
};
