//src/components/custom/memo-card.tsx
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Calendar, ImageIcon, Tag} from 'lucide-react'
import Link from 'next/link'

import type {FullMemo} from '@/models/memos'

interface MemoCardProps {
  memo: FullMemo
}

export function MemoCard({memo}: MemoCardProps) {
  return (
    <Link href={`/memos/${memo.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-relaxed line-clamp-1">{memo.title}</CardTitle>
            {memo.map && (
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-800">
                {memo.map.name}
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{memo.content}</p>

          {memo.memoTags.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs">
              {memo.memoTags.map(mt => (
                <span key={mt.id} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {mt.tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(memo.createdAt).toLocaleDateString('nl-NL')}</span>
            </div>

            {memo.images.length > 0 && (
              <div className="flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                <span>{memo.images.length}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
