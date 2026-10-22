import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { BalClose, BalHeading, BalNotification, BalStack, BalText } from '@baloise/ds-react'

import { ClaimList } from './ClaimList'
import { PolicyCards } from './PolicyCards'
import { PortfolioSummary } from './PortfolioSummary'
import { PreventionHighlights } from './PreventionHighlights'
import { ProductTiles } from './ProductTiles'
import { claims } from '../../data/claims'
import { person } from '../../data/profile'

const openClaims = claims.filter(claim => claim.status === 'offen')

export function DashboardPage() {
  const [searchParams] = useSearchParams()
  const [noticeDismissed, setNoticeDismissed] = useState(false)
  const showNotice = !noticeDismissed && openClaims.length > 0 && searchParams.get('notice') !== 'off'

  return (
    <div className="container is-detail-page py-large">
      <header className="mb-large">
        <BalHeading level="h1" space="none">
          Guten Tag, {person.firstName}
        </BalHeading>
        <BalText color="grey" space="none">
          Kundennummer {person.customerNumber} · Beratung {person.advisor}
        </BalText>
      </header>

      {showNotice && (
        <div className="mb-large">
          <BalNotification color={openClaims.length > 1 ? 'danger' : 'warning'}>
            <BalStack layout="horizontal" space="small" align="start">
              <BalText space="none">
                {openClaims.length === 1
                  ? 'Ein Schadenfall wartet auf Ihre Unterlagen.'
                  : `${openClaims.length} Schadenfälle warten auf Ihre Unterlagen.`}
              </BalText>
              <BalClose size="small" onClick={() => setNoticeDismissed(true)} />
            </BalStack>
          </BalNotification>
        </div>
      )}

      <section className="mb-large">
        <PortfolioSummary />
      </section>

      <section className="mb-large">
        <BalHeading level="h2" space="bottom">
          Ihre Policen
        </BalHeading>
        <PolicyCards />
      </section>

      <section className="mb-large">
        <ClaimList />
      </section>

      <section className="mb-large">
        <BalHeading level="h2" space="bottom">
          Weitere Produkte
        </BalHeading>
        <ProductTiles />
      </section>

      <section>
        <PreventionHighlights />
      </section>
    </div>
  )
}
