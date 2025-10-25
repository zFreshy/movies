import { cn } from '@/lib/utils'

type Props = {
  genres: string[]
  value: string
  onChange?: (value: string) => void
}

export default function GenreFilters({ genres, value, onChange }: Props) {
  return (
    <div className={cn('flex flex-wrap gap-3')}>      
      {genres.map(g => (
        <button
          key={g}
          onClick={() => onChange?.(g)}
          className={cn('inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ring-1 ring-white/10', value === g ? 'bg-white/10 text-foreground' : 'bg-card text-muted hover:bg-white/5')}
        >
          <span>{g}</span>
        </button>
      ))}
    </div>
  )
}