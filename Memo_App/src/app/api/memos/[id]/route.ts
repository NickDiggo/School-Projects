import {protectedApiRoute} from '@/lib/apiRoute'
import {deleteMemo, getMemoById, updateMemo} from '@/dal/memos'
import {ok, badRequest} from '@/lib/routeResponses'
import {updateMemoSchema} from '@/schemas/memoSchemas'

export const GET = protectedApiRoute<{id: string}>({
  async routeFn({profile}, {id}) {
    const memo = await getMemoById(id)

    if (!memo || memo.userId !== profile.id) {
      return badRequest('Memo niet gevonden')
    }

    return ok(memo)
  },
})

export const PUT = protectedApiRoute<{id: string}, typeof updateMemoSchema>({
  schema: updateMemoSchema,
  async routeFn({data, profile}, {id}) {
    const memo = await updateMemo({
      id,
      userId: profile.id,
      title: data.title,
      content: data.content,
      imageUrls: data.imageUrls,
    })

    return ok(memo)
  },
})

export const DELETE = protectedApiRoute<{id: string}>({
  async routeFn({profile}, {id}) {
    await deleteMemo(id, profile.id)
    return ok()
  },
})
