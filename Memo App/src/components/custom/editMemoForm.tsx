//src/components/custom/editMemoForm.tsx
'use client'

import type {FunctionComponent, ChangeEvent} from 'react'
import {useTransition} from 'react'
import {Button} from '@/components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {Input} from '@/components/ui/input'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {ImagePlus, Plus} from 'lucide-react'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {useFieldArray} from 'react-hook-form'
import Form from '@/components/custom/form'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import {updateMemoAction, uploadMemoImage} from '@/serverFunctions/memos'
import {updateMemoSchema} from '@/schemas/memoSchemas'
import type {FullMemo} from '@/models/memos'

interface EditMemoFormProps {
  memo: FullMemo
}

const EditMemoForm: FunctionComponent<EditMemoFormProps> = ({memo}) => {
  const [form, updateMemo] = useZodValidatedForm(updateMemoSchema, updateMemoAction, {
    defaultValues: {
      id: memo.id,
      title: memo.title,
      content: memo.content || null,
      imageUrls: memo.images.map(img => ({
        id: img.id,
        url: img.url,
        description: img.description ?? undefined,
      })),
    },
  })

  // === FieldArray voor images ===
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
      images.append({url}) // description kan later ingevuld worden
    }
  }
  return (
    <Form hookForm={form} action={updateMemo} id={memo.id}>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Memo titel & content */}
        <Card>
          <CardHeader>
            <CardTitle>Memo bewerken</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input {...form.register('title')} placeholder="Titel" />
            <Textarea {...form.register('content')} placeholder="Inhoud" rows={5} />
          </CardContent>
        </Card>

        {/* Images */}
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

        <SubmitButtonWithLoading loadingText="Memo opslaan..." text="Opslaan" />
      </div>
    </Form>
  )
}

export default EditMemoForm
