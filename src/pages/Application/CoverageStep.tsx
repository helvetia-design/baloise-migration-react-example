import {
  BalCheckbox,
  BalCheckboxGroup,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
  BalFormCol,
  BalFormGrid,
  BalHint,
  BalHintText,
  BalHintTitle,
  BalInputSlider,
  BalInputStepper,
  BalLabel,
  BalNumberInput,
  BalRadio,
  BalRadioGroup,
  BalText,
} from '@baloise/ds-react'

import { additionalCovers, deductibleOptions, type ApplicationStep } from '../../data/applications'
import { formatChf } from '../../data/policies'

export interface CoverageValues {
  sumInsured: number
  rooms: number
  deductible: string
  extras: string[]
}

interface Props {
  values: CoverageValues
  step: ApplicationStep
  onChange: <K extends keyof CoverageValues>(field: K, value: CoverageValues[K]) => void
}

const RECOMMENDED_PER_ROOM = 20_000

export function CoverageStep({ values, step, onChange }: Props) {
  const recommended = values.rooms * RECOMMENDED_PER_ROOM
  const tooLow = values.sumInsured < recommended

  return (
    <BalFormGrid>
      <BalFormCol size="full">
        <BalHint small closeLabel="Alles klar">
          <BalHintTitle>{step.hintTitle}</BalHintTitle>
          <BalHintText>{step.hintText}</BalHintText>
        </BalHint>
      </BalFormCol>

      <BalFormCol size="half">
        <BalField invalid={tooLow}>
          <BalFieldLabel size="small" weight="bold" invalid={tooLow}>
            Versicherungssumme
          </BalFieldLabel>
          <BalFieldControl>
            <BalNumberInput
              name="sumInsured"
              value={values.sumInsured}
              min="20000"
              max="400000"
              suffix="CHF"
              invalid={tooLow}
              onlyPositive
              onBalChange={event => onChange('sumInsured', Number(event.detail ?? 0))}
            />
          </BalFieldControl>
          {tooLow && (
            <BalFieldMessage color="warning">
              Empfohlen sind mindestens {formatChf(recommended)} bei {values.rooms} Zimmern.
            </BalFieldMessage>
          )}
        </BalField>
      </BalFormCol>

      <BalFormCol size="half">
        <BalField>
          <BalFieldLabel size="small">Anzahl Zimmer</BalFieldLabel>
          <BalFieldControl>
            <BalInputStepper
              name="rooms"
              value={values.rooms}
              min={1}
              max={12}
              steps={1}
              onBalChange={event => onChange('rooms', Number(event.detail ?? 1))}
            />
          </BalFieldControl>
        </BalField>
      </BalFormCol>

      <BalFormCol size="full">
        <BalLabel size="small" weight="bold" htmlFor="coverage-slider">
          Feinabstimmung der Summe
        </BalLabel>
        <BalInputSlider
          name="sumInsuredSlider"
          value={values.sumInsured}
          min={20_000}
          max={400_000}
          step={10_000}
          hasTicks
          onBalChange={event => onChange('sumInsured', Number(event.detail ?? 0))}
        />
        <BalText size="small" color="grey" space="none">
          Gewählt: {formatChf(values.sumInsured)}
        </BalText>
      </BalFormCol>

      <BalFormCol size="half">
        <BalLabel size="small" weight="bold">
          Selbstbehalt
        </BalLabel>
        <BalRadioGroup
          name="deductible"
          value={values.deductible}
          interface="button"
          onBalChange={event => onChange('deductible', String(event.detail ?? ''))}
        >
          {deductibleOptions.map(option => (
            <BalRadio
              key={option.value}
              value={option.value}
              color={option.value === values.deductible ? 'green' : 'purple'}
            >
              {option.label}
            </BalRadio>
          ))}
        </BalRadioGroup>
      </BalFormCol>

      <BalFormCol size="half">
        <BalLabel size="small" weight="bold">
          Zusatzdeckungen
        </BalLabel>
        <BalCheckboxGroup
          name="extras"
          value={values.extras}
          vertical
          onBalChange={event => onChange('extras', (event.detail ?? []) as string[])}
        >
          {additionalCovers.map(cover => (
            <BalCheckbox
              key={cover.value}
              value={cover.value}
              color={values.extras.includes(cover.value) ? 'green' : 'purple'}
            >
              {cover.label}
            </BalCheckbox>
          ))}
        </BalCheckboxGroup>
      </BalFormCol>
    </BalFormGrid>
  )
}
