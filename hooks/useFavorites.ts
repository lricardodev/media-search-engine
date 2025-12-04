'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/types';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            try {
                const parsedFavorites = JSON.parse(storedFavorites);
                // Use setTimeout to avoid synchronous state update warning during effect
                setTimeout(() => {
                    setFavorites(parsedFavorites);
                }, 0);
            } catch (error) {
                console.error('Error parsing favorites from localStorage:', error);
            }
        }
    }, []);

    const saveFavorites = (newFavorites: Movie[]) => {
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const addFavorite = (movie: Movie) => {
        if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
            const newFavorites = [...favorites, movie];
            saveFavorites(newFavorites);
        }
    };

    const removeFavorite = (imdbID: string) => {
        const newFavorites = favorites.filter((fav) => fav.imdbID !== imdbID);
        saveFavorites(newFavorites);
    };

    const isFavorite = (imdbID: string) => {
        return favorites.some((fav) => fav.imdbID === imdbID);
    };

    return { favorites, addFavorite, removeFavorite, isFavorite };
}
