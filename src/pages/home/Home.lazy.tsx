import { Link } from '@tanstack/react-router'
import { URLS } from '@constants'
import { createLazyRoute } from '@tanstack/react-router'
import './style.scss'

const HomePage = () => {
  return (
    <article id="home-page" className="home-page">
      <Link to={URLS.transfers.href}>transfers</Link>
    </article>
  )
}

export const Route = createLazyRoute(URLS.home.href)({
  component: HomePage
})
