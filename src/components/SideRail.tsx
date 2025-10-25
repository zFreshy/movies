import { cn } from '@/lib/utils'
import { Home, Heart, Flame, Clapperboard, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function SideRail() {
  const navigate = useNavigate()
  const [health, setHealth] = useState<'idle' | 'ok' | 'error'>('idle')
  const mid = [
    { Icon: Home, onClick: () => navigate('/') },
    { Icon: Flame, onClick: () => navigate('/?view=trending') },
    { Icon: Heart, onClick: () => navigate('/?view=favorites') },
  ]
  const LogoIcon = Clapperboard
  const checkHealth = async () => {
    try {
      const res = await fetch('/api/health')
      setHealth(res.ok ? 'ok' : 'error')
    } catch {
      setHealth('error')
    } finally {
      setTimeout(() => setHealth('idle'), 1200)
    }
  }
  return (
    <aside className={cn('hidden lg:block shrink-0 sticky top-20 h-[calc(100vh-5rem)]')}>      
      <div className={cn('h-full w-14 rounded-3xl bg-background/40 ring-1 ring-white/10 backdrop-blur-xs shadow-soft flex flex-col items-center gap-4 py-4')}>               <button aria-label={'Logo'} onClick={() => navigate('/')} className={cn('inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 text-foreground/90 hover:bg-white/15')}>          
          <LogoIcon className={cn('h-6 w-6')} />
        </button>
        <div className={cn('flex-1 min-h-0 flex flex-col items-center justify-center gap-4')}>          
          {mid.map(({ Icon, onClick }, i) => (
            <button key={i} onClick={onClick} className={cn('inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 text-foreground/90 hover:bg-white/15')}>              
              <Icon className={cn('h-5 w-5')} />
            </button>
          ))}
        </div>
        <button aria-label={'Settings'} onClick={checkHealth} className={cn('inline-flex h-10 w-10 items-center justify-center rounded-full', health === 'ok' ? 'bg-green-600/40 ring-1 ring-green-500/30 text-foreground/90' : health === 'error' ? 'bg-red-600/40 ring-1 ring-red-500/30 text-foreground/90' : 'bg-white/10 ring-1 ring-white/10 text-foreground/90 hover:bg-white/15')}>          
          <Settings className={cn('h-5 w-5')} />
        </button>
      </div>
    </aside>
  )
}