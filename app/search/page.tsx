import { searchMovies } from "@/lib/api/omdb";
import { SearchClient } from "@/components/organisms/SearchClient";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";

// This is a Server Component
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    page?: string;
    y?: string;
    type?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const page = parseInt(params.page || "1", 10);
  const year = params.y;
  const type = params.type;

  const data = await searchMovies(query, page, type, year);
  const movies = data.Search || [];
  const totalResults = parseInt(data.totalResults || "0", 10);
  const totalPages = Math.ceil(totalResults / 10);

  // Helper to build pagination URL
  const buildPageUrl = (newPage: number) => {
    const urlParams = new URLSearchParams();
    if (query) urlParams.set("q", query);
    if (year) urlParams.set("y", year);
    if (type) urlParams.set("type", type);
    urlParams.set("page", newPage.toString());
    return `/search?${urlParams.toString()}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <SearchBar />
        {query && (
          <p className="text-gray-600">
            Found {totalResults} results for{" "}
            <span className="font-semibold">&quot;{query}&quot;</span>
          </p>
        )}
      </div>

      {data.Error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{data.Error}</p>
        </div>
      ) : (
        <>
          <SearchClient initialMovies={movies} totalResults={totalResults} />

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              <Link href={buildPageUrl(Math.max(1, page - 1))}>
                <Button disabled={page <= 1} variant="secondary">
                  Previous
                </Button>
              </Link>
              <span className="flex items-center px-4 text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Link href={buildPageUrl(Math.min(totalPages, page + 1))}>
                <Button disabled={page >= totalPages} variant="secondary">
                  Next
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
