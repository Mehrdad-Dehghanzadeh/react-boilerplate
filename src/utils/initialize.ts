import { init, breadcrumbsIntegration } from '@sentry/react'

export const initSentry = () => {
  try {
    init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      tracesSampleRate: 0.1,
      integrations: [breadcrumbsIntegration()]
    })
    console.log('sentry initiation')
  } catch (e) {
    console.error('error sentry initiation')
  }
}
