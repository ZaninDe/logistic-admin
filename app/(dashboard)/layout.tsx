/* eslint-disable react-hooks/rules-of-hooks */
import { redirect } from 'next/navigation'

import Navbar from '@/components/navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
