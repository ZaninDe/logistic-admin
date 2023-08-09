'use client'

import MainNav from '@/components/main-nav'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import Sidebar from './sidebar'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="border-b bg-background">
      <div className="flex h-16 items-center px-10">
        <MainNav toggle={toggle} isOpen={isOpen} />
        <Sidebar toggle={toggle} isOpen={isOpen} />
        <div className="ml-auto flex items-center space-x-4"></div>
      </div>
    </div>
  )
}
