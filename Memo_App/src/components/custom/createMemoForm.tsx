'use client'

import type {ChangeEvent, FunctionComponent} from 'react'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {ImagePlus, X} from 'lucide-react'
import {useFieldArray, useWatch} from 'react-hook-form'

import Form from '@/components/custom/form'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {createMemoSchema} from '@/schemas/memoSchemas'
import {createMemoAction, uploadMemoImage} from '@/serverFunctions/memos'
import type {Map, Tag} from '@/generated/prisma/client'
import FormError from '@/components/custom/formError'
import FormInput from '@/components/custom/formInput'

interface CreateMemoFormProps {
  tags: Tag[]
  maps: Map[]
}

const CreateMemoForm: FunctionComponent<CreateMemoFormProps> = ({tags, maps}) => {
  const [form, createMemo] = useZodValidatedForm(createMemoSchema, createMemoAction, {
    defaultValues: {
      tagIds: [],
      imageUrls: [],
    },
  })

  const [tagSelectValue, setTagSelectValue] = useState<string>('')

  // (soort subscription op de geselecteerde tags zodat de paginan niet gererendert moet worden)
  const watchTagIds = useWatch({control: form.control, name: 'tagIds'})
  const selectedTagIds = Array.isArray(watchTagIds) ? watchTagIds : []

  //===Niet geselecteerd dropdwon tags===
  const availableTags = tags.filter(tag => !selectedTagIds.includes(tag.id))

  const addTag = (tagId: string) => {
    if (!selectedTagIds.includes(tagId)) {
      form.setValue('tagIds', [...selectedTagIds, tagId])
    }
  }

  const removeTag = (tagId: string) => {
    form.setValue(
      'tagIds',
      selectedTagIds.filter(id => id !== tagId),
    )
  }

  // === FieldArray voor afbeeldingen ===
  const images = useFieldArray({
    control: form.control,
    name: 'imageUrls',
  })

  // === File upload handler ===
  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (const file of Array.from(files)) {
      const url = await uploadMemoImage({file})
      images.append({url})
    }
  }

  return (
    <Form hookForm={form} action={createMemo}>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* ================= Memo's  ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Memo gegevens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput {...form.register('title')} placeholder="Titel" />
            <Textarea {...form.register('content')} placeholder="Inhoud (optioneel)" rows={5} />
            <FormError path="content" />

            {/* Map select */}
            <Select {...form.register('mapId')} onValueChange={value => form.setValue('mapId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer map" />
              </SelectTrigger>

              <SelectContent>
                {maps.map(map => (
                  <SelectItem key={map.id} value={map.id}>
                    {map.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormError path="mapId" />
          </CardContent>
        </Card>

        {/* ================= Tags Section ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tag dropdown */}
            <Select
              value={tagSelectValue}
              onValueChange={tagId => {
                addTag(tagId)
                setTagSelectValue('')
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Tag toevoegen" />
              </SelectTrigger>
              <SelectContent>
                {availableTags.map(tag => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Hidden inputs voor react-hook-form */}
            {selectedTagIds.map((id, index) => (
              <input key={id} type="hidden" {...form.register(`tagIds.${index}`)} value={id} />
            ))}

            {/* Geselecteerde tags */}
            {selectedTagIds.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTagIds.map(tagId => {
                  const tag = tags.find(t => t.id === tagId)
                  if (!tag) return null

                  return (
                    <div key={tag.id} className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm">
                      {tag.name}
                      <Button type="button" size="icon" variant="ghost" onClick={() => removeTag(tag.id)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ================= Images Section ================= */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Afbeeldingen</CardTitle>
            <label
              htmlFor="image-upload"
              className="flex items-center gap-2 cursor-pointer text-sm text-primary hover:text-primary/80">
              <ImagePlus className="h-4 w-4" />
              Uploaden
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </CardHeader>

          <CardContent className="space-y-4">
            {images.fields.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                    <img
                      src={form.getValues(`imageUrls.${index}.url`) || '/placeholder.svg'}
                      alt={`Foto ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <input type="hidden" {...form.register(`imageUrls.${index}.url`)} />
                    <input type="hidden" {...form.register(`imageUrls.${index}.description`)} />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1"
                      onClick={() => images.remove(index)}>
                      X
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <ImagePlus className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">Geen foto's toegevoegd</p>
                <p className="text-xs text-muted-foreground mt-1">Klik op "Uploaden" om foto's toe te voegen</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit button */}
        <SubmitButtonWithLoading text="Memo aanmaken" loadingText="Bezig met opslaan..." />
      </div>
    </Form>
  )
}

export default CreateMemoForm
