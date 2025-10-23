import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const tabs = ['Movie', 'Series', 'Originals']
  const active = 'Movie'
  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur')}>      
      <div className={cn('container flex h-16 items-center justify-between')}>        
        <Link to={'/'} className={cn('text-xl font-semibold tracking-tight')}>Flix.id</Link>
        <nav className={cn('hidden md:flex items-center gap-2 text-sm rounded-full bg-background/40 ring-1 ring-white/10 backdrop-blur-xs px-2 py-1 shadow-soft')}>
          {tabs.map(t => (
            <span key={t} className={cn('px-4 py-2 rounded-full', t === active ? 'bg-white/15 text-foreground ring-1 ring-white/10' : 'text-muted hover:bg-white/10')}>{t}</span>
          ))}
          <button className={cn('inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-foreground ring-1 ring-white/10 hover:bg-white/15')}>
            <Search className={cn('h-4 w-4')} />
          </button>
        </nav>
        <div className={cn('flex items-center gap-3')}>          
          <button className={cn('inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-card text-foreground shadow-soft transition-colors hover:bg-white/5')}>            
            <Search className={cn('h-4 w-4')} />
          </button>
          <div className={cn('hidden sm:flex items-center gap-2')}>            
            <div className={cn('h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent')} />
            <div className={cn('leading-tight')}>              
              <div className={cn('text-sm')}>Sarah J</div>
              <div className={cn('text-xs text-muted')}>Premium</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}