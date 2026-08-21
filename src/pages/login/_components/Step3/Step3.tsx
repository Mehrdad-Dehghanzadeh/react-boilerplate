import { URLS } from '@constants'
import { useAppStore, useLoginStore } from '@/store'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, type FC } from 'react'

export const Step3: FC = () => {
  const { profile } = useAppStore()
  const { step } = useLoginStore()
  const navigate = useNavigate()

  const handleRedirect = () => {
    if (step == 2) {
      setTimeout(() => {
        navigate({ to: URLS.dashboard.href, replace: true })
      }, 1500)
    }
  }

  useEffect(() => {
    handleRedirect()
  }, [step])

  return (
    <div id="login-step-3" className="login-step">
      <div className="flex-center flex-col">
        <div className="login-checked">
          <div className="login-checked-circle">
            <svg
              data-dc-tpl="100"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path data-dc-tpl="101" d="M20 6L9 17l-5-5"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl mb-3 font-extrabold">ورود موفق</h2>
        <div className="text-t3 flex">
          <span>خوش آمدید،</span>
          <span className="mx-1">{profile?.account?.first_name || ''}</span>
          <span>{profile?.account?.last_name || ''}</span>
        </div>

        <div className="mt-6 flex items-center">
          <span className="spin-loading"></span>
          <span className="mr-2 text-t4">در حال انتقال به داشبورد...</span>
        </div>
      </div>
    </div>
  )
}
