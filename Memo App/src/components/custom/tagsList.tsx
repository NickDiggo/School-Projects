// src/components/custom/tagsList.tsx
'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Edit2, Trash2} from 'lucide-react'
import Form from '@/components/custom/form'
import FormInput from '@/components/custom/formInput'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import type {Tag} from '@/generated/prisma/client'
import {createTagAction, updateTagAction, deleteTagAction} from '@/serverFunctions/tags'
import {createTagSchema, updateTagSchema} from '@/schemas/tagSchemas'

interface TagsListProps {
  tags: Tag[]
}

export default function TagsList({tags}: TagsListProps) {
  const [editingTagId, setEditingTagId] = useState<string | null>(null)

  // Hooks moeten buiten de map blijven
  const [createForm, createTag] = useZodValidatedForm(createTagSchema, createTagAction)
  const [updateForm, updateTag] = useZodValidatedForm(updateTagSchema, updateTagAction)

  const handleDelete = async (tagId: string) => {
    await deleteTagAction({id: tagId})
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Links: bestaande tags */}
      <div className="flex-1 space-y-4">
        {tags.map(tag => (
          <div key={tag.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span>{tag.name}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingTagId(editingTagId === tag.id ? null : tag.id)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(tag.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Inline edit form */}
            {editingTagId === tag.id && (
              <Form
                hookForm={updateForm}
                action={data => {
                  updateTag(data)
                }}
                className="mt-2 flex flex-col gap-2">
                <FormInput label="" name="name" placeholder="Nieuwe naam..." defaultValue={tag.name} />
                {/* Zorg dat we weten welke tag we updaten */}
                <input type="hidden" {...updateForm.register('id')} value={tag.id} />
                <SubmitButtonWithLoading loadingText="Opslaan..." text="Opslaan" />
              </Form>
            )}
          </div>
        ))}
      </div>

      {/* Rechts: nieuwe tag toevoegen */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">Tag toevoegen</h3>
        <Form hookForm={createForm} action={data => createTag(data)} className="flex flex-col gap-2">
          <FormInput label="" name="name" placeholder="Nieuwe tag..." />
          <SubmitButtonWithLoading loadingText="Toevoegen..." text="Toevoegen" />
        </Form>
      </div>
    </div>
  )
}
