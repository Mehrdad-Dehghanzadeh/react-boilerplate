import { type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'
import { ProfileHeader, ProfileTabs } from './_components'

const ProfilePage: FC = () => {
  return (
    <article id="profile-page" className="full-page-relative">
      <ProfileHeader />
      <ProfileTabs />
    </article>
  )
}

export const Route = createLazyRoute(URLS.profile.href)({
  component: ProfilePage
})
