'use client'

import { ColumnDef } from '@tanstack/react-table'

export type SalesColumn = {
  tp_ped: string
  date: string
  date_lib: string
  id: string
  nf: string
  valor: number
  cliente: string
  nome_fantasia: string
  peso: number
  vendedor: string
  endereco: string
}

export const columns: ColumnDef<SalesColumn>[] = [
  {
    accessorKey: 'tp_ped',
    header: 'TP PED',
  },
  {
    accessorKey: 'date',
    header: 'DT CAD PEDIDO',
  },
  {
    accessorKey: 'date_lib',
    header: 'DT LIB',
  },
  {
    accessorKey: 'id',
    header: 'PEDIDO',
  },
  {
    accessorKey: 'nf',
    header: 'NF',
  },
  {
    accessorKey: 'valor',
    header: 'VALOR',
  },
  {
    accessorKey: 'cliente',
    header: 'CLIENTE',
  },
  {
    accessorKey: 'nome_fantasia',
    header: 'NOME FANTASIA',
  },
  {
    accessorKey: 'peso',
    header: 'PESO',
  },
  {
    accessorKey: 'vendedor',
    header: 'VENDEDOR',
  },
  {
    accessorKey: 'endereco',
    header: 'ENDEREÇO',
  },
]
