import { useRef, useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const tabs = [
    { label: 'Discover', key: 'discover' },
    { label: 'Trending', key: 'trending' },
    { label: 'My List', key: 'favorites' },
    { label: 'Catalog', key: 'catalog' },
  ]
  const [active, setActive] = useState('discover')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const s = query.trim()
    navigate(s ? `/?q=${encodeURIComponent(s)}` : '/')
    setOpen(false)
  }
  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur')}>      
      <div className={cn('container flex h-16 items-center justify-between')}>        
        <Link to={'/'} className={cn('text-xl font-semibold tracking-tight')}>Flixo</Link>
        <nav className={cn('hidden md:flex items-center gap-2 text-sm rounded-full bg-card ring-1 ring-white/10 px-2 py-1 shadow-soft')}>          
          <form onSubmit={onSubmit} className={cn('flex items-center gap-2')}>            
            {open ? (
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={'Search'}
                className={cn('w-56 md:w-72 lg:w-96 rounded-full border border-white/10 bg-background px-3 py-1 text-sm shadow-soft outline-none ring-0 placeholder:text-muted focus:border-primary')}
                onKeyDown={e => { if ((e as any).key === 'Escape') setOpen(false) }}
              />
            ) : (
              <>
                {tabs.map(t => (
                  <button
                    key={t.key}
                    type={'button'}
                    onClick={() => {
                      setActive(t.key)
                      setOpen(false)
                      setQuery('')
                      navigate('/')
                      setTimeout(() => {
                        const el = document.getElementById(t.key)
                        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }, 200)
                    }}
                    className={cn('px-4 py-2 rounded-full', t.key === active ? 'bg-white/15 text-foreground ring-1 ring-white/10' : 'text-muted hover:bg-white/10')}
                  >
                    {t.label}
                  </button>
                ))}
              </>
            )}
            <button
               type={'button'}
               onClick={() => {
                 if (!open) {
                   setOpen(true)
                   setTimeout(() => inputRef.current?.focus(), 0)
                 } else {
                   const s = query.trim()
                   navigate(s ? `/?q=${encodeURIComponent(s)}` : '/')
                   setOpen(false)
                 }
               }}
               aria-label={'Search'}
               className={cn('inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-foreground ring-1 ring-white/10 hover:bg-white/15')}
             >              
               <Search className={cn('h-4 w-4')} />
             </button>
          </form>
        </nav>
        <div className={cn('flex items-center gap-3')}>          
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