'use client'

import { createContext, useContext, useState } from 'react'

type ShoppingBagContextType = {
  isOpen: boolean
  handleOpen: (value: boolean) => void
}

const ShoppingBagContext = createContext<ShoppingBagContextType | null>(null)

export const ShoppingBagProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = (value: boolean) => setIsOpen(value)

  return (
    <ShoppingBagContext.Provider value={{ isOpen, handleOpen }}>
      {children}
    </ShoppingBagContext.Provider>
  )
}

export const useShoppingBagContext = () => {
  const context = useContext(ShoppingBagContext)

  if (typeof context === 'undefined' || context === null) {
    throw new Error('You must use useShoppingBag inside ShoppingBagProvider')
  }

  return context
}
