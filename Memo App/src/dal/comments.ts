import {prismaClient} from './prismaClient'

export async function deleteCommentById(id: string, userId: string): Promise<void> {
  await prismaClient.comment.delete({where: {id, userId}})
}
export interface CommentType {
  id: string
  content: string
  createdAt: Date
  memoId: string
  userId: string
}
// export async function getCommentsByMemo(memoId: string): Promise<CommentType[]> {
//   return prismaClient.comment.findMany({
//     where: {memoId},
//     orderBy: {createdAt: 'desc'},
//   })
// }

export async function createComment({memoId, content, userId}: {memoId: string; content: string; userId: string}) {
  return prismaClient.comment.create({
    data: {memoId, content, userId},
  })
}
