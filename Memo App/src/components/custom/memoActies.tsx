// src/components/memoActies.tsx
'use client'

import {Button} from '@/components/ui/button'
import {Edit, Trash2} from 'lucide-react'
import Link from 'next/link'
import ActionButton from '@/components/custom/actionButton'
import {deleteMemoServerFunction} from '@/serverFunctions/memos'

interface MemoActiesProps {
  memoId: string
}

export function MemoActies({memoId}: MemoActiesProps) {
  return (
    <div className="flex gap-3 pt-6 border-t border-border">
      <Link href={`/memos/${memoId}/bewerken`} className="flex-1">
        <Button className="w-full flex items-center justify-center">
          <Edit className="mr-2 h-4 w-4" />
          Bewerken
        </Button>
      </Link>

      <ActionButton
        className="flex-1"
        variant="destructive"
        action={() => deleteMemoServerFunction({id: memoId})}
        pendingContent="Deleting memo ...">
        <Trash2 className="mr-2 h-4 w-4" />
        Verwijderen
      </ActionButton>
    </div>
  )
}
