// src/app/(authenticated)/memos/[id]/edit/page.tsx
import type {FunctionComponent} from 'react'
import {getMemoById} from '@/dal/memos'
import EditMemoForm from '@/components/custom/editMemoForm'

interface EditMemoPageProps {
  params: Promise<{id: string}>
}

// eenvoudige UUID check
function isValidUUID(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

const EditMemoPage: FunctionComponent<EditMemoPageProps> = async ({params}) => {
  const {id} = await params

  if (!isValidUUID(id)) {
    return <p className="text-center text-muted-foreground">Ongeldige memo ID</p>
  }

  const memo = await getMemoById(id)

  if (!memo) {
    return <p className="text-center text-muted-foreground">Memo niet gevonden</p>
  }

  return <EditMemoForm memo={memo} />
}

export default EditMemoPage
