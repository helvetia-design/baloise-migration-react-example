import {
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
  BalFormCol,
  BalFormGrid,
  BalHint,
  BalHintText,
  BalHintTitle,
  BalInput,
  BalLabel,
  BalRadio,
  BalRadioGroup,
  BalText,
} from '@baloise/ds-react'

import { paymentIntervals, type ApplicationStep } from '../../data/applications'

export interface PaymentValues {
  interval: string
  offerNumber: string
  accountHolder: string
}

interface Props {
  values: PaymentValues
  errors: Partial<Record<keyof PaymentValues, string>>
  step: ApplicationStep
  onChange: (field: keyof PaymentValues, value: string) => void
}

export function PaymentStep({ values, errors, step, onChange }: Props) {
  const surcharge = values.interval === 'jaehrlich' ? 0 : 3

  return (
    <BalFormGrid>
      <BalFormCol size="full">
        <BalHint>
          <BalHintTitle>{step.hintTitle}</BalHintTitle>
          <BalHintText>{step.hintText}</BalHintText>
        </BalHint>
      </BalFormCol>

      <BalFormCol size="full">
        <BalLabel size="small" weight="bold">
          Zahlungsweise
        </BalLabel>
        <BalRadioGroup
          name="interval"
          value={values.interval}
          interface="tile"
          columns={3}
          onBalChange={event => onChange('interval', String(event.detail ?? ''))}
        >
          {paymentIntervals.map(option => (
            <BalRadio
              key={option.value}
              value={option.value}
              color={option.value === values.interval ? 'green' : 'yellow'}
            >
              {option.label}
            </BalRadio>
          ))}
        </BalRadioGroup>
        <BalText size="small" color={surcharge > 0 ? 'warning' : 'success'} space="top">
          {surcharge > 0
            ? `Ratenzuschlag von ${surcharge} Prozent`
            : 'Kein Ratenzuschlag bei jährlicher Zahlung'}
        </BalText>
      </BalFormCol>

      <BalFormCol size="half">
        <BalField>
          <BalFieldLabel size="small">Offertnummer</BalFieldLabel>
          <BalFieldControl>
            <BalInput
              name="offerNumber"
              value={values.offerNumber}
              mask="offer-number"
              textAlign="center"
              onBalInput={event => onChange('offerNumber', String(event.detail ?? ''))}
            />
          </BalFieldControl>
        </BalField>
      </BalFormCol>

      <BalFormCol size="half">
        <BalField required invalid={!!errors.accountHolder}>
          <BalFieldLabel required size="small" invalid={!!errors.accountHolder}>
            Kontoinhaber
          </BalFieldLabel>
          <BalFieldControl>
            <BalInput
              name="accountHolder"
              value={values.accountHolder}
              autocomplete="name"
              invalid={!!errors.accountHolder}
              onBalInput={event => onChange('accountHolder', String(event.detail ?? ''))}
            />
          </BalFieldControl>
          {errors.accountHolder && (
            <BalFieldMessage color="danger">{errors.accountHolder}</BalFieldMessage>
          )}
        </BalField>
      </BalFormCol>
    </BalFormGrid>
  )
}
