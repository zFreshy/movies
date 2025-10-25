import { useEffect, useMemo, useRef, useState } from 'react'
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
import Carousel from '@/components/Carousel'
import type { Movie } from '@/types/movie'

export default function Home() {
  const [trend, setTrend] = useState(fallback)
  const [catalog, setCatalog] = useState(fallback)
  const { items } = useFavorites()
  const [panelHeight, setPanelHeight] = useState<number | undefined>(undefined)
  const topRef = useRef<HTMLDivElement>(null)
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const view = params.get('view') || 'discover'
  const [genre, setGenre] = useState('All')

  useEffect(() => {
    const run = async () => {
      try {
        const t = await fetchTrending()
        setTrend(t)
      } catch {}
      try {
        const s = q ? await searchMovies(q) : fallback
        setCatalog(s)
      } catch {}
    }
    run()
  }, [q, view])

  useEffect(() => {
    const el = topRef.current
    if (!el) return
    const measure = () => setPanelHeight(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(() => measure())
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [trend, items])

  const favMovies: Movie[] = useMemo(() => {
    const byId = new Map<string, Movie>()
    ;[...trend, ...catalog, ...fallback].forEach(m => byId.set(m.id, m))
    return items.map(i => {
      const found = byId.get(i.movieId)
      return (
        found ?? {
          id: i.movieId,
          title: i.title,
          year: 0,
          genres: [],
          rating: 0,
          runtimeMin: 0,
          overview: '',
          posterUrl: i.posterUrl,
          backdropUrl: i.posterUrl,
          trending: false,
        }
      )
    })
  }, [items, trend, catalog])

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
    <div className={cn('flex flex-col lg:flex-row gap-4')}>    
      <div className={cn('hidden lg:block')}><SideRail /></div>
      <div className={cn('flex-1 min-w-0', 'space-y-10')} ref={topRef}>
        {featured.length === 2 && null}
        <section id={'discover'}>
          <h2 className={cn('text-lg font-semibold tracking-tight')}>Developer\'s Choice</h2>
          {(trend[0] || catalog[0]) && <Hero movie={(trend[0] || catalog[0])} />}
        </section>
        <section id={'trending'}>
          <ThumbCarousel movies={trend} title={'Trending'} />
        </section>
        <section id={'favorites'}>
          <ThumbCarousel movies={favMovies} title={'My List'} />
        </section>
        <section id={'catalog'} className={cn('space-y-4 lg:max-w-6xl lg:mx-auto')}>        
          <h2 className={cn('text-lg font-semibold tracking-tight')}>Catalog</h2>
          <GenreFilters genres={availableGenres} value={genre} onChange={setGenre} />
          <div className={cn('md:hidden')}>            
            <Carousel movies={shown} />
          </div>
          <div className={cn('hidden md:block')}>            
            <MovieGrid movies={shown} />
          </div>
        </section>
      </div>
      <div className={cn('hidden lg:block')}>          
        <RightPanel movies={favMovies} panelHeight={panelHeight} />
      </div>
    </div>
  )
}