//src/serverFunctions/comments.ts
'use server'

import {revalidatePath} from 'next/cache'
import {protectedFormAction, protectedServerFunction} from '@/lib/serverFunctions'
import {addCommentSchema, deleteCommentSchema} from '@/schemas/commentSchemas'
import {createComment, deleteCommentById} from '@/dal/comments'

export const deleteCommentAction = protectedServerFunction({
  schema: deleteCommentSchema,
  serverFn: async ({data, profile, logger}) => {
    await deleteCommentById(data.commentId, profile.id)
    logger.info({msg: 'Comment deleted', commentId: data.commentId, memoId: data.memoId})
    revalidatePath(`/memos/${data.memoId}`)
  },
  functionName: 'Delete comment action',
})

export const addCommentAction = protectedFormAction({
  schema: addCommentSchema,
  serverFn: async ({data, profile, logger}) => {
    const comment = await createComment({...data, userId: profile.id})
    logger.info({msg: 'Comment added', commentId: comment.id, memoId: data.memoId, userId: profile.id})
    revalidatePath(`/memos/${data.memoId}`)
  },
  functionName: 'Add comment action',
})
