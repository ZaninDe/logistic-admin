import axios from 'axios'
import { NextResponse } from 'next/server'

import prismadb from '@/app/libs/prismadb'
import { Route } from '@prisma/client'

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY
const origemFixaInicial =
  'R. Arnaldo Domingos Mota, 265 - Eldorado, São José dos Campos - SP, 12238-572'

interface AddressAndWeight {
  address: string
  totalWeight: number
  order: string
  deliveryDate?: string
}

interface VehicleWithAddresses {
  name: string
  addresses: string[]
  orders: string[]
}

interface Vehicle {
  name: string
  capacity: number
}

async function getDistanceBetweenAddresses(
  origin: string,
  destination: string,
): Promise<number> {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
        origin,
      )}&destinations=${encodeURIComponent(
        destination,
      )}&key=${googleMapsApiKey}`,
    )

    const distanceText = response.data?.rows[0]?.elements[0]?.distance?.text
    if (distanceText) {
      const distanceInKm = parseFloat(distanceText.split(' ')[0])
      return distanceInKm
    } else {
      throw new Error('Não foi possível obter a distância entre os endereços.')
    }
  } catch (error) {
    throw new Error('Erro ao consultar a API do Google Maps: ')
  }
}

async function distanceToLastAddress(addresses: string[]): Promise<number> {
  if (addresses.length < 2) {
    return 0
  }

  const lastAddress = addresses[addresses.length - 1]
  const previousAddress = addresses[addresses.length - 2]

  try {
    const distance = await getDistanceBetweenAddresses(
      previousAddress,
      lastAddress,
    )
    return distance
  } catch (error: any) {
    console.error('Erro ao calcular a distância:', error)
    throw new Error(error)
  }
}

async function optimizeRoutes(
  addressesAndCargo: AddressAndWeight[],
  vehicles: Vehicle[],
): Promise<string[][]> {
  const sortedAddresses = addressesAndCargo

  if (!sortedAddresses) {
    // Lida com a situação em que sortedAddresses é undefined
    console.error('Erro ao obter endereços ordenados')
    return []
  }
  const vehiclesWithRoutes: string[][] = []

  const assignedAddresses = new Set<string>()

  for (const vehicle of vehicles) {
    const currentVehicleRoutes: string[] = []
    const orders: string[] = []
    let currentCargoAmount = 0

    for (const address of sortedAddresses) {
      if (
        !assignedAddresses.has(address.address) &&
        currentCargoAmount + address.totalWeight <= vehicle.capacity
      ) {
        assignedAddresses.add(address.address)
        currentCargoAmount += address.totalWeight
        currentVehicleRoutes.push(address.address)
        orders.push(address.order)
      }

      if (currentVehicleRoutes.length > 0) {
        const distance = await distanceToLastAddress(currentVehicleRoutes)
        if (distance > 35) {
          assignedAddresses.delete(currentVehicleRoutes.pop()!) // Remove o endereço da rota e do conjunto de endereços atribuídos
          currentCargoAmount -= address.totalWeight
          break
        }
      }
    }

    if (currentVehicleRoutes.length > 0) {
      vehiclesWithRoutes.push(
        // name: vehicle.name,
        // addresses: currentVehicleRoutes,
        orders,
      )
    }
  }
  return vehiclesWithRoutes
}

async function getSortedAddresses(addresses: AddressAndWeight[]) {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?key=${apiKey}`
    const destinations = addresses
      .map((endereco: AddressAndWeight) => encodeURIComponent(endereco.address))
      .join('|')
    const response = await axios.get(
      `${apiUrl}&origins=${origemFixaInicial}&destinations=${destinations}`,
    )
    const elements = response.data.rows[0].elements
    const distancesWithAddresses = elements?.map(
      (element: any, index: number) => {
        if (
          element.status === 'OK' &&
          element.distance &&
          element.distance.value
        ) {
          return {
            address: addresses[index],
            distance: element.distance.value,
          }
        }
        return {
          address: addresses[index],
          distance: Infinity,
        }
      },
    )
    const sortedAddresses = distancesWithAddresses
      .sort((a: any, b: any) => a.distance - b.distance)
      .map((item: AddressAndWeight) => item.address)
    return sortedAddresses
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching distance data from Google Maps API')
  }
}

function unifyAddresses(arr: AddressAndWeight[]): AddressAndWeight[] {
  const elements: { [key: string]: AddressAndWeight } = {}

  arr.forEach((element) => {
    if (elements[element.address]) {
      elements[element.address].totalWeight += element.totalWeight
      elements[element.address].order.push(...element.order)
    } else {
      elements[element.address] = { ...element }
    }
  })

  return Object.values(elements)
}

export async function POST(request: Request) {
  let routes: Route[]
  const sales = await prismadb.sale.findMany()

  const veiculos: Vehicle[] = [
    { name: 'Veiculo 1', capacity: 400 },
    { name: 'Veiculo 2', capacity: 400 },
    { name: 'Veiculo 4', capacity: 400 },
    { name: 'Veiculo 5', capacity: 800 },
    { name: 'Veiculo 6', capacity: 800 },
    { name: 'Veiculo 7', capacity: 800 },
  ]

  const adresses: AddressAndWeight[] = sales.map((sale) => ({
    address: sale.address,
    totalWeight: sale.totalWeight,
    order: sale.orderCode,
  }))

  const order = unifyAddresses(adresses)

  console.log(order)

  try {
    const sortedAddresses = await getSortedAddresses(adresses)
    const delivery = await optimizeRoutes(sortedAddresses, veiculos)

    delivery.map(async (item) => {
      const route = await prismadb.route.createMany({
        data: {
          orders: item,
        },
      })
    })

    return NextResponse.json('Rotas criadas com sucesso!')
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
