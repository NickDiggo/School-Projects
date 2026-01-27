// app/models/types.ts

export type Tag = {
  id: string
  name: string
}

export type Map = {
  id: string
  name: string
  userId?: string
}

export type Image = {
  id: string
  url: string
  description?: string | null
  memoId?: string
}

export type Comment = {
  id: string
  content: string
  createdAt: Date
  memoId: string
}

export type Memo = {
  id: string
  title: string
  content?: string | null
  createdAt: Date
  userId: string
  mapId: string
  map?: Map
  tags?: Tag[]
  images?: Image[]
  comments?: Comment[]
}

export type User = {
  id: string
  email: string
  username: string
  role: string
}
