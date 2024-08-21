'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { MAX_VISIBLE_PAGES_PAGINATION } from '@/lib/constants'
import { useSearchParams, useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

function PaginationComponent({
  productsLength,
  productsPerPage
}: {
  productsLength: number
  productsPerPage: number
}) {
  const totalPages = Math.ceil(productsLength / productsPerPage)
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const activePage = Number(searchParams.get('page')) || 1
  const disabledClasses = 'pointer-events-none cursor-not-allowed opacity-50'

  function calculatePaginationRange() {
    let startPage = Math.max(1, activePage - 2)
    let endPage = Math.min(startPage + MAX_VISIBLE_PAGES_PAGINATION, totalPages)

    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES_PAGINATION)
    }

    const range = []
    for (let i = startPage; i <= endPage; i++) {
      range.push(i)
    }

    return range
  }

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams)

    if (newPage === 1) {
      params.delete('page')
    } else {
      params.set('page', newPage.toString())
    }

    push(`?${params.toString()}`)
  }

  const prevPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (activePage > 1) {
      updatePage(activePage - 1)
    }
  }

  const nextPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (activePage < totalPages) {
      updatePage(activePage + 1)
    }
  }

  const visiblePages = calculatePaginationRange()

  return (
    <Pagination className="hidden md:flex">
      {activePage <= totalPages && (
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={activePage === 1 || totalPages <= 1}
              className={
                activePage === 1 || totalPages <= 1 ? disabledClasses : ''
              }
              href="#"
              onClick={prevPage}
            />
          </PaginationItem>

          {totalPages > MAX_VISIBLE_PAGES_PAGINATION && activePage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href={'#'}
                  onClick={e => {
                    e.preventDefault()
                    updatePage(1)
                  }}>
                  1
                </PaginationLink>
              </PaginationItem>
              {activePage > 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {visiblePages.map(page => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={e => {
                  e.preventDefault()
                  updatePage(page)
                }}
                href="#"
                isActive={page === activePage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 1 &&
            activePage < totalPages - 2 &&
            totalPages - 2 > MAX_VISIBLE_PAGES_PAGINATION && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={'#'}
                    onClick={e => {
                      e.preventDefault()
                      updatePage(totalPages)
                    }}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

          <PaginationItem>
            <PaginationNext
              aria-disabled={activePage === totalPages || totalPages <= 1}
              className={
                activePage === totalPages || totalPages <= 1
                  ? disabledClasses
                  : ''
              }
              href="#"
              onClick={nextPage}
            />
          </PaginationItem>
        </PaginationContent>
      )}
    </Pagination>
  )
}

export default PaginationComponent
