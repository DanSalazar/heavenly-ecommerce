'use client'

import { ReactNode } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  EnglishFlag,
  SpanishFlag,
  JapaneseFlag,
  GermanFlag
} from '@/components/flags/flags'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Locale, LOCALES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const flagMap: Record<Locale, ReactNode> = {
  en: <EnglishFlag className="size-6" />,
  es: <SpanishFlag className="size-6" />,
  ja: <JapaneseFlag className="size-6" />,
  de: <GermanFlag className="size-6" />
}

const languageNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  ja: '日本語',
  de: 'Deutsch'
}

export default function LanguageSelector() {
  const router = useRouter()
  const locale = useLocale()

  const changeLanguage = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2 [&_svg]:size-5">
          {/*@ts-ignore*/}
          {flagMap[locale]}
          <ChevronDown strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {LOCALES.map(l => (
          <DropdownMenuItem
            key={l}
            className={cn('flex items-center justify-between cursor-pointer', {
              'bg-primary-foreground': locale === l
            })}
            onClick={() => changeLanguage(l)}>
            <div className="flex items-center gap-2">
              {flagMap[l]}
              <span className="text-sm">{languageNames[l]}</span>
            </div>
            {locale === l && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
