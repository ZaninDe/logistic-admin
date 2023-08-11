'use client'

import { ColumnDef } from '@tanstack/react-table'

export type RoutesColumn = {
  license_plate: string
  vehicle_type: string // will be model in the future
  driver: string // // will be model in the future
  cities: string[]
  totalWeight: number
  delivery_date: string
}

export const columns: ColumnDef<RoutesColumn>[] = [
  {
    accessorKey: 'license_plate',
    header: 'PLACA',
  },
  {
    accessorKey: 'vehicle_type',
    header: 'VEÍCULO',
  },
  {
    accessorKey: 'driver',
    header: 'MOTORISTA',
  },
  {
    accessorKey: 'cities',
    header: 'CIDADES',
  },
  {
    accessorKey: 'totalWeight',
    header: 'PESO TOTAL',
  },
  {
    accessorKey: 'delivery_date',
    header: 'ENTREGA',
  },
]
