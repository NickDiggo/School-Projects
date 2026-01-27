//src/app/login/page.tsx

import type {FunctionComponent} from 'react'
import LoginForm from '@/components/custom/login-form'

const LoginPage: FunctionComponent = () => {
  return <LoginForm register={false} />
}

export default LoginPage
