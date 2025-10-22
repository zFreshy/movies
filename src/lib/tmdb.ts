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

export async function fetchTrending() {
  const data = await req('/trending/movie/week')
  return (data.results ?? []).map((m: any) => ({
    id: String(m.id),
    title: m.title,
    year: Number((m.release_date ?? '0000').slice(0, 4)),
    genres: [],
    rating: Number(m.vote_average ?? 0),
    runtimeMin: 0,
    overview: m.overview ?? '',
    posterUrl: img(m.poster_path, 'w500'),
    backdropUrl: img(m.backdrop_path, 'w1280'),
    trending: true,
  }))
}

export async function searchMovies(q: string) {
  const data = await req('/search/movie', { query: q })
  return (data.results ?? []).map((m: any) => ({
    id: String(m.id),
    title: m.title,
    year: Number((m.release_date ?? '0000').slice(0, 4)),
    genres: [],
    rating: Number(m.vote_average ?? 0),
    runtimeMin: 0,
    overview: m.overview ?? '',
    posterUrl: img(m.poster_path, 'w500'),
    backdropUrl: img(m.backdrop_path, 'w1280'),
    trending: false,
  }))
}

export async function fetchMovieDetails(id: string) {
  const m = await req(`/movie/${id}`)
  return {
    id: String(m.id),
    title: m.title,
    year: Number((m.release_date ?? '0000').slice(0, 4)),
    genres: (m.genres ?? []).map((g: any) => g.name),
    rating: Number(m.vote_average ?? 0),
    runtimeMin: Number(m.runtime ?? 0),
    overview: m.overview ?? '',
    posterUrl: img(m.poster_path, 'w500'),
    backdropUrl: img(m.backdrop_path, 'w1280'),
    trending: false,
  }
}