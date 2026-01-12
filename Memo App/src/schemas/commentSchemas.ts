// src/schemas/commentSchemas.ts
import {z} from 'zod'

export const commentSchema = z.object({
  commentId: z.uuid(),
  memoId: z.uuid(),
  content: z.string().min(1, 'Comment mag niet leeg zijn'),
})

export const addCommentSchema = commentSchema.omit({
  commentId: true,
})

export const deleteCommentSchema = commentSchema.pick({
  commentId: true,
  memoId: true,
})
