// src/components/custom/mapsList.tsx
'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Edit2, Trash2} from 'lucide-react'
import Form from '@/components/custom/form'
import FormInput from '@/components/custom/formInput'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {createMapAction, updateMapAction, deleteMapAction} from '@/serverFunctions/maps'
import {createMapSchema, updateMapSchema} from '@/schemas/mapSchemas'
import type {getMapsByUserId} from '@/dal/maps'
type MapWithCount = Awaited<ReturnType<typeof getMapsByUserId>>[number]

interface MapsListProps {
  maps: MapWithCount[]
}

export default function MapsList({maps}: MapsListProps) {
  const [editingMapId, setEditingMapId] = useState<string | null>(null)

  const [createForm, createMap] = useZodValidatedForm(createMapSchema, createMapAction)
  const [updateForm, updateMap] = useZodValidatedForm(updateMapSchema, updateMapAction)

  const handleDelete = async (mapId: string) => {
    await deleteMapAction({id: mapId})
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Links: bestaande mappen */}
      <div className="flex-1 space-y-4">
        {maps.map(map => (
          <div key={map.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span>{map.name}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingMapId(editingMapId === map.id ? null : map.id)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(map.id)}
                  className={map._count.memos === 0 ? '' : 'invisible pointer-events-none'}
                  aria-hidden={map._count.memos !== 0}
                  tabIndex={map._count.memos !== 0 ? -1 : 0}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Inline edit form */}
            {editingMapId === map.id && (
              <Form
                hookForm={updateForm}
                action={data => {
                  updateMap(data)
                }}
                className="mt-2 flex flex-col gap-2">
                <FormInput label="" name="name" placeholder="Nieuwe naam..." defaultValue={map.name} />
                <input type="hidden" {...updateForm.register('id')} value={map.id} />
                <SubmitButtonWithLoading loadingText="Opslaan..." text="Opslaan" />
              </Form>
            )}
          </div>
        ))}
      </div>

      {/* Rechts: nieuwe map toevoegen */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">Map toevoegen</h3>
        <Form hookForm={createForm} action={data => createMap(data)} className="flex flex-col gap-2">
          <FormInput label="" name="name" placeholder="Nieuwe map..." />
          <SubmitButtonWithLoading loadingText="Toevoegen..." text="Toevoegen" />
        </Form>
      </div>
    </div>
  )
}
