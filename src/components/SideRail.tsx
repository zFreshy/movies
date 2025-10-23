import { cn } from '@/lib/utils'
import { Home, Heart, Flame, Clapperboard, Settings } from 'lucide-react'

export default function SideRail() {
  const items = [Home, Flame, Heart, Clapperboard, Settings]
  return (
    <aside className={cn('hidden lg:block shrink-0 sticky top-20 h-[calc(100vh-5rem)]')}>      
      <div className={cn('h-full w-14 rounded-3xl bg-background/40 ring-1 ring-white/10 backdrop-blur-xs shadow-soft flex flex-col items-center gap-4 py-4')}>        
        {items.map((Icon, i) => (
          <button key={i} className={cn('inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 text-foreground/90 hover:bg-white/15')}>            
            <Icon className={cn('h-5 w-5')} />
          </button>
        ))}
      </div>
    </aside>
  )
}