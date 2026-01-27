// src/app/api/comments/route.ts
import {protectedApiRoute} from '@/lib/apiRoute'
import {addCommentSchema, deleteCommentSchema} from '@/schemas/commentSchemas'
import {createComment, deleteCommentById} from '@/dal/comments'
import {ok} from '@/lib/routeResponses'

export const POST = protectedApiRoute({
  schema: addCommentSchema,
  routeFn: async ({data, profile}) => {
    const comment = await createComment({...data, userId: profile.id})
    return ok(comment)
  },
})

export const DELETE = protectedApiRoute({
  schema: deleteCommentSchema, // ⚠ TypeScript override
  routeFn: async ({data, profile}) => {
    await deleteCommentById(data.commentId, profile.id)
    return ok()
  },
})
