import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Movie } from '@/types/movie'

type Props = { movies: Movie[] }

export default function CoverflowCarousel({ movies }: Props) {
  const list = useMemo(() => movies.slice(0, 8), [movies])
  const [active, setActive] = useState(0)
  const next = () => setActive(i => Math.min(list.length - 1, i + 1))
  const prev = () => setActive(i => Math.max(0, i - 1))

  return (
    <div className={cn('relative mx-auto flex flex-col items-center justify-center')}>      
      <div className={cn('relative h-[360px] md:h-[420px] w-full')}>        
        <motion.div
          className={cn('absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing select-none')}
          drag={'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            const power = info.offset.x + info.velocity.x * 0.2
            if (power < -20) next()
            else if (power > 20) prev()
          }}
          style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
        >          
          {list.map((m, i) => {
            const offset = i - active
            const abs = Math.abs(offset)
            
            if (abs > 2) return null

            const scale = 1 - abs * 0.2
            const translateX = offset * 120
            const rotateY = offset === 0 ? 0 : offset < 0 ? 25 : -25
            const zIndex = 10 - abs
            const opacity = 1 - abs * 0.4
            
            return (
              <motion.div
                key={m.id}
                initial={false}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                  rotateY,
                  zIndex,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                className={cn('absolute will-change-transform')}
              >
                <div className={cn('rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-card')}>                  
                  <div className={cn('aspect-[2/3] w-[180px] md:w-[220px]')}>                    
                    <img src={m.posterUrl} alt={m.title} className={cn('h-full w-full object-cover')} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        <button aria-label={'Anterior'} onClick={prev} className={cn('absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-card ring-1 ring-white/10 text-foreground shadow-soft hover:bg-white/5 transition active:scale-95')}>          
          <ChevronLeft className={cn('h-4 w-4')} />
        </button>
        <button aria-label={'Próximo'} onClick={next} className={cn('absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-card ring-1 ring-white/10 text-foreground shadow-soft hover:bg-white/5 transition active:scale-95')}>          
          <ChevronRight className={cn('h-4 w-4')} />
        </button>
      </div>

      {list[active] && (
        <div className={cn('mt-6 text-center')}>          
          <div className={cn('text-2xl font-semibold tracking-tight')}>{list[active].title}</div>
          <div className={cn('text-sm text-muted mt-1')}>{(list[active].genres?.[0]) || '—'}</div>
          <div className={cn('mt-2 flex items-center justify-center gap-1')}>            
            {list.map((_, i) => (
              <span key={i} className={cn('h-1.5 w-1.5 rounded-full', i === active ? 'bg-foreground' : 'bg-muted')} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}