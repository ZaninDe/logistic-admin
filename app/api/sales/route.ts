import prismadb from '@/app/libs/prismadb'
import { data } from 'autoprefixer'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request) {
  const body = await request.json()

  const saleSchema = z.array(
    z.object({
      tp_ped: z.string(),
      date: z.string(),
      dt_lib: z.string(),
      re: z.any().optional(),
      te: z.any().optional(),
      pedido: z.number(),
      nf: z.any(),
      valor: z.number(),
      cliente: z.string(),
      nome_fantasia: z.string().optional(),
      municipio: z.string(),
      bairro: z.string(),
      peso: z.number(),
      t: z.any().optional(),
      vendedor: z.string(),
      endereco: z.string(),
    }),
  )

  const data = saleSchema.parse(body)

  // const sale = await prismadb.sale.create({
  //   data: {
  //     orderCode,
  //     saleDate,
  //     customerName,
  //     totalWeight,
  //     address,
  //     seller,
  //     totalPrice,
  //     fantasyName,
  //   },
  // })

  console.log(data)
  return NextResponse.json(data, { status: 201 })
}

export async function GET(request: Request) {
  const sales = await prismadb.sale.findMany()

  return NextResponse.json(sales)
}
