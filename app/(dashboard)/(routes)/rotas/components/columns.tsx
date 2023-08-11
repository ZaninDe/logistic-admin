'use client'

import { ColumnDef } from '@tanstack/react-table'

export type RoutesColumn = {
  pedido: string
  veiculo: string
  endereco: string
  nf: string
  nome_fantasia: string
  peso: number
  dataEntrega?: string
}

export const columns: ColumnDef<RoutesColumn>[] = [
  {
    accessorKey: 'veiculo',
    header: 'VEÍCULO',
  },
  {
    accessorKey: 'nf',
    header: 'NF',
  },
  {
    accessorKey: 'endereco',
    header: 'ENDEREÇO',
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
    accessorKey: 'dataEntrega',
    header: 'ENTREGA',
  },
]
