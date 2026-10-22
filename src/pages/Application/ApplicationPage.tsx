import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { balSnackbarController } from '@baloise/ds-core'
import {
  BalButton,
  BalButtonGroup,
  BalCard,
  BalCardContent,
  BalCardSubtitle,
  BalCardTitle,
  BalHeading,
  BalStack,
  BalStepItem,
  BalSteps,
  BalTag,
  BalText,
} from '@baloise/ds-react'

import { applicationFaq, applicationSteps, applications } from '../../data/applications'
import { CoverageStep, type CoverageValues } from './CoverageStep'
import { FaqAccordion } from './FaqAccordion'
import { PaymentStep, type PaymentValues } from './PaymentStep'
import { PersonStep, type PersonValues } from './PersonStep'
import { ReviewStep } from './ReviewStep'

const initialPerson: PersonValues = {
  salutation: 'frau',
  firstName: 'Andrea',
  lastName: '',
  birthDate: '1986-03-04',
  street: 'Aeschenvorstadt 12',
  zip: '4051',
  city: 'Basel',
  email: 'andrea.brunner@example',
  phone: '+41 61 555 20 14',
}

const initialCoverage: CoverageValues = {
  sumInsured: 60_000,
  rooms: 4,
  deductible: '500',
  extras: ['velo'],
}

const initialPayment: PaymentValues = {
  interval: 'halbjaehrlich',
  offerNumber: '',
  accountHolder: '',
}

const draft = applications[1]

export function ApplicationPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [person, setPerson] = useState(initialPerson)
  const [coverage, setCoverage] = useState(initialCoverage)
  const [payment, setPayment] = useState(initialPayment)
  const [accepted, setAccepted] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [openFaq, setOpenFaq] = useState<string | null>(applicationFaq[0].value)

  const saved = searchParams.get('saved')
  const requested = searchParams.get('step')
  const stepIndex = Math.max(
    0,
    applicationSteps.findIndex(step => step.value === requested),
  )
  const currentStep = applicationSteps[stepIndex]

  const personErrors = {
    lastName: person.lastName.trim() === '' ? 'Bitte Nachname erfassen.' : undefined,
    email: person.email.includes('.') ? undefined : 'Bitte eine gültige E-Mail erfassen.',
  }
  const paymentErrors = {
    accountHolder:
      payment.accountHolder.trim() === '' ? 'Bitte Kontoinhaber erfassen.' : undefined,
  }

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    next.set(key, value)
    setSearchParams(next, { replace: true })
  }

  const goToStep = (value: string) => setParam('step', value)

  /**
   * Controller-Aufruf auf bal-snackbar. Hängt am Search-Param, damit der Zustand
   * auch direkt per URL erreichbar ist und nicht erst geklickt werden muss.
   */
  useEffect(() => {
    if (saved !== 'draft') {
      return
    }
    const snackbar = balSnackbarController.create({
      message: `Antrag ${draft.id} als Entwurf gespeichert.`,
      subject: 'Entwurf gesichert',
      icon: 'check',
      color: 'success',
      duration: 0,
      action: 'Zur Übersicht',
      actionHandler: () => setParam('step', applicationSteps[0].value),
    })
    if (snackbar) {
      // target gehört zum Element, nicht zu den Controller-Optionen —
      // Durchreich-Prop ohne visuelle Wirkung.
      snackbar.target = '_self'
    }
    return () => {
      void snackbar?.close?.()
    }
  }, [saved])

  return (
    <div className="container is-compact py-large">
      <header className="mb-large">
        <BalHeading level="h1" space="none">
          Antrag Hausrat
        </BalHeading>
        <BalStack layout="horizontal" space="x-small">
          <BalText color="grey" space="none">
            {draft.id} · erstellt {draft.createdDate}
          </BalText>
          <BalTag color={draft.status === 'entwurf' ? 'warning' : 'info'} size="small">
            {draft.status === 'entwurf' ? 'Entwurf' : 'Eingereicht'}
          </BalTag>
        </BalStack>
      </header>

      <BalSteps
        className="mb-large"
        value={currentStep.value}
        color={stepIndex === applicationSteps.length - 1 ? 'green' : 'light-blue'}
        clickable
        onBalChange={event => goToStep(String(event.detail ?? applicationSteps[0].value))}
      >
        {applicationSteps.map((step, index) => (
          <BalStepItem
            key={step.value}
            value={step.value}
            label={step.label}
            done={index < stepIndex}
            active={index === stepIndex}
            failed={index === 0 && !!personErrors.lastName && stepIndex > 0}
          />
        ))}
      </BalSteps>

      <BalCard className="mb-large">
        <BalCardTitle>{currentStep.label}</BalCardTitle>
        <BalCardSubtitle>
          Schritt {stepIndex + 1} von {applicationSteps.length}
        </BalCardSubtitle>
        <BalCardContent>

          {currentStep.value === 'person' && (
            <PersonStep
              values={person}
              errors={personErrors}
              step={currentStep}
              onChange={(field, value) => setPerson(state => ({ ...state, [field]: value }))}
            />
          )}
          {currentStep.value === 'coverage' && (
            <CoverageStep
              values={coverage}
              step={currentStep}
              onChange={(field, value) => setCoverage(state => ({ ...state, [field]: value }))}
            />
          )}
          {currentStep.value === 'payment' && (
            <PaymentStep
              values={payment}
              errors={paymentErrors}
              step={currentStep}
              onChange={(field, value) => setPayment(state => ({ ...state, [field]: value }))}
            />
          )}
          {currentStep.value === 'review' && (
            <ReviewStep
              person={person}
              coverage={coverage}
              payment={payment}
              step={currentStep}
              accepted={accepted}
              showAcceptError={submitAttempted && !accepted}
              onAccept={setAccepted}
            />
          )}
        </BalCardContent>
      </BalCard>

      <BalButtonGroup position="right" className="mb-large">
        <BalButton
          color="text"
          disabled={stepIndex === 0}
          onBalClick={() => goToStep(applicationSteps[Math.max(0, stepIndex - 1)].value)}
        >
          Zurück
        </BalButton>
        <BalButton color="secondary" onBalClick={() => setParam('saved', 'draft')}>
          Entwurf speichern
        </BalButton>
        <BalButton
          color={stepIndex === applicationSteps.length - 1 ? 'success' : 'primary'}
          onBalClick={() => {
            if (stepIndex === applicationSteps.length - 1) {
              setSubmitAttempted(true)
              return
            }
            goToStep(applicationSteps[stepIndex + 1].value)
          }}
        >
          {stepIndex === applicationSteps.length - 1 ? 'Antrag einreichen' : 'Weiter'}
        </BalButton>
      </BalButtonGroup>

      <section>
        <BalHeading level="h3" space="bottom">
          Häufige Fragen
        </BalHeading>
        <FaqAccordion
          openValue={openFaq}
          onToggle={value => setOpenFaq(current => (current === value ? null : value))}
        />
      </section>
    </div>
  )
}
