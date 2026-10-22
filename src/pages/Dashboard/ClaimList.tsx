import {
  BalBadge,
  BalCard,
  BalCardContent,
  BalCardTitle,
  BalIcon,
  BalList,
  BalListItem,
  BalListItemContent,
  BalListItemIcon,
  BalListItemSubtitle,
  BalListItemTitle,
} from '@baloise/ds-react'

import { claimStatusLabels, claims, type ClaimStatus } from '../../data/claims'
import { findPolicy, formatChf } from '../../data/policies'

const badgeColor = (status: ClaimStatus) => {
  switch (status) {
    case 'offen':
      return 'warning'
    case 'bearbeitung':
      return 'yellow'
    case 'erledigt':
      return 'green'
    default:
      return 'danger'
  }
}

const badgeIcon = (status: ClaimStatus) => (status === 'erledigt' ? 'check' : '')

export function ClaimList() {
  return (
    <BalCard>
      <BalCardTitle>Schadenfälle</BalCardTitle>
      <BalCardContent>
        {/*
          Muster aus der Doku, Components/Data Display/Badge → «List Badges»:
          Badge im linken Icon-Slot mit size="large" und ohne position, rechts der
          Navigationspfeil. position würde das Badge absolut aus der Karte heben.
        */}
        <BalList background="light" size="large">
          {claims.map((claim, index) => {
            const policy = findPolicy(claim.policyId)
            return (
              <BalListItem key={claim.id} clickable selected={claim.status === 'bearbeitung'}>
                <BalListItemIcon>
                  <BalBadge
                    color={badgeColor(claim.status)}
                    size="large"
                    icon={badgeIcon(claim.status)}
                  >
                    {index + 1}
                  </BalBadge>
                </BalListItemIcon>
                <BalListItemContent>
                  <BalListItemTitle>
                    {claim.title} · {claimStatusLabels[claim.status]}
                  </BalListItemTitle>
                  <BalListItemSubtitle>
                    {claim.id} · {policy ? policy.label : 'ohne Police'} · gemeldet{' '}
                    {claim.reportedDate}
                    {claim.amountChf > 0 ? ` · ${formatChf(claim.amountChf)}` : ''}
                  </BalListItemSubtitle>
                </BalListItemContent>
                <BalListItemIcon right>
                  <BalIcon name="nav-go-right" size="x-small" />
                </BalListItemIcon>
              </BalListItem>
            )
          })}
        </BalList>
      </BalCardContent>
    </BalCard>
  )
}
