//src/dal/maps.ts

import 'server-only'
import {prismaClient} from './prismaClient'
import type {Map} from '@/generated/prisma/client'

//mss nog voor later (persoonlijke maps)
// export function getMapsByUser(userId: string): Promise<Map[]> {
//   return prismaClient.map.findMany({
//     where: {userId},
//     orderBy: {name: 'asc'},
//   })
// }

export function getMaps(): Promise<Map[]> {
  return prismaClient.map.findMany({
    orderBy: {name: 'asc'},
  })
}
