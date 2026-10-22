import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'

import '@baloise/ds-styles/css/normalize.css'
import '@baloise/ds-styles/css/font.css'
import '@baloise/ds-styles/css/structure.css'
import '@baloise/ds-styles/css/core.css'
import '@baloise/ds-styles/css/utilities/all.css'

/**
 * balToastController und balSnackbarController erzeugen ihren Container per
 * document.createElement('bal-notices'). Die React-Wrapper registrieren ein Custom
 * Element erst beim ersten Rendern — bal-notices wird nie gerendert und muss daher
 * hier von Hand registriert werden, sonst wartet der Controller endlos auf das Upgrade.
 */
import { defineCustomElement as defineBalNotices } from '@baloise/ds-core/components/bal-notices.js'

import { router } from './routes'

defineBalNotices()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
