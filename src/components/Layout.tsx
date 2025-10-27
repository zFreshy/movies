import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileActions from '@/components/MobileActions'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/store/favorites'

export default function Layout() {
  const { load, loaded } = useFavorites()
  useEffect(() => { if (!loaded) load() }, [loaded, load])
  return (
    <div className={cn('min-h-screen bg-background text-foreground relative')}>      
      <div className={'bg-gradient-blur'} />
      <Header />
      <main className={cn('container pt-20 pb-24 md:pb-8')}>        
        <Outlet />
      </main>
      <MobileActions />
      <Footer />
    </div>
  )
}