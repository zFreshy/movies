import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { movies as fallback } from '@/data/movies'
import { fetchTrending } from '@/lib/tmdb'
import CoverflowCarousel from '@/components/CoverflowCarousel'
import type { Movie } from '@/types/movie'

export default function ForYou() {
  const [items, setItems] = useState<Movie[]>(fallback)
  useEffect(() => {
    const load = async () => {
      try { setItems(await fetchTrending()) } catch { setItems(fallback) }
    }
    load()
  }, [])

  return (
    <div className={cn('mx-auto max-w-md md:max-w-2xl')}>      
      <h1 className={cn('text-xl md:text-2xl font-semibold tracking-tight')}>For You</h1>
      <p className={cn('text-sm text-muted mt-1')}>Sugestões personalizadas com um carrossel em destaque</p>
      <div className={cn('mt-6 rounded-3xl bg-background/40 p-6 shadow-soft')}>        
        <CoverflowCarousel movies={items} />
      </div>
    </div>
  )
}