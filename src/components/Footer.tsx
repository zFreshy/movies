import { cn } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className={cn('border-t border-white/10')}>      
      <div className={cn('container py-8 text-xs text-muted flex items-center justify-between')}>        
        <span>© {new Date().getFullYear()} Movies</span>
        <span className={cn('hidden sm:block')}>Built with React + Tailwind</span>
      </div>
    </footer>
  )
}