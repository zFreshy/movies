import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ArrowLeft, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn, formatRuntime } from '@/lib/utils'
import { movies as fallback } from '@/data/movies'
import { fetchMovieDetails } from '@/lib/tmdb'
import { useFavorites } from '@/store/favorites'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(fallback.find(m => m.id === id))
  const { toggle, isFav } = useFavorites()
  const fav = id ? isFav(id) : false

  useEffect(() => {
    const load = async () => {
      if (!id) return
      try {
        const m = await fetchMovieDetails(id)
        setMovie(m)
      } catch {}
    }
    load()
  }, [id])

  if (!movie) return (
    <div className={cn('flex h-60 items-center justify-center rounded-xl bg-card')}>Filme não encontrado</div>
  )
  return (
    <div className={cn('grid gap-10 md:grid-cols-[minmax(0,400px)_1fr]')}>      
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className={cn('relative overflow-hidden rounded-xl bg-card ring-1 ring-white/10 shadow-soft')}>        
        <img src={movie.posterUrl} alt={movie.title} className={cn('h-full w-full object-cover')} />
        <button onClick={() => toggle({ movieId: movie.id, title: movie.title, posterUrl: movie.posterUrl })} className={cn('absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 ring-1 ring-white/10 backdrop-blur-xs hover:bg-white/10')}>          
          <Heart className={cn('h-5 w-5', fav ? 'text-primary' : 'text-muted')} />
        </button>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn('space-y-6')}>        
        <div className={cn('flex items-start justify-between gap-6')}>          
          <h1 className={cn('text-3xl font-semibold tracking-tight')}>{movie.title}</h1>
          <Link to={'/'} className={cn('inline-flex items-center gap-2 rounded-full border border-white/10 bg-background px-4 py-2 text-sm hover:bg-white/5')}>            
            <ArrowLeft className={cn('h-4 w-4')} />
            <span>Voltar</span>
          </Link>
        </div>
        <div className={cn('flex flex-wrap items-center gap-3 text-sm')}>          
          <div className={cn('inline-flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 ring-1 ring-white/10 backdrop-blur-xs')}>            
            <Star className={cn('h-4 w-4 text-accent')} />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
          <div className={cn('inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 ring-1 ring-white/10 backdrop-blur-xs')}>            
            <span>{movie.year}</span>
            <span>•</span>
            <span>{formatRuntime(movie.runtimeMin)}</span>
          </div>
          {movie.genres.map(g => (
            <span key={g} className={cn('rounded-full bg-background/70 px-3 py-1 ring-1 ring-white/10 backdrop-blur-xs')}>{g}</span>
          ))}
        </div>
        <p className={cn('text-muted')}>{movie.overview}</p>
      </motion.div>
    </div>
  )
}