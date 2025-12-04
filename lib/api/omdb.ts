import { MovieDetail, SearchResponse } from '@/types';

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

if (!API_KEY) {
    console.warn('OMDB_API_KEY is not defined in environment variables.');
}

export async function searchMovies(query: string, page: number = 1, type?: string, year?: string): Promise<SearchResponse> {
    if (!query) return { Search: [], totalResults: '0', Response: 'False', Error: 'No query provided' };

    const typeParam = type ? `&type=${type}` : '';
    const yearParam = year ? `&y=${year}` : '';
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}${typeParam}${yearParam}`;

    try {
        const res = await fetch(url, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error searching movies:', error);
        return { Search: [], totalResults: '0', Response: 'False', Error: 'Failed to fetch data' };
    }
}

export async function getMovieDetail(id: string): Promise<MovieDetail | null> {
    if (!id) return null;

    const url = `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`;

    try {
        const res = await fetch(url, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();

        if (data.Response === 'False') {
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching movie detail:', error);
        return null;
    }
}
