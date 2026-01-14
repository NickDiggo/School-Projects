// src/app/(authenticated)/memos/[id]/memoForm.tsx
'use client'

import type {FunctionComponent} from 'react'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {MessageSquare, ImageIcon, ChevronLeft, ChevronRight, Plus} from 'lucide-react'
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {addCommentAction, deleteCommentAction} from '@/serverFunctions/comments'

import type {FullMemo} from '@/models/memos'
import ActionButton from '@/components/custom/actionButton'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import Form from '@/components/custom/form'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {addCommentSchema} from '@/schemas/commentSchemas'
import FormInput from '@/components/custom/formInput'

const MemoModals: FunctionComponent<FullMemo & {id: string}> = ({comments, images, id}) => {
  const [selectedCommentIndex, setSelectedCommentIndex] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [addCommentOpen, setAddCommentOpen] = useState(false)

  const [form, createComment] = useZodValidatedForm(addCommentSchema, addCommentAction)

  const handlePreviousComment = () => {
    if (selectedCommentIndex !== null && selectedCommentIndex > 0) {
      setSelectedCommentIndex(selectedCommentIndex - 1)
    }
  }

  const handleNextComment = () => {
    if (selectedCommentIndex !== null && selectedCommentIndex < comments.length - 1) {
      setSelectedCommentIndex(selectedCommentIndex + 1)
    }
  }

  const handlePreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => setAddCommentOpen(true)} className="mb-3">
        <Plus /> Voeg een opmerking toe
      </Button>

      {/* Comments list */}
      {comments.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase text-muted-foreground">
            Extra Opmerkingen ({comments.length})
          </h3>
          {comments.map((comment, index) => (
            <button
              key={comment.id}
              onClick={() => setSelectedCommentIndex(index)}
              className="w-full text-left p-4 rounded-lg border bg-muted/50 hover:bg-muted transition-colors flex gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm line-clamp-2">{comment.content}</p>
                <p className="text-xs text-muted-foreground">{comment.createdAt.toLocaleDateString('nl-NL')}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Comment modal */}
      <Dialog open={selectedCommentIndex !== null} onOpenChange={() => setSelectedCommentIndex(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Extra Opmerking</DialogTitle>
          </DialogHeader>

          {comments.length > 0 && selectedCommentIndex !== null ? (
            <div className="space-y-4">
              <p className="prose prose-sm max-w-none whitespace-pre-wrap">{comments[selectedCommentIndex].content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {comments[selectedCommentIndex].createdAt.toLocaleDateString('nl-NL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousComment}
                      disabled={selectedCommentIndex === 0}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {selectedCommentIndex + 1} / {comments.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextComment}
                      disabled={selectedCommentIndex === comments.length - 1}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <ActionButton
                    className="my-4"
                    variant="destructive"
                    action={async () => {
                      await deleteCommentAction({
                        commentId: comments[selectedCommentIndex].id,
                        memoId: id,
                      })
                      setSelectedCommentIndex(null)
                    }}
                    pendingContent="Deleting comment...">
                    Delete
                  </ActionButton>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-4">Er zijn nog geen extra opmerkingen</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Add comment modal */}
      <Dialog open={addCommentOpen} onOpenChange={() => setAddCommentOpen(false)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Nieuwe Opmerking</DialogTitle>
          </DialogHeader>

          <Form
            hookForm={form}
            action={data => {
              createComment(data)
              setAddCommentOpen(false)
            }}>
            <FormInput label="Opmerking" name="content" placeholder="Typ je opmerking hier..." rows={4} />
            <input type="hidden" {...form.register('memoId')} value={id} />
            <SubmitButtonWithLoading loadingText="Opmerking toevoegen..." text="Toevoegen" />
          </Form>
        </DialogContent>
      </Dialog>

      {/* Images grid and modal */}
      {images.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Afbeeldingen ({images.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setSelectedImageIndex(index)}
                className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted hover:opacity-80 transition-opacity">
                <img
                  src={img.url}
                  alt={img.description ?? `Foto ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
                  <ImageIcon className="h-6 w-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Foto's</DialogTitle>
          </DialogHeader>
          {selectedImageIndex !== null && images.length > 0 && (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                <img
                  src={images[selectedImageIndex].url}
                  alt={images[selectedImageIndex].description ?? `Foto ${selectedImageIndex + 1}`}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePreviousImage} disabled={selectedImageIndex === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedImageIndex + 1} / {images.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextImage}
                  disabled={selectedImageIndex === images.length - 1}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MemoModals
