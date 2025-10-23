import { motion } from 'framer-motion'
import { Play, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { Movie } from '@/types/movie'

type Props = { movie: Movie }

export default function Hero({ movie }: Props) {
  return (
    <section className={cn('relative overflow-hidden rounded-xl bg-card')}>      
      <div className={cn('absolute inset-0')}>        
        <img src={movie.backdropUrl} alt={movie.title} className={cn('h-full w-full object-cover')} />
        <div className={cn('absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent')} />
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={cn('relative z-10 p-6 md:p-10 max-w-xl')}>        
        <h1 className={cn('text-3xl md:text-4xl font-semibold tracking-tight')}>{movie.title}</h1>
        <p className={cn('mt-2 text-sm md:text-base text-muted')}>{movie.overview}</p>
        <div className={cn('mt-6 flex gap-3')}>          
          <button className={cn('inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-white shadow-glow transition hover:brightness-110')}>            
            <Play className={cn('h-4 w-4')} />
            <span>Watch Now</span>
          </button>
          <Link to={`/movie/${movie.id}`} className={cn('inline-flex items-center gap-2 rounded-full border border-white/10 bg-background px-4 py-2 text-sm shadow-soft transition hover:bg-white/5')}>            
            <Info className={cn('h-4 w-4')} />
            <span>Details</span>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}