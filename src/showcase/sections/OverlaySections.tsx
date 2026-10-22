import { useEffect, useRef, type ComponentRef } from 'react'
import {
  BalButton,
  BalCard,
  BalCardContent,
  BalModal,
  BalModalBody,
  BalModalHeader,
  BalPopover,
  BalPopoverContent,
  BalPopup,
  BalText,
  BalTooltip,
} from '@baloise/ds-react'

import { ShowcaseSection } from '../../components/ShowcaseSection'
import { VariantRow } from '../../components/VariantRow'

/**
 * bal-popup koppelt sich über das HTML-Attribut bal-popup="<id>" am Trigger an die
 * bal-popup mit passender id (Doku Components/Data Display/Popup) — der React-Prop
 * balPopup setzt nur die JS-Property, nicht das Attribut, daher hier direkt am
 * DOM-Element gesetzt. Danach übernimmt der interne, globale Klick-Listener der
 * Komponente das Öffnen und Schliessen vollständig selbst — ohne eigenen State.
 */
function usePopupTrigger(popupId: string) {
  const ref = useRef<ComponentRef<typeof BalButton>>(null)
  useEffect(() => {
    ref.current?.setAttribute('bal-popup', popupId)
  }, [popupId])
  return ref
}

export function OverlaySections() {
  const defaultModalRef = useRef<ComponentRef<typeof BalModal>>(null)
  const smallModalRef = useRef<ComponentRef<typeof BalModal>>(null)
  const defaultPopupTriggerRef = usePopupTrigger('sc-popup-default')
  const placementPopupTriggerRef = usePopupTrigger('sc-popup-placement')
  const drawerPopupTriggerRef = usePopupTrigger('sc-popup-drawer')

  return (
    <>
      <ShowcaseSection
        tag="bal-modal"
        title="Modal"
        omitted="nichts — bal-modal kennt kein deklaratives Prop zum Öffnen, die Kacheln lösen daher open() aus."
      >
        <VariantRow label="default">
          <BalButton size="small" onBalClick={() => defaultModalRef.current?.open()}>
            Modal öffnen
          </BalButton>
          <BalModal ref={defaultModalRef}>
            <BalModalHeader>Standard</BalModalHeader>
            <BalModalBody>
              <BalText space="none">Modal mit Standardabstand.</BalText>
            </BalModalBody>
          </BalModal>
        </VariantRow>
        <VariantRow label="space=small">
          <BalButton size="small" onBalClick={() => smallModalRef.current?.open()}>
            Modal mit space=small
          </BalButton>
          <BalModal ref={smallModalRef} space="small">
            <BalModalHeader>Kompakt</BalModalHeader>
            <BalModalBody>
              <BalText space="none">Modal mit kleinem Abstand.</BalText>
            </BalModalBody>
          </BalModal>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-popover" title="Popover">
        <VariantRow label="default mit bal-popover-content">
          <BalPopover>
            <div bal-popover-trigger="">
              <BalButton size="small">Öffnen</BalButton>
            </div>
            <BalPopoverContent>
              <BalText space="none">Standardposition.</BalText>
            </BalPopoverContent>
          </BalPopover>
        </VariantRow>
        <VariantRow label="position=right-start">
          <BalPopover position="right-start">
            <div bal-popover-trigger="">
              <BalButton size="small">Rechts oben</BalButton>
            </div>
            <BalPopoverContent>
              <BalText space="none">Rechts ausgerichtet.</BalText>
            </BalPopoverContent>
          </BalPopover>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-popup" title="Popup">
        <VariantRow label="default">
          <BalButton ref={defaultPopupTriggerRef} size="small">
            Öffnen
          </BalButton>
          <BalPopup id="sc-popup-default">
            <BalCard>
              <BalCardContent>
                <BalText space="none">Popup mit Standardwerten.</BalText>
              </BalCardContent>
            </BalCard>
          </BalPopup>
        </VariantRow>
        <VariantRow label="placement=bottom-end">
          <BalButton ref={placementPopupTriggerRef} size="small">
            Unten rechts öffnen
          </BalButton>
          <BalPopup id="sc-popup-placement" placement="bottom-end">
            <BalCard>
              <BalCardContent>
                <BalText space="none">Unten rechts.</BalText>
              </BalCardContent>
            </BalCard>
          </BalPopup>
        </VariantRow>
        <VariantRow label="variant=drawer">
          <BalButton ref={drawerPopupTriggerRef} size="small">
            Drawer öffnen
          </BalButton>
          <BalPopup id="sc-popup-drawer" variant="drawer">
            <BalCard>
              <BalCardContent>
                <BalText space="none">Als Drawer.</BalText>
              </BalCardContent>
            </BalCard>
          </BalPopup>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-tooltip" title="Tooltip">
        <VariantRow label="default">
          <BalText space="none" id="sc-tooltip-default">
            Referenzelement
          </BalText>
          <BalTooltip reference="#sc-tooltip-default">Standardposition oben.</BalTooltip>
        </VariantRow>
        <VariantRow label="placement=bottom">
          <BalText space="none" id="sc-tooltip-bottom">
            Zweites Referenzelement
          </BalText>
          <BalTooltip reference="#sc-tooltip-bottom" placement="bottom">
            Unterhalb platziert.
          </BalTooltip>
        </VariantRow>
      </ShowcaseSection>
    </>
  )
}
