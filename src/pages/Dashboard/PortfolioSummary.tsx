import { useRef, useState, type ComponentRef } from 'react'
import {
  BalButton,
  BalCard,
  BalCardContent,
  BalCardTitle,
  BalData,
  BalDataItem,
  BalDataLabel,
  BalDataValue,
  BalPopover,
  BalPopoverContent,
  BalSpinner,
  BalStack,
  BalText,
  BalTooltip,
} from '@baloise/ds-react'

import { formatChf, policies } from '../../data/policies'
import { claims } from '../../data/claims'

const totalPremium = policies.reduce((sum, policy) => sum + policy.premiumChf, 0)
const totalOutstanding = policies.reduce((sum, p) => sum + (p.premiumChf - p.paidChf), 0)
const openClaims = claims.filter(claim => claim.status !== 'erledigt' && claim.status !== 'abgelehnt')

export function PortfolioSummary() {
  const popoverRef = useRef<ComponentRef<typeof BalPopover>>(null)
  const [detailsShown, setDetailsShown] = useState(false)

  /** Imperativer Aufruf auf bal-popover. */
  const togglePopover = async () => {
    await popoverRef.current?.toggle()
    setDetailsShown(shown => !shown)
  }

  return (
    <BalCard color="grey-light">
      <BalCardTitle>Portfolio</BalCardTitle>
      <BalCardContent>

        <BalData horizontal border>
          <BalDataItem>
            <BalDataLabel>Policen</BalDataLabel>
            <BalDataValue>{policies.length}</BalDataValue>
          </BalDataItem>
          <BalDataItem>
            <BalDataLabel>Jahresprämie</BalDataLabel>
            <BalDataValue>{formatChf(totalPremium)}</BalDataValue>
          </BalDataItem>
          <BalDataItem border={totalOutstanding > 0}>
            <BalDataLabel>Offen</BalDataLabel>
            <BalDataValue>{formatChf(totalOutstanding)}</BalDataValue>
          </BalDataItem>
          <BalDataItem disabled={openClaims.length === 0}>
            <BalDataLabel>Offene Schäden</BalDataLabel>
            <BalDataValue>{openClaims.length}</BalDataValue>
          </BalDataItem>
        </BalData>

        <BalPopover ref={popoverRef} position="bottom-start" arrow>
          <div bal-popover-trigger="">
            <BalButton color="tertiary" size="small" onBalClick={togglePopover}>
              {detailsShown ? 'Aufschlüsselung schliessen' : 'Aufschlüsselung zeigen'}
            </BalButton>
          </div>
          <BalPopoverContent color="white" contentWidth={320}>
            <BalText size="small" space="none">
              Die Jahresprämie verteilt sich auf {policies.length} Policen. Der offene Betrag
              stammt aus halbjährlichen Raten.
            </BalText>
          </BalPopoverContent>
        </BalPopover>

        <BalStack layout="horizontal" align="start" space="x-small" className="mt-small">
          <BalText size="small" space="none" id="sync-hint">
            Synchronisiert mit dem Bestandssystem
          </BalText>
          <BalSpinner color="blue" variation="circle" small />
        </BalStack>
        <BalTooltip reference="#sync-hint" placement="right">
          Der Bestand wird nachts abgeglichen.
        </BalTooltip>
      </BalCardContent>
    </BalCard>
  )
}
