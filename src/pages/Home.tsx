import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { movies as fallback } from '@/data/movies'
import { fetchTrending, searchMovies } from '@/lib/tmdb'
import HeroSplit from '@/components/HeroSplit'
import FilterCarousel from '@/components/FilterCarousel'
import ThumbCarousel from '@/components/ThumbCarousel'
import MovieGrid from '@/components/MovieGrid'
import { useFavorites } from '@/store/favorites'

export default function Home() {
  const [q, setQ] = useState('')
  const [catalog, setCatalog] = useState(fallback)
  const [trend, setTrend] = useState(fallback.filter(m => m.trending))
  const [active, setActive] = useState('Animation')
  const { items } = useFavorites()
  const favMovies = useMemo(() => items.map(i => ({
    id: i.movieId,
    title: i.title,
    year: 0,
    genres: [],
    rating: 0,
    runtimeMin: 0,
    overview: '',
    posterUrl: i.posterUrl,
    backdropUrl: i.posterUrl,
    trending: false
  })), [items])

  useEffect(() => {
    const load = async () => {
      try {
        const t = await fetchTrending()
        setTrend(t)
        setCatalog(t)
      } catch {}
    }
    load()
  }, [])

  useEffect(() => {
    const run = async () => {
      const s = q.trim()
      if (!s) {
        setCatalog(trend.length ? trend : fallback)
        return
      }
      try {
        const res = await searchMovies(s)
        setCatalog(res)
      } catch {}
    }
    run()
  }, [q, trend])

  const featured = trend.slice(0, 2)

  return (
    <div className={cn('space-y-10')}>      
      {featured.length === 2 && <HeroSplit movies={featured} />}
      <div className={cn('relative')}>        
        <input value={q} onChange={e => setQ(e.target.value)} placeholder={'Buscar filmes, gêneros...'} className={cn('w-full rounded-full border border-white/10 bg-card px-10 py-3 text-sm shadow-soft outline-none ring-0 placeholder:text-muted focus:border-primary')} />
        <Search className={cn('pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted')} />
      </div>
      <FilterCarousel value={active} onChange={setActive} />
      <ThumbCarousel movies={trend} title={`Trending in ${active}`} />
      {items.length > 0 && (
        <section className={cn('space-y-3')}>        
          <h2 className={cn('text-lg font-semibold tracking-tight')}>Favoritos</h2>
          <MovieGrid movies={favMovies} />
        </section>
      )}
      <section className={cn('space-y-3')}>        
        <h2 className={cn('text-lg font-semibold tracking-tight')}>Catálogo</h2>
        <MovieGrid movies={catalog} />
      </section>
    </div>
  )
}