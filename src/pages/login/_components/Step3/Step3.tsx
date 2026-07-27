import type { FC } from 'react'

export const Step3: FC = () => {
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
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path data-dc-tpl="101" d="M20 6L9 17l-5-5"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl mb-3 font-extrabold">ورود موفق</h2>
        <p className="text-t3">خوش آمدید، مهدی فرحزادی شاپ.</p>

        <div className='mt-6 flex items-center'>
          <span className="spin-loading"></span>
          <span className='mr-2 text-t4'>در حال انتقال به داشبورد...</span>
        </div>
      </div>
    </div>
  )
}
