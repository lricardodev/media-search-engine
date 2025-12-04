"use client";

import React, { useState } from "react";
import { Input } from "@/components/atoms/Input";
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
    <div className="w-full max-w-2xl mx-auto flex gap-2">
      <Input
        type="text"
        placeholder="Search movies, series..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="!h-12 !text-lg shadow-lg"
        icon={<Search className="w-6 h-6" />}
      />
      <button
        onClick={triggerSearch}
        className="px-6 h-12 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors shadow-lg"
      >
        Buscar
      </button>
    </div>
  );
};
