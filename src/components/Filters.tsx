import { useState } from 'react'
import { Flame, Swords, Heart, Clapperboard, Ghost, Sparkles, Tv } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = { onChange?: (value: string) => void }

const items = [
  { key: 'Trending', icon: Flame },
  { key: 'Action', icon: Swords },
  { key: 'Romance', icon: Heart },
  { key: 'Animation', icon: Clapperboard },
  { key: 'Horror', icon: Ghost },
  { key: 'Special', icon: Sparkles },
  { key: 'Drakor', icon: Tv },
]

export default function Filters({ onChange }: Props) {
  const [active, setActive] = useState('Animation')
  const click = (key: string) => {
    setActive(key)
    onChange?.(key)
  }
  return (
    <div className={cn('flex flex-wrap gap-3')}>      
      {items.map(({ key, icon: Icon }) => (
        <button key={key} onClick={() => click(key)} className={cn('inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ring-1 ring-white/10', active === key ? 'bg-white/10 text-foreground' : 'bg-card text-muted hover:bg-white/5')}>          
          <Icon className={cn('h-4 w-4')} />
          <span>{key}</span>
        </button>
      ))}
    </div>
  )
}