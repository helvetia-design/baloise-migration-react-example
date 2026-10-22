import { useRef, type ComponentRef } from 'react'
import {
  BalAccordion,
  BalAccordionDetails,
  BalAccordionSummary,
  BalAccordionTrigger,
  BalButton,
  BalContent,
  BalLabel,
  BalStack,
} from '@baloise/ds-react'

import { applicationFaq } from '../../data/applications'

interface Props {
  openValue: string | null
  onToggle: (value: string, open: boolean) => void
}

/**
 * Struktur aus der Doku, Components/Containment/Accordion:
 * bal-accordion-summary trägt den immer sichtbaren Teil und als letztes Kind den
 * bal-accordion-trigger. Der Trigger ist leer — er rendert Icon und Beschriftung
 * selbst aus openLabel/closeLabel.
 */
export function FaqAccordion({ openValue, onToggle }: Props) {
  const firstRef = useRef<ComponentRef<typeof BalAccordion>>(null)

  /** Imperativer Aufruf auf bal-accordion. */
  const openFirst = async () => {
    await firstRef.current?.present()
  }

  return (
    <>
      {applicationFaq.map((entry, index) => (
        <BalAccordion
          key={entry.value}
          ref={index === 0 ? firstRef : undefined}
          card
          className="mb-x-small"
          active={openValue === entry.value}
          openLabel="Antwort zeigen"
          closeLabel="Antwort verbergen"
          onBalChange={event => onToggle(entry.value, Boolean(event.detail))}
        >
          <BalAccordionSummary>
            <BalStack>
              <BalContent>
                <BalLabel>{entry.question}</BalLabel>
              </BalContent>
              <BalAccordionTrigger />
            </BalStack>
          </BalAccordionSummary>
          <BalAccordionDetails>
            <p className="py-medium">{entry.answer}</p>
          </BalAccordionDetails>
        </BalAccordion>
      ))}

      <BalButton color="text" size="small" className="mt-small" onBalClick={openFirst}>
        Erste Frage aufklappen
      </BalButton>
    </>
  )
}
