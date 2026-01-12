//src/dal/tags.ts
import type {Tag} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'

export async function getTags(): Promise<Tag[]> {
  return prismaClient.tag.findMany({
    orderBy: {name: 'asc'},
  })
}
