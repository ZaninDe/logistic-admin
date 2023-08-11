'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { RoutesColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

interface RouteDataProps {
  data: RoutesColumn[]
}

export default function RouteClient({ data }: RouteDataProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Rotas de entrega"
          description="Gerenciamento das rotas de entrega"
        />

        <Button className="bg-foreground">Gerar rota de entregas</Button>
      </div>
      <Separator />

      <DataTable searchKey="nf" columns={columns} data={data} />
    </>
  )
}
