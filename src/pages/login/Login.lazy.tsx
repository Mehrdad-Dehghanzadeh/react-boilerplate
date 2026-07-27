import { type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'
import { LoginContent, LoginWizard } from './_components'
import './style.scss'

const LoginPage: FC = () => {
  return (
    <main className="login-page" id="login-page">
      <section className="login-right-section">
        <LoginWizard />
      </section>

      <section className="login-left-section">
        <div className="login-top-bubble"></div>
        <div className="login-bottom-bubble"></div>
        <svg data-dc-tpl="10" viewBox="0 0 600 600" id="login-svg">
          <path
            data-dc-tpl="11"
            d="M-20 380 C 160 300 300 460 640 320"
            fill="none"
            stroke="#fff"
            stroke-width="42"
            stroke-linecap="round"
          ></path>
        </svg>

        <LoginContent />
      </section>
    </main>
  )
}

export const Route = createLazyRoute(URLS.login.href)({
  component: LoginPage
})
