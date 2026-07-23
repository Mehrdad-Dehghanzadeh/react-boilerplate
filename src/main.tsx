import { type FC, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes'
import { Prompt, Snackbar, Alert } from '@Roots'
import '@styles/variables/index.scss'
import '@styles/mixins/index.scss'
import '@styles/keyframes/index.scss'
import '@styles/abstracts/index.scss'
import '@styles/base/index.scss'
import '@styles/shared/index.scss'
import '@styles/global.css'

export const Root: FC = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />

      <Snackbar />
      <Prompt />
      <Alert />
    </StrictMode>
  )
}

createRoot(document.getElementById('react-root')!).render(<Root />)
