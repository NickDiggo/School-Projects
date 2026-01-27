// src/schemas/memoSchemas.ts
import {z} from 'zod'

export const memoImageSchema = z.object({
  url: z.string(),
  description: z.string().optional(),
})

export const memoSchema = z.object({
  id: z.uuid(),
  title: z.string().min(5, 'The title must be at least 5 characters long.'),
  content: z.string().nullable().optional(),
  mapId: z.string('Map is required.'),
  tagIds: z.array(z.string()).optional().nullable(),
  imageUrls: z.array(memoImageSchema).optional(),
})

export const createMemoSchema = memoSchema.omit({
  id: true,
})

export const updateMemoSchema = memoSchema.omit({
  mapId: true,
  tagIds: true,
})

export const deleteMemoSchema = memoSchema.pick({
  id: true,
})
