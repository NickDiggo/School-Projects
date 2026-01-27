//src/app/(authenticated)/new/page.tsx

import type {FunctionComponent} from 'react'

import CreateMemoForm from '@/components/custom/createMemoForm'
import {getTagsByUser} from '@/dal/tags'
import {getMapsByUserId} from '@/dal/maps'
import {Navigation} from '@/components/navigation'
import Link from 'next/link'
import {ArrowLeft} from 'lucide-react'
import {getSessionProfileFromCookieOrThrow} from '@/lib/sessionUtils'

export const dynamic = 'force-dynamic'

const NewMemoPage: FunctionComponent = async () => {
  const profile = await getSessionProfileFromCookieOrThrow()
  const [tags, maps] = await Promise.all([getTagsByUser(profile.id), getMapsByUserId(profile.id)])

  return (
    <>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2 mt-2">Nieuwe Memo</h1>
          </div>
          <CreateMemoForm tags={tags} maps={maps} />
        </main>
      </div>
    </>
  )
}

export default NewMemoPage
