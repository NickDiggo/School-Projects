//src/dal/memos.ts

import 'server-only'
import {prismaClient} from './prismaClient'
import {type FullMemo, fullMemoInclude} from '@/models/memos'

// | null dient om als de url handmatig word aangepast naar een onbestaande uuid de dal toch te laten werken
export async function getMemoById(id: string): Promise<FullMemo | null> {
  return prismaClient.memo.findUnique({
    where: {id},
    include: fullMemoInclude,
  })
}

export async function getMemosByUser(userId: string): Promise<FullMemo[]> {
  return prismaClient.memo.findMany({
    where: {userId},
    include: fullMemoInclude,
    orderBy: {createdAt: 'desc'},
  })
}

export type UpdateMemoParams = {
  id: string
  userId: string
  title: string
  content?: string | null
  imageUrls?: {url: string; description?: string | null}[]
}

export async function updateMemo({id, userId, title, content, imageUrls}: UpdateMemoParams): Promise<FullMemo> {
  return prismaClient.memo.update({
    where: {id},
    data: {
      title,
      content: content ?? null,
      user: {connect: {id: userId}},
      images: imageUrls
        ? {
            deleteMany: {},
            createMany: {
              data: imageUrls.map(({url, description}) => ({
                url,
                description: description ?? null,
              })),
            },
          }
        : undefined,
    },
    include: fullMemoInclude,
  })
}
export async function deleteMemo(id: string, userId: string): Promise<void> {
  await prismaClient.memo.delete({where: {id, userId}})
}

export type CreateMemoParams = {
  userId: string
  title: string
  content?: string | null
  mapId: string
  tagIds?: string[] | null
  imageUrls?: {url: string; description?: string | null}[]
}
export function createMemo({userId, title, content, mapId, imageUrls, tagIds}: CreateMemoParams): Promise<FullMemo> {
  return prismaClient.memo.create({
    data: {
      title,
      content: content ?? null,
      user: {connect: {id: userId}},
      map: {connect: {id: mapId}},
      images: imageUrls
        ? {
            createMany: {
              data: imageUrls.map(({url, description}) => ({
                url,
                description: description ?? null,
              })),
            },
          }
        : undefined,
      memoTags:
        tagIds && tagIds.length > 0
          ? {
              createMany: {
                data: tagIds.map(tagId => ({
                  tagId,
                })),
              },
            }
          : undefined,
    },

    include: fullMemoInclude,
  })
}
