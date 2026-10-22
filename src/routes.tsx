import { createBrowserRouter } from 'react-router'

import { AppShell } from './app/AppShell'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { ApplicationPage } from './pages/Application/ApplicationPage'
import { ClaimPage } from './pages/Claim/ClaimPage'
import { ProfilePage } from './pages/Profile/ProfilePage'
import { ShowcasePage } from './showcase/ShowcasePage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppShell,
    children: [
      { index: true, Component: DashboardPage },
      { path: 'application', Component: ApplicationPage },
      { path: 'claim', Component: ClaimPage },
      { path: 'profile', Component: ProfilePage },
      { path: 'showcase', Component: ShowcasePage },
    ],
  },
])
