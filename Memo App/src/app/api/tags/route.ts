//src/app/api/tags/route.ts
import {protectedApiRoute} from '@/lib/apiRoute'
import {getTagsByUser} from '@/dal/tags'
import {ok} from '@/lib/routeResponses'

export const GET = protectedApiRoute({
  routeFn: async ({profile}) => {
    const tags = await getTagsByUser(profile.id)
    return ok(tags)
  },
})
