import {
  BalBadge,
  BalButton,
  BalCard,
  BalCardActions,
  BalCardContent,
  BalCardSubtitle,
  BalCardTitle,
  BalDivider,
  BalIcon,
  BalProgressBar,
  BalStack,
  BalTag,
  BalTagGroup,
  BalText,
} from '@baloise/ds-react'

import { formatChf, policies, policyStatusLabels, type Policy } from '../../data/policies'

const statusColor = (status: Policy['status']) =>
  status === 'aktiv' ? 'success' : status === 'ruhend' ? 'warning' : 'danger'

const premiumShare = (policy: Policy) => Math.round((policy.paidChf / policy.premiumChf) * 100)

/*
  Aufbau aus der Doku, Components/Containment/Card: bal-card-title, -subtitle,
  -content und -actions sind Geschwister in bal-card, nicht Kinder von -content.
  Das Badge mit position="card" ist ebenfalls direktes Kind der Karte — position
  positioniert absolut und braucht die Karte als Bezug.
*/
export function PolicyCards() {
  return (
    <>
      {policies.map(policy => {
        const share = premiumShare(policy)
        return (
          <BalCard
            key={policy.id}
            color={policy.status === 'ruhend' ? 'grey-light' : 'white'}
            className="mb-normal"
          >
            <BalBadge color={statusColor(policy.status)} position="card">
              {policyStatusLabels[policy.status]}
            </BalBadge>

            <BalCardTitle>
              <BalStack space="x-small">
                <BalIcon name={policy.icon} size={policy.status === 'aktiv' ? 'large' : 'medium'} />
                {policy.label}
              </BalStack>
            </BalCardTitle>
            <BalCardSubtitle>
              {policy.productLabel} · {policy.id}
            </BalCardSubtitle>

            <BalCardContent>
              <BalDivider space="small" color="grey-light" />

              <BalTagGroup>
                <BalTag color={policy.status === 'aktiv' ? 'success' : 'grey'} size="small">
                  {policy.productLabel}
                </BalTag>
                <BalTag color="info" size="small">
                  Deckung {formatChf(policy.coverageChf)}
                </BalTag>
                {share < 100 && (
                  <BalTag color="warning" size="small">
                    Rate offen
                  </BalTag>
                )}
              </BalTagGroup>

              <BalText size="small" space="top">
                Prämie {formatChf(policy.premiumChf)} pro Jahr · bezahlt {share} Prozent
              </BalText>
              <BalProgressBar
                className="mt-x-small"
                value={share}
                color={share === 100 ? 'green' : share >= 50 ? 'yellow' : 'red'}
                background="grey"
              />
            </BalCardContent>

            <BalCardActions position="right">
              <BalButton color="secondary" size="small">
                Schaden melden
              </BalButton>
              <BalButton color="primary" size="small">
                Police öffnen
              </BalButton>
            </BalCardActions>
          </BalCard>
        )
      })}
    </>
  )
}
