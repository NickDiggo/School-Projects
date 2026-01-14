//src/serverFunctions/tags.ts
'use server'

import {redirect} from 'next/navigation'
import {createTag, deleteTag, getTagsByUser, updateTag} from '@/dal/tags'
import {protectedFormAction, protectedServerFunction} from '@/lib/serverFunctions'
import {createTagSchema, updateTagSchema, deleteTagSchema} from '@/schemas/tagSchemas'

export const createTagAction = protectedFormAction({
  schema: createTagSchema,
  serverFn: async ({data, profile, logger}) => {
    const existing = await getTagsByUser(profile.id).then(tags => tags.find(tag => tag.name === data.name))

    if (existing) {
      return {
        success: false,
        errors: {name: ['Er bestaat al een tag met deze naam']},
      }
    }

    const tag = await createTag({
      name: data.name,
      userId: profile.id,
    })

    logger.info({msg: 'Tag created', tagId: tag.id})

    if (!existing) {
      redirect('/memos/editTagsAndFolders')
    }
  },
  functionName: 'Create tag action',
})

export const updateTagAction = protectedFormAction({
  schema: updateTagSchema,

  serverFn: async ({data, profile, logger}) => {
    const {id, name} = data

    const existing = await getTagsByUser(profile.id).then(
      tags => tags.find(tag => tag.name === name && tag.id !== id), // let op: tag.id !== id
    )

    if (existing) {
      return {
        success: false,
        errors: {name: ['Er bestaat al een tag met deze naam']},
      }
    }

    // --- Voer update uit ---
    await updateTag({
      id,
      name,
      userId: profile.id,
    })

    logger.info({msg: 'Tag updated', tagId: id})

    if (!existing) {
      redirect('/memos/editTagsAndFolders')
    }
  },
  functionName: 'Update tag action',
})

export const deleteTagAction = protectedServerFunction({
  schema: deleteTagSchema,

  serverFn: async ({data, profile, logger}) => {
    await deleteTag(data.id, profile.id)

    logger.info({msg: 'Tag deleted', tagId: data.id})

    redirect('/memos/editTagsAndFolders')
  },
  functionName: 'Delete tag action',
})
