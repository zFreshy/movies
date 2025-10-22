import { create } from 'zustand'

type Fav = { movieId: string; title: string; posterUrl: string }

type State = {
  items: Fav[]
  loaded: boolean
  load: () => Promise<void>
  toggle: (fav: Fav) => Promise<void>
  isFav: (id: string) => boolean
}

export const useFavorites = create<State>((set, get) => ({
  items: [],
  loaded: false,
  load: async () => {
    try {
      const res = await fetch('/api/favorites')
      const data = await res.json()
      set({ items: data, loaded: true })
    } catch {}
  },
  toggle: async (fav) => {
    const exists = get().items.find(i => i.movieId === fav.movieId)
    if (exists) {
      try {
        await fetch(`/api/favorites/${fav.movieId}`, { method: 'DELETE' })
        set({ items: get().items.filter(i => i.movieId !== fav.movieId) })
      } catch {}
      return
    }
    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fav)
      })
      set({ items: [...get().items, fav] })
    } catch {}
  },
  isFav: (id) => !!get().items.find(i => i.movieId === id)
}))