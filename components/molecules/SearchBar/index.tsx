"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/atoms/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      router.push(`/search?q=${encodeURIComponent(debouncedQuery)}`);
    } else if (debouncedQuery === "" && initialQuery !== "") {
      // Optional: Clear search or go back to home if query is empty?
      // For now, let's just do nothing or maybe push to /search without query if that's valid
    }
  }, [debouncedQuery, router, initialQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Search movies, series..."
        value={query}
        onChange={handleSearch}
        className="!h-12 !text-lg shadow-lg"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        }
      />
    </div>
  );
};
