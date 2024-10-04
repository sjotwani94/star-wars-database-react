import { create } from 'zustand';
import { MovieDetails } from '../models/MovieDetails';

interface AppState {
    activePage: number;
    moviesList: MovieDetails[];
    setActivePage: (activePage: number) => void;
    setMoviesList: (moviesList: MovieDetails[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
    activePage: 1,
    moviesList: [],
    setActivePage: (activePage: number) => set({ activePage }),
    setMoviesList: (moviesList: MovieDetails[]) => set({ moviesList }),
}));
