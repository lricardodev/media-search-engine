import { searchMovies } from "@/lib/api/omdb";
import { MovieCardContainer } from "@/components/molecules/MovieCard/MovieCardContainer";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";

// This is a Server Component
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const page = parseInt(params.page || "1", 10);

  const data = await searchMovies(query, page);
  const movies = data.Search || [];
  const totalResults = parseInt(data.totalResults || "0", 10);
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <SearchBar />
        {query && (
          <p className="text-gray-600">
            Found {totalResults} results for{" "}
            <span className="font-semibold">"{query}"</span>
          </p>
        )}
      </div>

      {data.Error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{data.Error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCardContainer key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              <Link href={`/search?q=${query}&page=${Math.max(1, page - 1)}`}>
                <Button disabled={page <= 1} variant="secondary">
                  Previous
                </Button>
              </Link>
              <span className="flex items-center px-4 text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Link
                href={`/search?q=${query}&page=${Math.min(
                  totalPages,
                  page + 1
                )}`}
              >
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
