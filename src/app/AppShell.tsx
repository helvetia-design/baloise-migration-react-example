import { Outlet, useLocation, useNavigate } from 'react-router'
import * as balIcons from '@baloise/ds-icons'
import {
  BalApp,
  BalButton,
  BalContent,
  BalFooter,
  BalLogo,
  BalNavbar,
  BalNavbarBrand,
  BalNavbarMenu,
  BalNavbarMenuEnd,
  BalNavbarMenuStart,
  BalStack,
  BalText,
  useBaloiseDesignSystem,
} from '@baloise/ds-react'

const navigation = [
  { to: '/', label: 'Übersicht' },
  { to: '/application', label: 'Antrag' },
  { to: '/claim', label: 'Schaden melden' },
  { to: '/profile', label: 'Profil' },
  { to: '/showcase', label: 'Showcase' },
]

export function AppShell() {
  useBaloiseDesignSystem({
    defaults: {
      region: 'CH',
      language: 'de',
      icons: balIcons,
    },
  })
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    // has-sticky-footer aus der Doku, Components/Layout/App: macht bal-app zur
    // vollen Viewport-Höhe und hält den Footer per margin-top:auto am unteren Rand,
    // statt dass er auf kurzen Seiten direkt unter dem Inhalt hängt.
    <BalApp className="has-sticky-footer">
      <header>
        <BalNavbar container="wide" interface="app">
          <BalNavbarBrand href="/" logoLabel="Zur Übersicht">
            <BalLogo brand="baloise" color="white" />
          </BalNavbarBrand>
          <BalNavbarMenu>
            <BalNavbarMenuStart>
              {navigation.map(entry => (
                <BalButton
                  key={entry.to}
                  color="link"
                  inverted
                  isActive={pathname === entry.to}
                  onBalClick={() => navigate(entry.to)}
                >
                  {entry.label}
                </BalButton>
              ))}
            </BalNavbarMenuStart>
            <BalNavbarMenuEnd>
              <BalText color="white" size="small" space="none">
                Andrea Brunner
              </BalText>
            </BalNavbarMenuEnd>
          </BalNavbarMenu>
        </BalNavbar>
      </header>

      <main>
        <BalContent>
          <Outlet />
        </BalContent>
      </main>

      <BalFooter hideLanguageSelection hideLinks>
        <div className="container py-small">
          <BalStack layout="horizontal" space="small" align="start">
            <BalText color="white" size="small" space="none">
              Fiktives Versicherungsportal für die Referenzdarstellung des Design Systems.
            </BalText>
            {/* target ist ein Durchreich-Prop ohne visuelle Wirkung — hier real verbaut. */}
            <BalButton
              color="link"
              inverted
              size="small"
              href="https://design.baloise.dev"
              target="_blank"
              rel="noreferrer"
            >
              Dokumentation
            </BalButton>
          </BalStack>
        </div>
      </BalFooter>
    </BalApp>
  )
}
