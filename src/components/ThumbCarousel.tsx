import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Movie } from '@/types/movie'
import ThumbCard from '@/components/ThumbCard'

type Props = { movies: Movie[]; title: string }

export default function ThumbCarousel({ movies, title }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const list = useMemo(() => {
    if (!movies?.length) return []
    return [...movies, ...movies, ...movies]
  }, [movies])

  useEffect(() => {
    const el = ref.current
    if (!el || !list.length) return
    const unit = el.scrollWidth / 3
    el.scrollLeft = unit
    const onScroll = () => {
      const u = el.scrollWidth / 3
      if (el.scrollLeft <= u * 0.2) el.scrollLeft += u
      else if (el.scrollLeft >= u * 2.8) el.scrollLeft -= u
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [list.length])

  const scroll = (delta: number) => ref.current?.scrollBy({ left: delta, behavior: 'smooth' })

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={cn('space-y-3 overflow-x-hidden')}>      
      <h2 className={cn('text-xl md:text-2xl font-semibold tracking-tight')}>{title}</h2>
      <div className={cn('relative')}>        
        <div ref={ref} className={cn('flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none mask-fade-x pl-2 scroll-smooth')}>          
          {list.map((m, idx) => (
            <div key={`${m.id}-${idx}`} className={cn('w-32 sm:w-44 shrink-0 snap-start')}>              
              <ThumbCard movie={m} />
            </div>
          ))}
        </div>
        <button aria-label={'Previous'} onClick={() => scroll(-400)} className={cn('absolute left-1 top-1/2 -translate-y-1/2 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-card text-foreground shadow-soft hover:bg-white/5 transition active:scale-95')}>          
          <ChevronLeft className={cn('h-4 w-4')} />
        </button>
        <button aria-label={'Next'} onClick={() => scroll(400)} className={cn('absolute right-1 top-1/2 -translate-y-1/2 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-card text-foreground shadow-soft hover:bg-white/5 transition active:scale-95')}>          
          <ChevronRight className={cn('h-4 w-4')} />
        </button>
      </div>
    </motion.section>
  )
}