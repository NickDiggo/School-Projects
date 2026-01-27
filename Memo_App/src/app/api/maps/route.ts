import {protectedApiRoute} from '@/lib/apiRoute'
import {getMapsByUserId} from '@/dal/maps'
import {ok} from '@/lib/routeResponses'

export const GET = protectedApiRoute({
  async routeFn({profile}) {
    const maps = await getMapsByUserId(profile.id)
    return ok(maps)
  },
})
