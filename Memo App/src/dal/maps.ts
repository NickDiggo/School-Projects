import 'server-only'

//src/dal/maps.ts
import type {Tag} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'

export async function getMaps(): Promise<Tag[]> {
  return prismaClient.map.findMany({
    orderBy: {name: 'asc'},
  })
}

export async function getMapsByUserId(userId: string): Promise<Tag[]> {
  return prismaClient.map.findMany({
    where: {userId: userId},
    orderBy: {name: 'asc'},
  })
}

export async function createMap({name, userId}: {name: string; userId: string}) {
  return prismaClient.map.create({
    data: {name, userId},
  })
}

export async function updateMap({id, name}: {id: string; name: string; userId: string}) {
  return prismaClient.map.update({where: {id}, data: {name}})
}

export async function deleteMap(id: string, userId: string): Promise<void> {
  await prismaClient.map.delete({where: {id, userId}})
}
