// src/app/api/auth/register/route.ts
import {publicApiRoute} from '@/lib/apiRoute'
import {registerSchema} from '@/schemas/userSchemas'
import {createUser, getUserByEmail} from '@/dal/users'
import {badRequest, ok} from '@/lib/routeResponses'
import {createJwtToken} from '@/lib/jwtUtils'

export const POST = publicApiRoute({
  schema: registerSchema,
  routeFn: async ({data}) => {
    const existingUser = await getUserByEmail(data.email)
    console.log('POST /api/auth/register reached')
    if (existingUser) {
      return badRequest({email: ['Email already in use.']})
    }

    const user = await createUser({
      email: data.email,
      password: data.password,
      username: data.username,
      role: 'User',
    })

    const token = createJwtToken(user)
    return ok({token})
  },
})
