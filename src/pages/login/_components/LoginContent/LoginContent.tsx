import { type FC } from 'react'
import './LoginContent.scss'

export const LoginContent: FC = () => {
  return (
    <div className="login-content">
      <div data-dc-tpl="13" className="login-content-logo">
        <div className="login-content-logo__lmg-wrapper">
          <img src="/imgs/logo.png" alt="Technopay" className="login-content-logo__img" />
        </div>
        <div>
          <div className="login-content-logo__title">تکنوپی</div>
          <div className="login-content-logo__sub-title">TECHNOPAY</div>
        </div>
      </div>

      <div className="login-content__container">
        <h1 className="login-content__title">پنل پذیرندگان تکنوپی</h1>
        <p className="login-content__sub-title">
          مدیریت تراکنش ها، تسویه ها و گزارش های مالی کسب وکار شما، یک جا و لحظه ای.
        </p>

        <div className="login-content__list">
          <span className="login-content__list-item">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </span>
          <span className="login-content__list-text">
            <span>گزارش های مالی لحظه ای و دقیق</span>
          </span>
        </div>

        <div className="login-content__list">
          <span className="login-content__list-item">
            <svg
              data-dc-tpl="25"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path data-dc-tpl="26" d="M20 6L9 17l-5-5"></path>
            </svg>
          </span>
          <span className="login-content__list-text">
            <span>تسویه ی سریع و شفاف تراکنش ها</span>
          </span>
        </div>

        <div className="login-content__list">
          <span className="login-content__list-item">
            <svg
              data-dc-tpl="25"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path data-dc-tpl="26" d="M20 6L9 17l-5-5"></path>
            </svg>
          </span>
          <span className="login-content__list-text">
            <span>دسترسی سریع به داشبورد و گزارش ها</span>
          </span>
        </div>
      </div>

      <footer className="login-content__footer">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,.8)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span className="login-content__footer-text">اتصال امن و رمزنگاری شده</span>
      </footer>
    </div>
  )
}
