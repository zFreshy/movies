import { cn } from '@/lib/utils'
import MovieCard from '@/components/MovieCard'
import type { Movie } from '@/types/movie'

type Props = { movies: Movie[] }

export default function MovieGrid({ movies }: Props) {
  return (
    <div className={cn('grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 md:gap-4 lg:gap-5')}>      
      {movies.map(m => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  )
}