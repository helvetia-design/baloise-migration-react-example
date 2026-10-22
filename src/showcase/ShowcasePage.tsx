import {
  BalHeading,
  BalTag,
  BalTagGroup,
  BalText,
} from '@baloise/ds-react'

import { ContentSections } from './sections/ContentSections'
import { FeedbackSections } from './sections/FeedbackSections'
import { FormSections } from './sections/FormSections'
import { LayoutSections } from './sections/LayoutSections'
import { NavigationSections } from './sections/NavigationSections'
import { OverlaySections } from './sections/OverlaySections'

const groups = [
  { title: 'Layout', anchor: 'bal-app' },
  { title: 'Inhalt', anchor: 'bal-heading' },
  { title: 'Formular', anchor: 'bal-input' },
  { title: 'Rückmeldung', anchor: 'bal-badge' },
  { title: 'Navigation', anchor: 'bal-button' },
  { title: 'Overlay', anchor: 'bal-modal' },
]

export function ShowcasePage() {
  return (
    <div className="container is-fluid py-large">
      <header className="mb-large">
        <BalHeading level="h1" space="none">
          Showcase
        </BalHeading>
        <BalText color="grey" space="none">
          Pro Komponente eine Sektion. Jedes Enum-Prop erscheint einmal mit einem
          Nicht-Default-Wert. Durchreich-Props ohne visuelle Wirkung sind bewusst
          ausgelassen und je Sektion vermerkt.
        </BalText>
      </header>

      <BalTagGroup className="mb-large">
        {groups.map(group => (
          <BalTag key={group.anchor} color="info" size="small">
            <a href={`#${group.anchor}`}>{group.title}</a>
          </BalTag>
        ))}
      </BalTagGroup>

      <LayoutSections />
      <ContentSections />
      <FormSections />
      <FeedbackSections />
      <NavigationSections />
      <OverlaySections />
    </div>
  )
}
