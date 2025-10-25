import { cn } from '@/lib/utils'
import MovieCard from '@/components/MovieCard'
import type { Movie } from '@/types/movie'
import { motion } from 'framer-motion'

type Props = { movies: Movie[] }

export default function MovieGrid({ movies }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={cn('grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 md:gap-4 lg:gap-5')}>      
      {movies.map(m => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </motion.div>
  )
}