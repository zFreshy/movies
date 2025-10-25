import { useMemo, useState } from 'react'
import { Search, Play, HeartOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Movie } from '@/types/movie'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '@/store/favorites'

type Props = { movies: Movie[], panelHeight?: number }

const filters = ['Favorites']

export default function RightPanel({ movies, panelHeight }: Props) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState('Favorites')
  const navigate = useNavigate()
  const { toggle } = useFavorites()
  const list = useMemo(() => {
    const base = movies
    const s = q.trim().toLowerCase()
    return s ? base.filter(m => m.title.toLowerCase().includes(s)) : base
  }, [movies, q])

  return (
    <aside style={panelHeight ? { height: panelHeight } : undefined} className={cn('hidden lg:block w-[320px] shrink-0')}>      
      <div className={cn('h-full flex flex-col gap-3')}>        
        <div className={cn('rounded-3xl bg-background/40 ring-1 ring-white/10 backdrop-blur-xs p-3 shadow-soft')}>          
          <div className={cn('relative')}>            
            <input value={q} onChange={e => setQ(e.target.value)} placeholder={'Search'} className={cn('w-full rounded-full border border-white/10 bg-card px-10 py-3 text-sm shadow-soft outline-none ring-0 placeholder:text-muted focus:border-primary')} />
            <Search className={cn('pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted')} />
          </div>
          <div className={cn('mt-3 flex items-center gap-2')}>            
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)} className={cn('rounded-full px-3 py-1 text-xs ring-1 ring-white/10', active === f ? 'bg-white/15 text-foreground' : 'bg-background/50 text-foreground/80 hover:bg-white/10')}>{f}</button>
            ))}
          </div>
        </div>
        <div className={cn('rounded-3xl bg-background/40 ring-1 ring-white/10 backdrop-blur-xs p-3 shadow-soft space-y-2 flex-1 min-h-0 overflow-y-auto')}>          
          {list.map(m => (
            <div key={m.id} className={cn('flex items-center gap-3 rounded-xl bg-card/30 ring-1 ring-white/10 p-2')}>              
              <img src={m.posterUrl} alt={m.title} className={cn('h-12 w-9 rounded-md object-cover')} />
              <div className={cn('min-w-0 flex-1')}>                
                <div className={cn('truncate text-sm font-medium')}>{m.title}</div>
                <div className={cn('text-xs text-muted')}>Favorite</div>
              </div>
              <div className={cn('flex items-center gap-2')}>                
                <button onClick={() => navigate(`/movie/${m.id}`)} className={cn('inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 hover:bg-white/15')} title={'Play'}>                
                  <Play className={cn('h-4 w-4')} />
                </button>
                <button onClick={() => toggle({ movieId: m.id, title: m.title, posterUrl: m.posterUrl })} className={cn('inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 ring-1 ring-white/10 hover:bg-red-500/30')} title={'Remove from favorites'}>
                  <HeartOff className={cn('h-4 w-4')} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}