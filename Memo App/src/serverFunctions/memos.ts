// src/serverFunctions/memos.ts
'use server'

import {redirect} from 'next/navigation'
import {createMemo, deleteMemo, getMemosByUser, updateMemo} from '@/dal/memos'
import {protectedFormAction, protectedServerFunction} from '@/lib/serverFunctions'
import {createMemoSchema, deleteMemoSchema, updateMemoSchema} from '@/schemas/memoSchemas'
import {uploadImageToSupabase} from '@/lib/supaImageUpload'

export const uploadMemoImage = async ({file}: {file: File}) => {
  return uploadImageToSupabase({file})
}

export const updateMemoAction = protectedFormAction({
  schema: updateMemoSchema,
  serverFn: async ({data, profile, logger}) => {
    const {id, title, content, imageUrls} = data

    await updateMemo({
      id,
      userId: profile.id,
      title,
      content,
      imageUrls,
    })

    logger.info({msg: 'Memo updated', memoId: id})

    redirect(`/memos/${id}`)
  },
  functionName: 'Update memo action',
})

export const deleteMemoServerFunction = protectedServerFunction({
  schema: deleteMemoSchema,
  serverFn: async ({data, profile, logger}) => {
    await deleteMemo(data.id, profile.id)

    logger.info({msg: 'Memo deleted', memoId: data.id})

    redirect('/memos')
  },
  functionName: 'Delete memo action',
})

export const createMemoAction = protectedFormAction({
  schema: createMemoSchema,

  serverFn: async ({data, profile, logger}) => {
    const memo = await createMemo({...data, userId: profile.id})

    logger.info({msg: 'Memo created', memoId: memo.id})

    redirect('/memos')
  },
  functionName: 'Create memo action',
})
