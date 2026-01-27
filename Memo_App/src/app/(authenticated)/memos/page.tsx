//src/app/(authenticated)/memos/page.tsx

import {Navigation} from '@/components/navigation'
import {MemoCard} from '@/components/custom/memo-card'
import {FolderOpen} from 'lucide-react'
import {getMemosByUser} from '@/dal/memos'
import {getSessionProfileFromCookieOrThrow} from '@/lib/sessionUtils'
import {getMapsByUserId} from '@/dal/maps'

export default async function MemosPage() {
  const profile = await getSessionProfileFromCookieOrThrow()

  const userId = profile.id

  const memos = await getMemosByUser(userId)
  const folders = await getMapsByUserId(profile.id)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Mijn Memos</h1>
          <p className="text-muted-foreground leading-relaxed">Organiseer je notities en ideeën in mappen</p>
        </div>

        <div className="space-y-12">
          {folders.map(folder => {
            const folderMemos = memos.filter(memo => memo.map?.id === folder.id)

            if (folderMemos.length === 0) return null

            return (
              <section key={folder.id}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-200 text-blue-800">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{folder.name}</h2>
                    <p className="text-sm text-muted-foreground">{folderMemos.length} memo's</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {folderMemos.map(memo => (
                    <MemoCard key={memo.id} memo={memo} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}
