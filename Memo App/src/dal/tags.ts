import 'server-only'

//src/dal/tags.ts
import type {Tag} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'

export async function getTags(): Promise<Tag[]> {
  return prismaClient.tag.findMany({
    orderBy: {name: 'asc'},
  })
}

export async function getTagsByUser(userId: string): Promise<Tag[]> {
  return prismaClient.tag.findMany({
    where: {userId: userId},
    orderBy: {name: 'asc'},
  })
}

export async function createTag({name, userId}: {name: string; userId: string}) {
  return prismaClient.tag.create({
    data: {name, userId},
  })
}

export async function updateTag({id, name}: {id: string; name: string; userId: string}) {
  return prismaClient.tag.update({where: {id}, data: {name}})
}

export async function deleteTag(id: string, userId: string): Promise<void> {
  await prismaClient.tag.delete({where: {id, userId}})
}
