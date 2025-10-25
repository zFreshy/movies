import { cn } from '@/lib/utils'
import { Home, Flame, Heart, Sparkles } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function MobileActions() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const view = params.get('view')
  const pathname = location.pathname
  const active = pathname === '/for-you'
    ? 'for-you'
    : view === 'trending'
    ? 'trending'
    : view === 'favorites'
    ? 'favorites'
    : 'home'

  const items = [
    { key: 'home', label: 'Home', Icon: Home, onClick: () => navigate('/') },
    { key: 'trending', label: 'Trending', Icon: Flame, onClick: () => navigate('/?view=trending') },
    { key: 'favorites', label: 'My List', Icon: Heart, onClick: () => navigate('/?view=favorites') },
    { key: 'for-you', label: 'For You', Icon: Sparkles, onClick: () => navigate('/for-you') },
  ]

  return (
    <nav className={cn('fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background ring-1 ring-white/10')}>      
      <div className={cn('container flex items-center justify-around h-16')}>        
        {items.map(({ key, label, Icon, onClick }) => (
          <button
            key={key}
            onClick={onClick}
            className={cn('flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-full', active === key ? 'text-foreground' : 'text-muted')}
          >            
            <div className={cn('relative inline-flex h-8 w-8 items-center justify-center rounded-full', active === key ? 'bg-white/15 ring-1 ring-white/10' : '')}>              
              <Icon className={cn('h-4 w-4')} />
            </div>
            <span className={cn('text-[11px]')}>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}