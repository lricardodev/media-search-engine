import { searchMovies, getOmdbSearchUrl } from "@/lib/api/omdb";
import { Movie, SearchResponse } from "@/types";

// Helper to measure latency
const fetchWithTiming = async <T,>(fn: () => Promise<T>) => {
    const start = Date.now();
    const data = await fn();
    const end = Date.now();
    return { data, latency: end - start };
};

export interface HomePageData {
    heroMovie: Movie | null;
    featuredMovies: Movie[];
    popularSeries: Movie[];
    debugEntries: {
        source: string;
        url: string;
        latency: number;
        response: SearchResponse | Movie | null;
    }[];
}

export async function getHomePageData(): Promise<HomePageData> {
    const [
        featuredMovies1,
        featuredMovies2,
        popularSeries1,
        popularSeries2,
        heroMovieResult,
    ] = await Promise.all([
        fetchWithTiming(() => searchMovies("movie", 1, "movie")),
        fetchWithTiming(() => searchMovies("movie", 2, "movie")),
        fetchWithTiming(() => searchMovies("Star Wars", 1, "series")),
        fetchWithTiming(() => searchMovies("Star Wars", 2, "series")),
        fetchWithTiming(() => searchMovies("zootopia 2", 1, "movie")),
    ]);

    const featuredMoviesData1 = featuredMovies1.data;
    const featuredMoviesData2 = featuredMovies2.data;
    const popularSeriesData1 = popularSeries1.data;
    const popularSeriesData2 = popularSeries2.data;

    const featuredMovies = Array.from(
        new Map(
            [
                ...(featuredMoviesData1.Search || []),
                ...(featuredMoviesData2.Search || []),
            ].map((movie) => [movie.imdbID, movie])
        ).values()
    );
    const popularSeries = Array.from(
        new Map(
            [
                ...(popularSeriesData1.Search || []),
                ...(popularSeriesData2.Search || []),
            ].map((series) => [series.imdbID, series])
        ).values()
    );

    const heroMovie = heroMovieResult.data.Search?.[0] || featuredMovies[0] || null;

    const debugEntries = [
        {
            source: "OMDb Search (movie, Page 1)",
            url: getOmdbSearchUrl("movie", 1, "movie"),
            latency: featuredMovies1.latency,
            response: featuredMoviesData1,
        },
        {
            source: "OMDb Search (movie, Page 2)",
            url: getOmdbSearchUrl("movie", 2, "movie"),
            latency: featuredMovies2.latency,
            response: featuredMoviesData2,
        },
        {
            source: "OMDb Search (Star Wars, Page 1)",
            url: getOmdbSearchUrl("Star Wars", 1, "series"),
            latency: popularSeries1.latency,
            response: popularSeriesData1,
        },
        {
            source: "OMDb Search (Star Wars, Page 2)",
            url: getOmdbSearchUrl("Star Wars", 2, "series"),
            latency: popularSeries2.latency,
            response: popularSeriesData2,
        },
        {
            source: "OMDb Search (zootopia 2)",
            url: getOmdbSearchUrl("zootopia 2", 1, "movie"),
            latency: heroMovieResult.latency,
            response: heroMovieResult.data,
        },
    ];

    return {
        heroMovie,
        featuredMovies,
        popularSeries,
        debugEntries,
    };
}
