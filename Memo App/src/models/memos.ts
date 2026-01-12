//src/models/memos.ts
import type {Prisma} from '@/generated/prisma/client'

export const fullMemoInclude = {
  comments: true,
  images: true,
  map: true,
  memoTags: {include: {tag: true}},
} satisfies Prisma.MemoInclude

export type FullMemo = Prisma.MemoGetPayload<{include: typeof fullMemoInclude}>
