'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

type PreventNavigationProps = {
  isDirty: boolean
  backHref: string
  resetData: () => void
}

export default function PreventNavigation({
  isDirty,
  backHref,
  resetData
}: PreventNavigationProps) {
  const [leavingPage, setLeavingPage] = useState(false)
  const router = useRouter()

  /**
   * Function that will be called when the user selects `yes` in the confirmation modal,
   * redirected to the selected page.
   */
  const confirmationFn = useRef<() => void>(() => {})

  // Used to make popstate event trigger when back button is clicked.
  // Without this, the popstate event will not fire because it needs there to be a href to return.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, document.title, window.location.href)
    }
  }, [])

  useEffect(() => {
    /**
     * Used to prevent navigation when user click in navigation `<Link />` or `<a />`.
     * @param e The triggered event.
     */
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement

      if (isDirty) {
        event.preventDefault()

        confirmationFn.current = () => {
          router?.push(target.href)
        }

        setLeavingPage(true)
      }
    }

    /**
     * Used to prevent navigation when use `back` browser buttons.
     */
    const handlePopState = () => {
      if (isDirty) {
        window.history.pushState(null, document.title, window.location.href)

        confirmationFn.current = () => {
          router?.push(backHref)
        }

        setLeavingPage(true)
      } else {
        window.history.back()
      }
    }

    /**
     * Used to prevent navigation when reload page or navigate to another page, in different origin.
     * @param e The triggered event.
     */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = true
      }
    }

    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', handleClick)
    })
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.querySelectorAll('a').forEach(link => {
        link.removeEventListener('click', handleClick)
      })
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty])

  return (
    <>
      <LeavingDialog
        isOpen={leavingPage}
        noCallback={() => {
          setLeavingPage(false)
          confirmationFn.current = () => {}
        }}
        yesCallback={() => {
          confirmationFn.current()
          setLeavingPage(false)

          confirmationFn.current = () => {}
          resetData()
        }}
      />
    </>
  )
}

type LeavingDialogProps = {
  isOpen: boolean
  yesCallback: () => void
  noCallback: () => void
}

const LeavingDialog = ({
  isOpen,
  yesCallback,
  noCallback
}: LeavingDialogProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>The data will be lost.</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to leave the page?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => noCallback()}>No</AlertDialogCancel>
          <AlertDialogAction onClick={() => yesCallback()}>
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
