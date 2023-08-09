'use client'

import { useEffect, useState } from 'react'

import { SaleModal } from '@/components/modals/sale-modal'

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SaleModal />
    </>
  )
}
