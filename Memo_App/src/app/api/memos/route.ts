//src/app/api/memos/route.ts
import {createMemo, getMemosByUser} from '@/dal/memos'
import {createMemoSchema} from '@/schemas/memoSchemas'

import {protectedApiRoute} from '@/lib/apiRoute'
import {ok} from '@/lib/routeResponses'

export const GET = protectedApiRoute({
  async routeFn({profile}) {
    const memos = await getMemosByUser(profile.id)
    return ok(memos)
  },
})

export const POST = protectedApiRoute({
  schema: createMemoSchema,
  async routeFn({data, profile}) {
    const memo = await createMemo({
      userId: profile.id,
      title: data.title,
      content: data.content,
      mapId: data.mapId,
      tagIds: data.tagIds,
      imageUrls: data.imageUrls,
    })

    return ok(memo)
  },
})
