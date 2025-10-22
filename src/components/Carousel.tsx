import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Movie } from '@/types/movie'
import MovieCard from '@/components/MovieCard'

type Props = { movies: Movie[]; title?: string }

export default function Carousel({ movies, title }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (delta: number) => ref.current?.scrollBy({ left: delta, behavior: 'smooth' })
  return (
    <section className={cn('space-y-3')}>      
      <div className={cn('flex items-center justify-between')}>        
        <h2 className={cn('text-xl md:text-2xl font-semibold tracking-tight')}>{title}</h2>
        <div className={cn('flex gap-2')}>          
          <button onClick={() => scroll(-400)} className={cn('h-8 w-8 rounded-full border border-white/10 bg-card text-foreground hover:bg-white/5')}>            
            <ChevronLeft className={cn('h-4 w-4')} />
          </button>
          <button onClick={() => scroll(400)} className={cn('h-8 w-8 rounded-full border border-white/10 bg-card text-foreground hover:bg-white/5')}>            
            <ChevronRight className={cn('h-4 w-4')} />
          </button>
        </div>
      </div>
      <div ref={ref} className={cn('flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory')}>        
        {movies.map(m => (
          <div key={m.id} className={cn('w-44 shrink-0 snap-start')}>            
            <MovieCard movie={m} />
          </div>
        ))}
      </div>
    </section>
  )
}