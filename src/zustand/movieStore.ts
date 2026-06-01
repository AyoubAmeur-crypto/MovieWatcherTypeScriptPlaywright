import { create } from "zustand"

export type WatchlistItem = {
  id: string
  title: string
  createdAt: string
}

type MovieStore = {
    querry: string
    page: number
    watchlist: WatchlistItem[]

    setQuerry: (querry: string) => void
    setPage: (page: number) => void
    setIncrementPage: (page: number) => void
    setDecremnetPage: (page: number) => void
    addToWatchlist: (title: string) => void
    removeFromWatchlist: (id: string) => void
}

export const useMovieStore = create<MovieStore>((set) => ({
    page: 1,
    querry: "",
    watchlist: [],

    setQuerry: (querry: string) => set({ querry }),
    setPage: (page: number) => set({ page }),
    setDecremnetPage: (page: number) => set({ page: page - 1 }),
    setIncrementPage: (page: number) => set({ page: page + 1 }),
    
    addToWatchlist: (title: string) => set((state) => ({
      watchlist: [
        ...state.watchlist,
        {
          id: Date.now().toString(),
          title,
          createdAt: new Date().toISOString(),
        },
      ],
    })),
    
    removeFromWatchlist: (id: string) => set((state) => ({
      watchlist: state.watchlist.filter((item) => item.id !== id),
    })),
}))