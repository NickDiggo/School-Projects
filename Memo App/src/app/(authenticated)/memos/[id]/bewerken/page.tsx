// src/app/(authenticated)/memos/[id]/edit/page.tsx
import type {FunctionComponent} from 'react'
import {getMemoById} from '@/dal/memos'
import EditMemoForm from '@/components/custom/editMemoForm'
import {getSessionProfileFromCookieOrThrow} from '@/lib/sessionUtils'
import {Navigation} from '@/components/navigation'
import Link from 'next/link'
import {ArrowLeft} from 'lucide-react'

interface EditMemoPageProps {
  params: Promise<{id: string}>
}

// eenvoudige UUID check
function isValidUUID(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

const EditMemoPage: FunctionComponent<EditMemoPageProps> = async ({params}) => {
  const [{id}, profile] = await Promise.all([params, getSessionProfileFromCookieOrThrow()])

  // if (!isValidUUID(id)) {
  //   return <p className="text-center text-muted-foreground">Ongeldige memo ID</p>
  // }

  let memo = null
  if (isValidUUID(id)) {
    memo = await getMemoById(id) // findUnique returnt null als memo niet bestaat
  }

  // if (!memo) {
  //   return <p className="text-center text-muted-foreground">Memo niet gevonden</p>
  // }

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
          <EditMemoForm memo={memo} />
        )}
      </main>
    </div>
  )
}

export default EditMemoPage
