import { type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'

const AccessUsersPage: FC = () => {
  return <article id="access-users-page" className="full-page-relative"></article>
}

export const Route = createLazyRoute(URLS.accessUsers.href)({
  component: AccessUsersPage
})
