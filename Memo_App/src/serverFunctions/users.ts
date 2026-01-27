//src/serverFunctions/users.ts
'use server'

import {redirect} from 'next/navigation'
import {createUser, getUserByEmail, startSession, stopSession} from '@/dal/users'
import {getSalt, hashOptions, verifyPassword} from '@/lib/passwordUtils'
import {clearSessionCookie, getSessionId, setSessionCookie} from '@/lib/sessionUtils'
import {protectedServerFunction, publicFormAction} from '@/lib/serverFunctions'
import {registerSchema, signInSchema} from '@/schemas/userSchemas'

export const registerAction = publicFormAction({
  schema: registerSchema,
  serverFn: async ({data: {passwordConfirmation: _, ...data}, logger}) => {
    const user = await createUser(data)
    logger.info({msg: 'User created', userId: user.id})
    redirect('/login')
  },
  functionName: 'Register action',
})

export const signInAction = publicFormAction({
  schema: signInSchema,
  serverFn: async ({data, logger}) => {
    const user = await getUserByEmail(data.email)
    const timingSafePassword = `${hashOptions.iterations}$${hashOptions.keyLength}$preventTimingBasedAttacks123$${getSalt()}`

    const isValidPassword = verifyPassword(user?.password ?? timingSafePassword, data.password)
    if (!isValidPassword) {
      logger.warn({msg: 'Failed sign in attempt', email: data.email})
      return {
        success: false,
        errors: {errors: ['No account found with the given email/password combination.']},
      }
    }

    const session = await startSession(user!.id, user!.role)
    await setSessionCookie(session)
    logger.info({msg: 'User signed in', userId: user!.id, sessionId: session.id})

    redirect('/memos')
  },
  functionName: 'Sign in action',
})

export const signOutServerFunction = protectedServerFunction({
  serverFn: async ({logger}) => {
    const sessionId = await getSessionId()
    if (sessionId) {
      await stopSession(sessionId)
      await clearSessionCookie()
      logger.info({msg: 'Session stopped', sessionId})
    }

    redirect('/login')
  },
  functionName: 'Sign out action',
})
