const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export async function getMovieTrailer(movieTitle: string): Promise<string | null> {
    if (!API_KEY) {
        console.warn('YOUTUBE_API_KEY is not defined in environment variables.');
        return null;
    }

    const query = `${movieTitle} Official Trailer`;
    const url = `${BASE_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}&maxResults=1`;

    // console.log(`[YouTube] Fetching trailer with URL: ${url}`);
    try {
        const res = await fetch(url, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!res.ok) {
            console.error(`YouTube API request failed with status ${res.status}`);
            return null;
        }

        const data = await res.json();
        // console.log(`[YouTube] Trailer response for "${movieTitle}":`, data);

        if (data.items && data.items.length > 0) {
            return data.items[0].id.videoId;
        }

        return null;
    } catch (error) {
        console.error('Error fetching movie trailer:', error);
        return null;
    }
}

export function getYoutubeTrailerUrl(movieTitle: string): string {
    const query = `${movieTitle} Official Trailer`;
    // Mask API Key for display
    return `${BASE_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&key=*****&maxResults=1`;
}
