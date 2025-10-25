import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { movies as fallback } from '@/data/movies'
import { fetchTrending, searchMovies } from '@/lib/tmdb'
import ThumbCarousel from '@/components/ThumbCarousel'
import MovieGrid from '@/components/MovieGrid'
import { useFavorites } from '@/store/favorites'
import Hero from '@/components/Hero'
import SideRail from '@/components/SideRail'
import RightPanel from '@/components/RightPanel'
import { useSearchParams } from 'react-router-dom'
import GenreFilters from '@/components/GenreFilters'

export default function Home() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const view = params.get('view') ?? ''
  const [catalog, setCatalog] = useState(fallback)
  const [trend, setTrend] = useState(fallback.filter(m => m.trending))
  const [active] = useState('Animation')
  const { items } = useFavorites()
  const [genre, setGenre] = useState('All')
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
        if (view === 'favorites') {
          setCatalog(favMovies)
          return
        }
        if (view === 'trending') {
          setCatalog(trend.length ? trend : fallback)
          return
        }
        if (view === 'originals') {
          setCatalog(fallback)
          return
        }
        setCatalog(trend.length ? trend : fallback)
        return
      }
      try {
        const res = await searchMovies(s)
        setCatalog(res)
      } catch {}
    }
    run()
  }, [q, view, trend, favMovies])

  const featured = trend.slice(0, 2)

  const availableGenres = useMemo(() => {
    const s = new Set<string>()
    catalog.forEach(m => (m.genres || []).forEach(g => s.add(g)))
    return ['All', ...Array.from(s).sort()]
  }, [catalog])

  const shown = useMemo(() => {
    if (genre === 'All') return catalog
    return catalog.filter(m => (m.genres || []).includes(genre))
  }, [catalog, genre])

  return (
    <div>
      <div className={cn('grid gap-4 lg:grid-cols-[56px_minmax(0,1fr)_320px]')}>    
        <div className={cn('lg:row-span-2')}><SideRail /></div>
        <div className={cn('space-y-10')}>      
          {featured.length === 2 && null}
          <section id={'discover'}>
            <h2 className={cn('text-lg font-semibold tracking-tight')}>Developer's Choice</h2>
            {(trend[0] || catalog[0]) && <Hero movie={(trend[0] || catalog[0])} />}
          </section>
          <section id={'trending'}>
            <ThumbCarousel movies={trend} title={'Trending'} />
          </section>
          <section id={'favorites'}>
            <ThumbCarousel movies={favMovies} title={'My List'} />
          </section>
        </div>
        <RightPanel movies={favMovies} />
        <section id={'catalog'} className={cn('space-y-3 lg:col-span-2 lg:col-start-2 lg:row-start-2')}>        
          <h2 className={cn('text-lg font-semibold tracking-tight')}>Catalog</h2>
          <GenreFilters genres={availableGenres} value={genre} onChange={setGenre} />
          <MovieGrid movies={shown} />
        </section>
      </div>
    </div>
  )
}