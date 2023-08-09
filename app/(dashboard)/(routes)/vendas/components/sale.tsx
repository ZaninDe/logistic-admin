'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { SalesColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

import { useState } from 'react'
import axios from 'axios'
import { InputFile } from '@/components/ui/inputs/file-input'
import { useSaleModal } from '@/hooks/use-sale-modal'

interface SaleDataProps {
  data: SalesColumn[]
}

export default function SaleClient({ data }: SaleDataProps) {
  const [open, setOpen] = useState(false)

  const storeModal = useSaleModal()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Vendas (${data.length})`}
          description="Gerenciamento das vendas"
        />

        <Button
          onClick={() => {
            setOpen(false)
            storeModal.onOpen()
          }}
          className="bg-foreground"
        >
          Adicionar planilha de vendas
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="pedido" columns={columns} data={data} />
    </>
  )
}
