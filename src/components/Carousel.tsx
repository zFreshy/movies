import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../lib/utils"
import MovieCard from "./MovieCard"
import type { Movie } from "../types/movie"

interface Props {
  movies: Movie[]
  title?: string
}

export default function Carousel({ movies, title }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (delta: number) => ref.current?.scrollBy({ left: delta, behavior: "smooth" })

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={cn("space-y-3 overflow-x-hidden")}> 
      {title && (
        <div className={cn("flex items-center justify-between")}> 
          <h2 className={cn("text-xl md:text-2xl font-semibold tracking-tight")}>{title}</h2>
          <div className={cn("flex gap-2")}> 
            <button
              aria-label="Scroll left"
              onClick={() => scroll(-400)}
              className={cn("h-8 w-8 rounded-full border border-white/10 bg-card text-foreground hover:bg-white/5 transition active:scale-95")}
            > 
              <ChevronLeft className={cn("h-4 w-4")} />
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scroll(400)}
              className={cn("h-8 w-8 rounded-full border border-white/10 bg-card text-foreground hover:bg-white/5 transition active:scale-95")}
            > 
              <ChevronRight className={cn("h-4 w-4")} />
            </button>
          </div>
        </div>
      )}

      <div className={cn("relative")}> 
        {!title && (
          <>
            <button
              aria-label="Anterior"
              onClick={() => scroll(-280)}
              className={cn(
                "md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-30 inline-flex h-8 w-8 items-center justify-center",
                "rounded-full border border-white/10 bg-card text-foreground shadow-soft hover:bg-white/5 transition active:scale-95"
              )}
            >
              <ChevronLeft className={cn("h-4 w-4")} />
            </button
            >
            <button
              aria-label="Próximo"
              onClick={() => scroll(280)}
              className={cn(
                "md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-30 inline-flex h-8 w-8 items-center justify-center",
                "rounded-full border border-white/10 bg-card text-foreground shadow-soft hover:bg-white/5 transition active:scale-95"
              )}
            >
              <ChevronRight className={cn("h-4 w-4")} />
            </button>
          </>
        )}

        <div
          ref={ref}
          className={cn(
            "flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none pl-2 scroll-smooth"
          )}
        > 
          {movies.map((m) => (
            <div key={m.id} className={cn("w-28 sm:w-44 shrink-0 snap-start")}> 
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}