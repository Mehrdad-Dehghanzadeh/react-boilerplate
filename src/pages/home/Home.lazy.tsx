import { Link } from '@tanstack/react-router'
import { URLS } from '@constants'
import { createLazyRoute } from '@tanstack/react-router'
import { Button } from '@UIKit'
import './style.scss'
import { showAlert } from '@/utils'

const HomePage = () => {
  const cb = () => {
    showAlert({ message: 'تست' })
  }
  return (
    <article id="home-page" className="home-page">
      <Link to={URLS.transfers.href}>transfers</Link>
      <Button variant='outlined' onClick={cb}>text</Button>
    </article>
  )
}

export const Route = createLazyRoute(URLS.home.href)({
  component: HomePage
})
