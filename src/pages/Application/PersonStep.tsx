import {
  BalDate,
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
  BalSelect,
  BalSelectOption,
} from '@baloise/ds-react'

import type { ApplicationStep } from '../../data/applications'

export interface PersonValues {
  firstName: string
  lastName: string
  birthDate: string
  street: string
  zip: string
  city: string
  email: string
  phone: string
  salutation: string
}

interface Props {
  values: PersonValues
  errors: Partial<Record<keyof PersonValues, string>>
  step: ApplicationStep
  onChange: (field: keyof PersonValues, value: string) => void
}

const salutations = [
  { value: 'frau', label: 'Frau' },
  { value: 'herr', label: 'Herr' },
  { value: 'neutral', label: 'Keine Anrede' },
]

export function PersonStep({ values, errors, step, onChange }: Props) {
  return (
    <BalFormGrid>
      <BalFormCol size="full">
        <BalHint closeLabel="Verstanden">
          <BalHintTitle>{step.hintTitle}</BalHintTitle>
          <BalHintText>{step.hintText}</BalHintText>
        </BalHint>
      </BalFormCol>

      <BalFormCol size="one-third">
        <BalField required>
          <BalFieldLabel required size="small">
            Anrede
          </BalFieldLabel>
          <BalFieldControl>
            <BalSelect
              name="salutation"
              value={values.salutation}
              autocomplete="honorific-prefix"
              filter="starts-with"
              onBalChange={event => onChange('salutation', String(event.detail ?? ''))}
            >
              {salutations.map(option => (
                <BalSelectOption key={option.value} value={option.value} label={option.label}>
                  {option.label}
                </BalSelectOption>
              ))}
            </BalSelect>
          </BalFieldControl>
        </BalField>
      </BalFormCol>

      <BalFormCol size="one-third">
        <BalField required invalid={!!errors.firstName}>
          <BalFieldLabel required size="small" invalid={!!errors.firstName}>
            Vorname
          </BalFieldLabel>
          <BalFieldControl>
            {/* autocomplete und autocorrect sind Durchreich-Props ohne visuelle Wirkung. */}
            <BalInput
              name="firstName"
              value={values.firstName}
              autocomplete="given-name"
              autoCorrect="off"
              invalid={!!errors.firstName}
              onBalInput={event => onChange('firstName', String(event.detail ?? ''))}
            />
          </BalFieldControl>
          {errors.firstName && <BalFieldMessage color="danger">{errors.firstName}</BalFieldMessage>}
        </BalField>
      </BalFormCol>

      <BalFormCol size="one-third">
        <BalField required invalid={!!errors.lastName}>
          <BalFieldLabel required size="small" invalid={!!errors.lastName}>
            Nachname
          </BalFieldLabel>
          <BalFieldControl>
            <BalInput
              name="lastName"
              value={values.lastName}
              autocomplete="family-name"
              invalid={!!errors.lastName}
              onBalInput={event => onChange('lastName', String(event.detail ?? ''))}
            />
          </BalFieldControl>
          {errors.lastName && <BalFieldMessage color="danger">{errors.lastName}</BalFieldMessage>}
        </BalField>
      </BalFormCol>

      <BalFormCol size="half">
        <BalField>
          <BalFieldLabel size="small">Geburtsdatum</BalFieldLabel>
          <BalFieldControl>
            <BalDate
              name="birthDate"
              value={values.birthDate}
              autocomplete="bday"
              max="2010-12-31"
              onBalChange={event => onChange('birthDate', String(event.detail ?? ''))}
            />
          </BalFieldControl>
        </BalField>
      </BalFormCol>

      <BalFormCol size="half">
        <BalField invalid={!!errors.email}>
          <BalFieldLabel size="small" invalid={!!errors.email}>
            E-Mail
          </BalFieldLabel>
          <BalFieldControl iconRight="message">
            <BalInput
              name="email"
              type="email"
              value={values.email}
              autocomplete="email"
              inputmode="email"
              invalid={!!errors.email}
              onBalInput={event => onChange('email', String(event.detail ?? ''))}
            />
          </BalFieldControl>
          {errors.email && <BalFieldMessage color="danger">{errors.email}</BalFieldMessage>}
        </BalField>
      </BalFormCol>

      <BalFormCol size="half">
        <BalField>
          <BalFieldLabel size="small">Strasse und Nummer</BalFieldLabel>
          <BalFieldControl>
            <BalInput
              name="street"
              value={values.street}
              autocomplete="street-address"
              onBalInput={event => onChange('street', String(event.detail ?? ''))}
            />
          </BalFieldControl>
        </BalField>
      </BalFormCol>

      <BalFormCol size="one-quarter">
        <BalField>
          <BalFieldLabel size="small">PLZ</BalFieldLabel>
          <BalFieldControl>
            <BalInput
              name="zip"
              value={values.zip}
              autocomplete="postal-code"
              inputmode="numeric"
              textAlign="right"
              onBalInput={event => onChange('zip', String(event.detail ?? ''))}
            />
          </BalFieldControl>
        </BalField>
      </BalFormCol>

      <BalFormCol size="one-quarter">
        <BalField>
          <BalFieldLabel size="small">Ort</BalFieldLabel>
          <BalFieldControl>
            <BalInput
              name="city"
              value={values.city}
              autocomplete="address-level2"
              onBalInput={event => onChange('city', String(event.detail ?? ''))}
            />
          </BalFieldControl>
        </BalField>
      </BalFormCol>

      <BalFormCol size="half">
        <BalField>
          <BalFieldLabel size="small">Telefon</BalFieldLabel>
          <BalFieldControl>
            <BalInput
              name="phone"
              type="tel"
              value={values.phone}
              autocomplete="tel"
              inputmode="tel"
              onBalInput={event => onChange('phone', String(event.detail ?? ''))}
            />
          </BalFieldControl>
        </BalField>
      </BalFormCol>
    </BalFormGrid>
  )
}
