import { create } from 'zustand'
import { API_BASE, getUserId } from '@/lib/api'

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
      const userId = getUserId()
      const res = await fetch(`${API_BASE}/favorites`, {
        headers: { 'X-User-Id': userId }
      })
      const data = await res.json()
      set({ items: data, loaded: true })
    } catch {}
  },
  toggle: async (fav) => {
    const exists = get().items.find(i => i.movieId === fav.movieId)
    const userId = getUserId()
    if (exists) {
      try {
        await fetch(`${API_BASE}/favorites-remove?movieId=${fav.movieId}`, {
          method: 'DELETE',
          headers: { 'X-User-Id': userId }
        })
        set({ items: get().items.filter(i => i.movieId !== fav.movieId) })
      } catch {}
      return
    }
    try {
      await fetch(`${API_BASE}/favorites-add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-User-Id': userId },
        body: JSON.stringify(fav)
      })
      set({ items: [...get().items, fav] })
    } catch {}
  },
  isFav: (id) => !!get().items.find(i => i.movieId === id)
}))