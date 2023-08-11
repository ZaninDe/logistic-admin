'use client'

import { ColumnDef } from '@tanstack/react-table'

export type SalesColumn = {
  tp_ped: string
  date: string
  date_lib: string
  pedido: string
  nf: string
  valor: string
  cliente: string
  nome_fantasia: string
  peso: string
  vendedor: string
  endereco: string
  dataEntrega?: string
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
    accessorKey: 'pedido',
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
  {
    accessorKey: 'dataEntrega',
    header: 'ENTREGA',
  },
]
