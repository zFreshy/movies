import { cn } from '@/lib/utils'
import MovieCard from '@/components/MovieCard'
import type { Movie } from '@/types/movie'

type Props = { movies: Movie[] }

export default function MovieGrid({ movies }: Props) {
  return (
    <div className={cn('grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5')}>      
      {movies.map(m => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  )
}