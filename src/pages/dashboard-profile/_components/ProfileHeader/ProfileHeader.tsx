import { type FC } from 'react'
import './ProfileHeader.scss'

export const ProfileHeader: FC = () => {
  return (
    <section className="profile-header">
      <div className="profile-header__tumbrel">م</div>
      <div className="profile-header__wrapper">
        <div className="profile-header__user">
          <h1 className="profile-header__user-name">مهدی فرحزادی شاپ</h1>
          <span className="profile-header__user-status">
            <span className="profile-header__user-text"></span>
            فعال
          </span>
        </div>

        <div className="profile-header__merchant">
          <span className="profile-header__info">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AEAEA8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 7h-9M14 17H5M17 3l3 3-3 3M7 21l-3-3 3-3"></path>
            </svg>
            پوشاک و لوازم دیجیتال
          </span>
          <span className="profile-header__info">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AEAEA8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21h18M6 21V7l6-4 6 4v14"></path>
            </svg>
            حقوقی
          </span>
          <span className="profile-header__info">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AEAEA8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"></path>
            </svg>
            حضوری و آنلاین
          </span>
        </div>
      </div>
    </section>
  )
}
