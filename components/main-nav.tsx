'use client'

import { List, UserCircle } from '@phosphor-icons/react'
import { Button } from './ui/button'

interface NavbarProps {
  toggle: () => void
  isOpen: boolean
}

export default function MainNav({ toggle, isOpen }: NavbarProps) {
  return (
    <div className="flex flex-1 h-20 px-10 bg-background items-center justify-between">
      <Button variant="ghost" size="icon" onClick={toggle}>
        <List size={32} color="#0c0a09" />
      </Button>
      <UserCircle size={40} color="#0c0a09" />
    </div>
  )
}
