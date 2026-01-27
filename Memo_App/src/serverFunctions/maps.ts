//src/serverFunctions/maps.ts
'use server'

import {redirect} from 'next/navigation'
import {createMap, deleteMap, getMapsByUserId, updateMap} from '@/dal/maps'
import {protectedFormAction, protectedServerFunction} from '@/lib/serverFunctions'
import {createMapSchema, updateMapSchema, deleteMapSchema} from '@/schemas/mapSchemas'

export const createMapAction = protectedFormAction({
  schema: createMapSchema,

  serverFn: async ({data, profile, logger}) => {
    const existing = await getMapsByUserId(profile.id).then(maps => maps.find(map => map.name === data.name))

    if (existing) {
      return {
        success: false,
        errors: {name: ['Folder with this name already exists']},
      }
    }

    const map = await createMap({
      name: data.name,
      userId: profile.id,
    })

    logger.info({msg: 'Map created', mapId: map.id})
    if (!existing) {
      redirect('/memos/editTagsAndFolders')
    }
  },
  functionName: 'Create map action',
})

export const updateMapAction = protectedFormAction({
  schema: updateMapSchema,

  serverFn: async ({data, profile, logger}) => {
    const {id, name} = data

    const existing = await getMapsByUserId(profile.id).then(maps =>
      maps.find(map => map.name === name && map.id !== id),
    )

    if (existing) {
      return {
        success: false,
        errors: {name: ['Folder with this name already exists']},
      }
    }

    await updateMap({
      id,
      name,
      userId: profile.id,
    })

    logger.info({msg: 'Map updated', mapId: id})

    if (existing) {
      redirect('/memos/editTagsAndFolders')
    }
  },
  functionName: 'Update map action',
})

export const deleteMapAction = protectedServerFunction({
  schema: deleteMapSchema,

  serverFn: async ({data, profile, logger}) => {
    await deleteMap(data.id, profile.id)

    logger.info({msg: 'Map deleted', mapId: data.id})

    redirect('/memos/editTagsAndFolders')
  },
  functionName: 'Delete map action',
})
