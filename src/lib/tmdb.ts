const API_BASE = 'https://api.themoviedb.org/3'
const IMG_BASE = 'https://image.tmdb.org/t/p'
const KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined

function img(path?: string | null, size: string = 'w500') {
  if (!path) return ''
  return `${IMG_BASE}/${size}${path}`
}

async function req(path: string, params: Record<string, string | number> = {}) {
  const url = new URL(`${API_BASE}${path}`)
  if (KEY) url.searchParams.set('api_key', KEY)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
  const res = await fetch(url)
  if (!res.ok) throw new Error('TMDB request failed')
  return res.json()
}

let GENRES: Record<number, string> | null = null
async function genreMap() {
  if (GENRES) return GENRES
  const data = await req('/genre/movie/list')
  GENRES = Object.fromEntries((data.genres ?? []).map((g: any) => [g.id, g.name]))
  return GENRES
}

export async function fetchTrending() {
  const data = await req('/trending/movie/week')
  const map = await genreMap()
  const base = (data.results ?? []).map((m: any) => ({
    id: String(m.id),
    title: m.title ?? m.original_title ?? m.name ?? 'Untitled',
    year: Number((m.release_date ?? '0000').slice(0, 4)),
    genres: ((m.genre_ids ?? []).map((id: number) => map[id]).filter(Boolean)),
    rating: Number(m.vote_average ?? 0),
    runtimeMin: 0,
    overview: m.overview ?? '',
    posterUrl: img(m.poster_path, 'w500') || img(m.backdrop_path, 'w500') || '/favicon.svg',
    backdropUrl: img(m.backdrop_path, 'w1280'),
    trending: true,
  }))
  const filled = await Promise.all(base.map(async (m) => {
    try {
      const d = await req(`/movie/${m.id}`)
      return { ...m, runtimeMin: Number(d.runtime ?? m.runtimeMin ?? 0) }
    } catch {
      return m
    }
  }))
  return filled
}

export async function fetchDiscover() {
  const data = await req('/discover/movie', { sort_by: 'popularity.desc', page: 1 })
  const map = await genreMap()
  const base = (data.results ?? []).map((m: any) => ({
    id: String(m.id),
    title: m.title ?? m.original_title ?? m.name ?? 'Untitled',
    year: Number((m.release_date ?? '0000').slice(0, 4)),
    genres: ((m.genre_ids ?? []).map((id: number) => map[id]).filter(Boolean)),
    rating: Number(m.vote_average ?? 0),
    runtimeMin: 0,
    overview: m.overview ?? '',
    posterUrl: img(m.poster_path, 'w500') || img(m.backdrop_path, 'w500') || '/favicon.svg',
    backdropUrl: img(m.backdrop_path, 'w1280'),
    trending: false,
  }))
  const filled = await Promise.all(base.map(async (m) => {
    try {
      const d = await req(`/movie/${m.id}`)
      return { ...m, runtimeMin: Number(d.runtime ?? m.runtimeMin ?? 0) }
    } catch {
      return m
    }
  }))
  return filled
}

export async function searchMovies(q: string) {
  const data = await req('/search/movie', { query: q })
  const map = await genreMap()
  const base = (data.results ?? []).map((m: any) => ({
    id: String(m.id),
    title: m.title ?? m.original_title ?? m.name ?? 'Untitled',
    year: Number((m.release_date ?? '0000').slice(0, 4)),
    genres: ((m.genre_ids ?? []).map((id: number) => map[id]).filter(Boolean)),
    rating: Number(m.vote_average ?? 0),
    runtimeMin: 0,
    overview: m.overview ?? '',
    posterUrl: img(m.poster_path, 'w500') || img(m.backdrop_path, 'w500') || '/favicon.svg',
    backdropUrl: img(m.backdrop_path, 'w1280'),
    trending: false,
  }))
  const filled = await Promise.all(base.map(async (m) => {
    try {
      const d = await req(`/movie/${m.id}`)
      return { ...m, runtimeMin: Number(d.runtime ?? m.runtimeMin ?? 0) }
    } catch {
      return m
    }
  }))
  return filled
}

export async function fetchMovieDetails(id: string) {
  const m = await req(`/movie/${id}`)
  return {
    id: String(m.id),
    title: m.title ?? m.original_title ?? m.name ?? 'Untitled',
    year: Number((m.release_date ?? '0000').slice(0, 4)),
    genres: (m.genres ?? []).map((g: any) => g.name),
    rating: Number(m.vote_average ?? 0),
    runtimeMin: Number(m.runtime ?? 0),
    overview: m.overview ?? '',
    posterUrl: img(m.poster_path, 'w500') || img(m.backdrop_path, 'w500') || '/favicon.svg',
    backdropUrl: img(m.backdrop_path, 'w1280'),
    trending: false,
  }
}