import {
  BalBadge,
  BalNotification,
  BalProgressBar,
  BalSnackbar,
  BalSpinner,
  BalTag,
  BalTagGroup,
  BalToast,
} from '@baloise/ds-react'

import { ShowcaseSection } from '../../components/ShowcaseSection'
import { VariantRow } from '../../components/VariantRow'

export function FeedbackSections() {
  return (
    <>
      <ShowcaseSection tag="bal-badge" title="Badge">
        <VariantRow label="default">
          <BalBadge>Neu</BalBadge>
        </VariantRow>
        <VariantRow label="color=purple">
          <BalBadge color="purple">Archiv</BalBadge>
        </VariantRow>
        <VariantRow label="position=button">
          <BalBadge position="button">3</BalBadge>
        </VariantRow>
        <VariantRow label="size=large">
          <BalBadge size="large">Gross</BalBadge>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-tag" title="Tag">
        <VariantRow label="default mit bal-tag-group">
          <BalTagGroup>
            <BalTag>Hausrat</BalTag>
            <BalTag>Haftpflicht</BalTag>
          </BalTagGroup>
        </VariantRow>
        <VariantRow label="color=danger">
          <BalTag color="danger">Abgelehnt</BalTag>
        </VariantRow>
        <VariantRow label="position=center">
          <BalTag position="center">Zentriert</BalTag>
        </VariantRow>
        <VariantRow label="size=large">
          <BalTag size="large">Gross</BalTag>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-notification" title="Notification">
        <VariantRow label="default">
          <BalNotification>Ihre Angaben wurden gespeichert.</BalNotification>
        </VariantRow>
        <VariantRow label="color=warning">
          <BalNotification color="warning">Eine Rate ist noch offen.</BalNotification>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-progress-bar" title="Progress Bar">
        <VariantRow label="default">
          <BalProgressBar value={40} />
        </VariantRow>
        <VariantRow label="background=grey">
          <BalProgressBar value={60} background="grey" />
        </VariantRow>
        <VariantRow label="color=purple">
          <BalProgressBar value={80} color="purple" />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-spinner" title="Spinner">
        <VariantRow label="default">
          <BalSpinner />
        </VariantRow>
        <VariantRow label="color=white" dark>
          <BalSpinner color="white" />
        </VariantRow>
        <VariantRow label="variation=circle">
          <BalSpinner variation="circle" />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-toast"
        title="Toast"
        omitted="nichts — das Element wird hier direkt gerendert, weil color nur so nebeneinander sichtbar ist; der dokumentierte Controller-Aufruf balToastController.create() steckt auf /claim."
      >
        <VariantRow label="default">
          <BalToast message="Gespeichert." />
        </VariantRow>
        <VariantRow label="color=danger">
          <BalToast message="Übermittlung fehlgeschlagen." color="danger" />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-snackbar"
        title="Snackbar"
        omitted="target — Durchreich-Prop ohne visuelle Wirkung, real verbaut auf /application. Der Controller-Aufruf balSnackbarController.create() steckt ebenfalls dort."
      >
        <VariantRow label="default">
          <BalSnackbar subject="Entwurf" message="Antrag gespeichert." icon="check" />
        </VariantRow>
        <VariantRow label="color=warning">
          <BalSnackbar
            subject="Hinweis"
            message="Eine Rate ist offen."
            icon="info-circle"
            color="warning"
          />
        </VariantRow>
      </ShowcaseSection>
    </>
  )
}
