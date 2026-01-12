// src/app/(authenticated)/memos/[id]/page.tsx
import type {FunctionComponent} from 'react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {ArrowLeft} from 'lucide-react'
import {getMemoById} from '@/dal/memos'
import {getSessionProfileFromCookieOrThrow} from '@/lib/sessionUtils'
import {Navigation} from '@/components/navigation'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Calendar, FolderOpen, MessageSquare} from 'lucide-react'
import {MemoActies} from '@/components/custom/memoActies'
import MemoModals from '@/app/(authenticated)/memos/[id]/memoForm'

// UUID validatie om errors in DAL te voorkomen
function isValidUUID(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

interface MemoDetailPageProps {
  params: Promise<{id: string}>
}

const MemoDetailPage: FunctionComponent<MemoDetailPageProps> = async ({params}) => {
  const [{id}, profile] = await Promise.all([params, getSessionProfileFromCookieOrThrow()])

  let memo = null
  if (isValidUUID(id)) {
    memo = await getMemoById(id) // findUnique returnt null als memo niet bestaat
  }

  const folder = memo?.map

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/memos"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar overzicht
          </Link>
        </div>

        {/* Fallback bij ongeldige ID of memo niet gevonden */}
        {!memo || memo.userId !== profile.id ? (
          <div className="border rounded-lg py-12 bg-card text-center text-muted-foreground">
            {isValidUUID(id) ? 'Memo niet gevonden' : 'Ongeldig memo ID'}
          </div>
        ) : (
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-2xl">{memo.title}</CardTitle>
                {folder && (
                  <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-200 text-gray-800">
                    <FolderOpen className="inline-block mr-1.5 h-4 w-4" />
                    {folder.name}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {memo.createdAt.toLocaleDateString('nl-NL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Inhoud</h3>
                <p className="whitespace-pre-wrap">{memo.content}</p>
              </div>

              <MemoModals {...memo} />
              <MemoActies memoId={memo.id} />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

export default MemoDetailPage
