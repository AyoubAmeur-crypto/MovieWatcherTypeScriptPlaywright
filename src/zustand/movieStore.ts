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
  isLogin: boolean

  setQuerry: (querry: string) => void
  setPage: (page: number) => void
  setIncrementPage: () => void
  setDecremnetPage: () => void
  addToWatchlist: (title: string) => void
  removeFromWatchlist: (id: string) => void
  setLogin: (isLogin: boolean) => void
}

export const useMovieStore = create<MovieStore>((set) => ({
  page: 1,
  querry: "",
  isLogin: typeof window !== 'undefined' ? localStorage.getItem('isLogin') === 'true' : false,
  watchlist: [],

  setQuerry: (querry: string) => set({ querry, page: 1 }),

  setPage: (page: number) => set({ page }),

  setDecremnetPage: () => set((state) => ({
    page: Math.max(1, state.page - 1)
  })),

  setIncrementPage: () => set((state) => ({
    page: state.page + 1
  })),

  removeFromWatchlist: (id: string) => set((state) => ({
    watchlist: state.watchlist.filter((item) => item.id !== id)
  })),

  addToWatchlist: (title: string) => set((state) => ({
    watchlist: [
      ...state.watchlist,
      {
        id: Date.now().toString(),
        title,
        createdAt: new Date().toISOString(),
      }
    ]
  })),

  setLogin: (isLogin: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLogin', String(isLogin));
    }
    set({ isLogin });
  }
}))
