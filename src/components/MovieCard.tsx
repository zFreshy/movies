import { motion } from 'framer-motion'
import { Star, Heart } from 'lucide-react'
import { cn, formatRuntime } from '@/lib/utils'
import type { Movie } from '@/types/movie'
import { Link } from 'react-router-dom'
import { useFavorites } from '@/store/favorites'

type Props = { movie: Movie }

export default function MovieCard({ movie }: Props) {
  const { toggle, isFav } = useFavorites()
  const fav = isFav(movie.id)
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className={cn('group rounded-xl overflow-hidden bg-card ring-1 ring-white/10 shadow-soft group-hover:shadow-glow')}>      
      <div className={cn('relative aspect-[2/3]')}>        
        <Link to={`/movie/${movie.id}`} className={cn('absolute inset-0')}></Link>
        <img src={movie.posterUrl} alt={movie.title} className={cn('absolute inset-0 h-full w-full object-cover')} />
        <div className={cn('absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity')} />
        <button onClick={() => toggle({ movieId: movie.id, title: movie.title, posterUrl: movie.posterUrl })} className={cn('absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/70 ring-1 ring-white/10 backdrop-blur-xs transition hover:bg-white/10')}>          
          <Heart className={cn('h-4 w-4', fav ? 'text-primary' : 'text-muted')} />
        </button>
        <div className={cn('absolute bottom-2 left-2 right-2 flex items-center justify-between')}>          
          <div className={cn('flex min-w-0 flex-col')}>            
            <span className={cn('truncate text-sm font-medium')}>{movie.title}</span>
            <span className={cn('text-xs text-muted')}>{movie.year} • {formatRuntime(movie.runtimeMin)}</span>
          </div>
          <div className={cn('inline-flex items-center gap-1 rounded-full bg-background/70 px-2 py-1 text-xs ring-1 ring-white/10 backdrop-blur-xs')}>            
            <Star className={cn('h-3 w-3 text-accent')} />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}