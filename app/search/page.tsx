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
  const uiPage = parseInt(params.page || "1", 10);
  const year = params.y;
  const type = params.type;

  // Fetch 2 pages from OMDb to show 20 items per UI page
  const apiPageStart = (uiPage - 1) * 2 + 1;

  const [data1, data2] = await Promise.all([
    searchMovies(query, apiPageStart, type, year),
    searchMovies(query, apiPageStart + 1, type, year),
  ]);

  const movies = Array.from(
    new Map(
      [...(data1.Search || []), ...(data2.Search || [])].map((m) => [
        m.imdbID,
        m,
      ])
    ).values()
  );

  // Use totalResults from the first valid response
  const totalResults = parseInt(
    data1.totalResults || data2.totalResults || "0",
    10
  );
  const totalPages = Math.ceil(totalResults / 20);

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
            Se encontraron {totalResults} resultados para{" "}
            <span className="font-semibold">&quot;{query}&quot;</span>
          </p>
        )}
      </div>

      {data1.Error &&
      data1.Error !== "Movie not found!" &&
      data1.Error !== "Series not found!" ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{data1.Error}</p>
        </div>
      ) : (
        <>
          <SearchClient initialMovies={movies} totalResults={totalResults} />

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              <Link href={buildPageUrl(Math.max(1, uiPage - 1))}>
                <Button disabled={uiPage <= 1} variant="secondary">
                  Anterior
                </Button>
              </Link>
              <span className="flex items-center px-4 text-gray-600">
                Página {uiPage} de {totalPages}
              </span>
              <Link href={buildPageUrl(Math.min(totalPages, uiPage + 1))}>
                <Button disabled={uiPage >= totalPages} variant="secondary">
                  Siguiente
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
