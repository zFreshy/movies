import { cn } from '@/lib/utils'
import MovieCard from '@/components/MovieCard'
import type { Movie } from '@/types/movie'

type Props = { movies: Movie[] }

export default function MovieGrid({ movies }: Props) {
  return (
    <div className={cn('grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 sm:gap-3')}>      
      {movies.map(m => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  )
}