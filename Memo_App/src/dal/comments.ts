import {prismaClient} from './prismaClient'

export async function deleteCommentById(id: string, userId: string): Promise<void> {
  await prismaClient.comment.delete({where: {id, userId}})
}

export async function createComment({memoId, content, userId}: {memoId: string; content: string; userId: string}) {
  return prismaClient.comment.create({
    data: {memoId, content, userId},
  })
}
