//src/app/register/page.tsx

import type {FunctionComponent} from 'react'
import LoginForm from '@/components/custom/login-form'

const RegisterPage: FunctionComponent = () => {
  return <LoginForm register={true} />
}

export default RegisterPage
