import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Flame, Swords, Heart, Clapperboard, Ghost, Sparkles, Tv } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = { value?: string; onChange?: (value: string) => void }

const items = [
  { key: 'Trending', icon: Flame },
  { key: 'Action', icon: Swords },
  { key: 'Romance', icon: Heart },
  { key: 'Animation', icon: Clapperboard },
  { key: 'Horror', icon: Ghost },
  { key: 'Special', icon: Sparkles },
  { key: 'Drakor', icon: Tv },
]

export default function FilterCarousel({ value = 'Animation', onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (delta: number) => ref.current?.scrollBy({ left: delta, behavior: 'smooth' })
  return (
    <div className={cn('space-y-3')}>      
      <div className={cn('flex items-center justify-end gap-2')}>        
        <button onClick={() => scroll(-400)} className={cn('h-8 w-8 rounded-full border border-white/10 bg-card text-foreground hover:bg-white/5')}>          
          <ChevronLeft className={cn('h-4 w-4')} />
        </button>
        <button onClick={() => scroll(400)} className={cn('h-8 w-8 rounded-full border border-white/10 bg-card text-foreground hover:bg-white/5')}>          
          <ChevronRight className={cn('h-4 w-4')} />
        </button>
      </div>
      <div ref={ref} className={cn('flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory')}>        
        {items.map(({ key, icon: Icon }) => (
          <button key={key} onClick={() => onChange?.(key)} className={cn('shrink-0 snap-start inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm ring-1', value === key ? 'bg-white/20 text-foreground ring-white/20 backdrop-blur-xs' : 'bg-background/40 text-foreground/90 ring-white/15 backdrop-blur-xs hover:bg-white/10')}>            
            <Icon className={cn('h-4 w-4')} />
            <span>{key}</span>
          </button>
        ))}
      </div>
    </div>
  )
}