import {z} from 'zod'

// Groot schema (domain / db)
export const mapSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Naam is verplicht'),
  userId: z.string(),
})

export const createMapSchema = mapSchema.pick({
  name: true,
})

export const updateMapSchema = mapSchema.omit({
  userId: true,
})

export const deleteMapSchema = mapSchema.pick({
  id: true,
})
