'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Clipboard,
  ClipboardText,
  IdentificationBadge,
  Path,
  Truck,
  UsersThree,
  X,
} from '@phosphor-icons/react'
import { Button } from './ui/button'

interface SidebarProps {
  isOpen: boolean
  toggle: () => void
}

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  const pathName = usePathname()

  const routes = [
    {
      href: `/vendedores`,
      label: 'Vendedores',
      active: pathName === `/vendedores`,
      icon: <IdentificationBadge size={30} />,
    },
    {
      href: `/clientes`,
      label: 'Clientes',
      active: pathName === `/clientes`,
      icon: <UsersThree size={30} />,
    },
    {
      href: `/produtos`,
      label: 'Produtos',
      active: pathName === `/produtos`,
      icon: <ClipboardText size={30} />,
    },
    {
      href: `/frota`,
      label: 'Frota',
      active: pathName === `/frota`,
      icon: <Truck size={30} />,
    },
    {
      href: `/rotas`,
      label: 'Rotas',
      active: pathName === `/rotas`,
      icon: <Path size={30} />,
    },
    {
      href: `/vendas`,
      label: 'Vendas',
      active: pathName === `/vendas`,
      icon: <Clipboard size={30} />,
    },
  ]

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-[#262626] text-white transition-transform duration-300${
        isOpen
          ? 'transform translate-x-0 shadow-lg shadow-black shadow-right'
          : 'transform -translate-x-full'
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="absolute top-4 right-4"
      >
        <X size={32} color="#fafafa" onClick={toggle} />
      </Button>
      <nav
        className={cn(
          'flex flex-col pt-24 items-center justify-center lg:space-x-6',
        )}
      >
        {routes.map((route) => (
          <div
            key={route.href}
            className={cn(
              'transition-colors hover:text-background px-10 items-center pb-5',
              route.active ? 'text-white' : 'text-muted-foreground',
            )}
          >
            <Link
              href={route.href}
              className={cn(
                'flex text-base font-medium transition-colors hover:text-background justify-start',
                route.active ? 'text-white' : 'text-muted-foreground',
              )}
            >
              <div className="pr-5">{route.icon}</div>
              {route.label}
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  )
}
