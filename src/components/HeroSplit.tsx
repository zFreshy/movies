import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { Movie } from '@/types/movie'

type Props = { movies: Movie[] }

export default function HeroSplit({ movies }: Props) {
  const a = movies[0]
  const b = movies[1]
  if (!a || !b) return null
  return (
    <section className={cn('grid gap-4 md:grid-cols-2')}>      
      {[a, b].map(m => (
        <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className={cn('relative overflow-hidden rounded-3xl bg-card ring-1 ring-white/10 shadow-soft')}>          
          <img src={m.backdropUrl} alt={m.title} className={cn('h-56 md:h-64 w-full object-cover')} />
          <div className={cn('absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent')} />
          <div className={cn('absolute inset-0 p-6 flex flex-col justify-end')}>            
            <h2 className={cn('text-3xl md:text-4xl font-semibold leading-tight tracking-tight')}>{m.title}</h2>
            <div className={cn('mt-2 inline-flex items-center gap-2 text-xs text-muted')}>              
              <span className={cn('inline-flex h-2 w-2 rounded-full bg-primary')} />
              <span>Let Play Moview</span>
            </div>
            <div className={cn('mt-4')}>              
              <Link to={`/movie/${m.id}`} className={cn('inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-white shadow-glow transition hover:brightness-110')}>                
                <Play className={cn('h-4 w-4')} />
                <span>Play</span>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  )
}