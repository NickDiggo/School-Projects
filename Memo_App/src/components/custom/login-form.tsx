'use client'

import type {FunctionComponent} from 'react'
import Link from 'next/link'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import Form from '@/components/custom/form'
import FormInput from '@/components/custom/formInput'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {registerAction, signInAction} from '@/serverFunctions/users'
import {registerSchema, signInSchema} from '@/schemas/userSchemas'

interface LoginFormProps {
  register: boolean
}

const LoginForm: FunctionComponent<LoginFormProps> = ({register}) => {
  const isLogin = !register

  const [form, signInOrRegister] = useZodValidatedForm(
    register ? registerSchema : signInSchema,
    register ? registerAction : signInAction,
  )

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-2xl">M</span>
          </div>
          <h1 className="text-3xl font-bold text-balance mb-2">Welkom bij Memo App</h1>
          <p className="text-muted-foreground leading-relaxed">
            {isLogin ? "Log in om je memo's te bekijken" : 'Maak een account aan om te beginnen'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? 'Inloggen' : 'Registreren'}</CardTitle>
            <CardDescription>{isLogin ? 'Voer je inloggegevens in' : 'Maak een nieuw account aan'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form hookForm={form} action={signInOrRegister}>
              <FormInput name="email" label="Email address" />
              {!isLogin && <FormInput name="username" label="Username" />}
              <FormInput name="password" label="Password" type="password" />
              {!isLogin && <FormInput name="passwordConfirmation" label="Confirm your password" type="password" />}

              <SubmitButtonWithLoading
                loadingText={register ? 'Creating your account...' : 'Logging in ...'}
                text={register ? 'Sign up' : 'Log in'}
              />
            </Form>

            <div className="mt-4 text-center">
              {isLogin ? (
                <Link
                  href="/register"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Nog geen account? Registreer hier
                </Link>
              ) : (
                <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Al een account? Log hier in
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginForm
