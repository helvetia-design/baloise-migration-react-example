import { useEffect, useRef, useState, type ComponentRef } from 'react'
import { useSearchParams } from 'react-router'
import { balToastController } from '@baloise/ds-core'
import {
  BalButton,
  BalCard,
  BalCardContent,
  BalCardTitle,
  BalClose,
  BalDate,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
  BalFileUpload,
  BalFormCol,
  BalFormGrid,
  BalHeading,
  BalPopup,
  BalSelect,
  BalSelectOption,
  BalSheet,
  BalStack,
  BalText,
  BalTextarea,
} from '@baloise/ds-react'

import { ConfirmModal } from './ConfirmModal'
import { claimKinds } from '../../data/claims'
import { policies } from '../../data/policies'

const MIN_DESCRIPTION = 30

export function ClaimPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [policyId, setPolicyId] = useState(policies[0].id)
  const [kind, setKind] = useState('wasser')
  const [incidentDate, setIncidentDate] = useState('2026-09-14')
  const [description, setDescription] = useState('Wasseraustritt unter der Spüle.')
  const [files, setFiles] = useState<File[]>([])
  const policyHelpTriggerRef = useRef<ComponentRef<typeof BalButton>>(null)
  const policyHelpPopupRef = useRef<ComponentRef<typeof BalPopup>>(null)

  const dialog = searchParams.get('dialog')
  const notice = searchParams.get('notice')
  const helpOpen = searchParams.get('help') === 'policy'

  /**
   * bal-popup koppelt sich über das HTML-Attribut bal-popup="<id>" am Trigger —
   * der React-Prop balPopup setzt nur die JS-Property, nicht das Attribut, auf das
   * die interne Kopplung per closest('[bal-popup]') angewiesen ist. Ein extern
   * gesetztes active-Prop öffnet daher nichts, solange present()/dismiss() nicht in
   * derselben Stelle wie die Attribut-Zuweisung aufgerufen werden: setzt man das
   * Attribut per Effekt und verlässt sich separat auf den active-Watcher, laufen
   * beide zeitlich unkoordiniert gegeneinander — bei einem echten Klick ist das
   * Attribut längst gesetzt, beim initialen Laden über die URL nicht zwingend.
   */
  useEffect(() => {
    const trigger = policyHelpTriggerRef.current
    const popup = policyHelpPopupRef.current
    if (!trigger || !popup) {
      return
    }
    trigger.setAttribute('bal-popup', 'claim-policy-help')
    if (helpOpen) {
      void popup.present()
    } else {
      void popup.dismiss()
    }
  }, [helpOpen])

  const descriptionError =
    description.trim().length < MIN_DESCRIPTION
      ? `Bitte mindestens ${MIN_DESCRIPTION} Zeichen — aktuell ${description.trim().length}.`
      : undefined

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams)
    if (value === null) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    setSearchParams(next, { replace: true })
  }

  /** Controller-Aufruf auf bal-toast; über ?notice=submitted auch direkt per URL erreichbar. */
  useEffect(() => {
    if (notice !== 'submitted') {
      return
    }
    balToastController.create({
      message: 'Schadenmeldung eingegangen. Sie hören innerhalb von zwei Arbeitstagen von uns.',
      color: 'success',
      duration: 0,
      closable: true,
      closeHandler: () => setParam('notice', null),
    })
  }, [notice])

  const kindLabel = claimKinds.find(entry => entry.value === kind)?.label ?? kind

  return (
    <div className="container is-compact py-large">
      <header className="mb-large">
        <BalHeading level="h1" space="none">
          Schaden melden
        </BalHeading>
        <BalText color="grey" space="none">
          Ein Schaden bezieht sich immer auf eine bestehende Police.
        </BalText>
      </header>

      <BalCard className="mb-large">
        <BalCardTitle>Angaben zum Ereignis</BalCardTitle>
        <BalCardContent>

          <BalFormGrid>
            <BalFormCol size="half">
              <BalField required>
                <BalFieldLabel required size="small">
                  Police
                </BalFieldLabel>
                <BalFieldControl>
                  <BalSelect
                    name="policy"
                    value={policyId}
                    onBalChange={event => setPolicyId(String(event.detail ?? policies[0].id))}
                  >
                    {policies.map(policy => (
                      <BalSelectOption
                        key={policy.id}
                        value={policy.id}
                        label={`${policy.label} (${policy.id})`}
                      >
                        {policy.label} ({policy.id})
                      </BalSelectOption>
                    ))}
                  </BalSelect>
                </BalFieldControl>
              </BalField>
            </BalFormCol>

            <BalFormCol size="half">
              <BalField required>
                <BalFieldLabel required size="small">
                  Schadenart
                </BalFieldLabel>
                <BalFieldControl>
                  <BalSelect
                    name="kind"
                    value={kind}
                    filter="includes"
                    onBalChange={event => setKind(String(event.detail ?? 'wasser'))}
                  >
                    {claimKinds.map(entry => (
                      <BalSelectOption key={entry.value} value={entry.value} label={entry.label}>
                        {entry.label}
                      </BalSelectOption>
                    ))}
                  </BalSelect>
                </BalFieldControl>
              </BalField>
            </BalFormCol>

            <BalFormCol size="half">
              <BalField required>
                <BalFieldLabel required size="small">
                  Datum des Ereignisses
                </BalFieldLabel>
                <BalFieldControl>
                  <BalDate
                    name="incidentDate"
                    value={incidentDate}
                    max="2026-12-31"
                    triggerIcon
                    closeOnSelect
                    onBalChange={event => setIncidentDate(String(event.detail ?? ''))}
                  />
                </BalFieldControl>
              </BalField>
            </BalFormCol>

            <BalFormCol size="full">
              <BalField required invalid={!!descriptionError}>
                <BalFieldLabel required size="small" invalid={!!descriptionError}>
                  Hergang
                </BalFieldLabel>
                <BalFieldControl>
                  {/* wrap ist ein Durchreich-Prop ohne visuelle Wirkung. */}
                  <BalTextarea
                    name="description"
                    value={description}
                    rows={5}
                    wrap="soft"
                    inputmode="text"
                    autocomplete="off"
                    invalid={!!descriptionError}
                    onBalInput={event => setDescription(String(event.detail ?? ''))}
                  />
                </BalFieldControl>
                {descriptionError && (
                  <BalFieldMessage color="danger">{descriptionError}</BalFieldMessage>
                )}
              </BalField>
            </BalFormCol>

            <BalFormCol size="full">
              <BalField>
                <BalFieldLabel size="small">Belege</BalFieldLabel>
                <BalFieldControl>
                  <BalFileUpload
                    name="documents"
                    multiple
                    hasFileList
                    accept="image/png,image/jpeg,application/pdf"
                    maxFiles={5}
                    label="Dateien hierhin ziehen oder auswählen"
                    value={files}
                    onBalChange={event => setFiles((event.detail ?? []) as File[])}
                  />
                </BalFieldControl>
              </BalField>
            </BalFormCol>
          </BalFormGrid>
        </BalCardContent>
      </BalCard>

      {/* bal-sheet ist eine am Viewport fixierte Leiste, kein Seitencontainer. */}
      <BalSheet containerSize="compact">
        <BalStack layout="horizontal" space="small" align="end">
          <BalButton ref={policyHelpTriggerRef} color="link" size="small">
            Welche Police ist betroffen?
          </BalButton>
          <BalButton
            color="primary"
            disabled={!!descriptionError}
            onBalClick={() => setParam('dialog', 'confirm')}
          >
            Weiter zur Bestätigung
          </BalButton>
        </BalStack>
      </BalSheet>

      <BalPopup
        id="claim-policy-help"
        ref={policyHelpPopupRef}
        onBalChange={event => setParam('help', event.detail ? 'policy' : null)}
      >
        <BalCard>
          <BalCardContent>
            <BalStack layout="horizontal" alignment="top start" space="small">
              <BalText space="none">
                Wählen Sie die Police, unter der das Ereignis versichert ist. Bei Unsicherheit
                hilft Ihnen die Beratung weiter.
              </BalText>
              <BalClose size="medium" onClick={() => setParam('help', null)} />
            </BalStack>
          </BalCardContent>
        </BalCard>
      </BalPopup>

      <ConfirmModal
        open={dialog === 'confirm'}
        claimKind={kindLabel}
        fileCount={files.length}
        onDismiss={() => setParam('dialog', null)}
        onConfirm={() => {
          const next = new URLSearchParams(searchParams)
          next.delete('dialog')
          next.set('notice', 'submitted')
          setSearchParams(next, { replace: true })
        }}
      />
    </div>
  )
}
