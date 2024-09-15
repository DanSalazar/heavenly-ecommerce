'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function GoToTopButton() {
  const [visible, setVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setVisible(true)
        return
      }

      setVisible(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        'text-sm gap-2 transition-opacity opacity-0 fixed bottom-4 right-4',
        {
          'opacity-1': visible
        }
      )}>
      Go to top
      <ArrowUp width={16} height={16} />
    </Button>
  )
}
