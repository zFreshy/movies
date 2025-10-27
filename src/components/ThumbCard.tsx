import { cn } from '@/lib/utils'
import type { Movie } from '@/types/movie'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/store/favorites'

type Props = { movie: Movie }

export default function ThumbCard({ movie }: Props) {
  const { toggle, isFav } = useFavorites()
  const fav = isFav(movie.id)
  return (
    <Link to={`/movie/${movie.id}`} className={cn('group block')}>      
      <div className={cn('relative rounded-3xl overflow-hidden border border-white/10 bg-card shadow-soft')}>        
        <div className={cn('aspect-[2/3]')}>          
          <img src={movie.posterUrl} alt={movie.title} className={cn('h-full w-full object-cover transition-transform duration-500 group-hover:scale-105')} />
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle({ movieId: movie.id, title: movie.title, posterUrl: movie.posterUrl }) }}
            className={cn('absolute right-2 top-2 z-20 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/70 ring-1 ring-white/10 backdrop-blur-xs transition hover:bg-white/10')}
            title={fav ? 'Remover da lista' : 'Adicionar à lista'}
          >            
            <Heart className={cn('h-4 w-4', fav ? 'text-primary' : 'text-muted')} />
          </button>
        </div>
      </div>
      <div className={cn('mt-2 text-sm')}>        
        <div className={cn('truncate')}>{movie.title}</div>
        <div className={cn('flex items-center gap-2 text-muted')}>          
          <span className={cn('inline-flex h-2 w-2 rounded-full bg-orange-400')} />
          <span>{movie.rating.toFixed(1)}</span>
          <span>{movie.year}</span>
        </div>
      </div>
    </Link>
  )
}