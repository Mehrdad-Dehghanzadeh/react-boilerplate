import { type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'
import { LoginWizard } from './_components'
import LoginBG from '@assets/svg/login-bg.svg?react'
import './style.scss'

const LoginPage: FC = () => {
  return (
    <main className="login-page" id="login-page">
      <section className="login-right-section">
        <LoginBG className='login-bg'/>
      </section>

      <section className="login-left-section">
        <LoginWizard />
      </section>
    </main>
  )
}

export const Route = createLazyRoute(URLS.login.href)({
  component: LoginPage
})
