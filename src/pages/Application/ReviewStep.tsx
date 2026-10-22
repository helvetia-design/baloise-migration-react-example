import {
  BalCheckbox,
  BalData,
  BalDataItem,
  BalDataLabel,
  BalDataValue,
  BalFieldMessage,
  BalHeading,
  BalHint,
  BalHintText,
  BalHintTitle,
  BalNotification,
} from '@baloise/ds-react'

import type { ApplicationStep } from '../../data/applications'
import { formatChf } from '../../data/policies'
import type { CoverageValues } from './CoverageStep'
import type { PaymentValues } from './PaymentStep'
import type { PersonValues } from './PersonStep'

interface Props {
  person: PersonValues
  coverage: CoverageValues
  payment: PaymentValues
  step: ApplicationStep
  accepted: boolean
  showAcceptError: boolean
  onAccept: (accepted: boolean) => void
}

export function ReviewStep({
  person,
  coverage,
  payment,
  step,
  accepted,
  showAcceptError,
  onAccept,
}: Props) {
  const summary = [
    { label: 'Antragsteller', value: `${person.firstName} ${person.lastName}` },
    { label: 'Adresse', value: `${person.street}, ${person.zip} ${person.city}` },
    { label: 'Versicherungssumme', value: formatChf(coverage.sumInsured) },
    { label: 'Selbstbehalt', value: `CHF ${coverage.deductible}` },
    {
      label: 'Zusatzdeckungen',
      value: coverage.extras.length > 0 ? coverage.extras.join(', ') : 'keine',
    },
    { label: 'Zahlungsweise', value: payment.interval },
  ]

  return (
    <>
      <BalHint small>
        <BalHintTitle>{step.hintTitle}</BalHintTitle>
        <BalHintText>{step.hintText}</BalHintText>
      </BalHint>

      <BalHeading level="h4" space="all">
        Zusammenfassung
      </BalHeading>

      <BalData border>
        {summary.map(entry => (
          <BalDataItem key={entry.label} border={entry.label === 'Versicherungssumme'}>
            <BalDataLabel>{entry.label}</BalDataLabel>
            <BalDataValue>{entry.value}</BalDataValue>
          </BalDataItem>
        ))}
      </BalData>

      {coverage.extras.length === 0 && (
        <BalNotification color="info" className="mt-medium">
          Ohne Zusatzdeckungen sind Velo und Reisegepäck nicht versichert.
        </BalNotification>
      )}

      <section className="mt-medium">
        <BalCheckbox
          name="accept"
          checked={accepted}
          invalid={showAcceptError}
          color={accepted ? 'green' : 'red'}
          onBalChange={event => onAccept(Boolean(event.detail))}
        >
          Ich bestätige die Richtigkeit der Angaben.
        </BalCheckbox>
        {showAcceptError && (
          <BalFieldMessage color="danger">
            Ohne Bestätigung kann der Antrag nicht eingereicht werden.
          </BalFieldMessage>
        )}
      </section>
    </>
  )
}
