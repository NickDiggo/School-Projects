import {z} from 'zod'

// Groot schema voor Tag
export const tagSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Naam is verplicht'),
  userId: z.string(),
})

export const createTagSchema = tagSchema.pick({name: true})

export const updateTagSchema = tagSchema.omit({userId: true})

export const deleteTagSchema = tagSchema.pick({id: true})
