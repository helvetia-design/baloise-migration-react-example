import {
  BalAccordion,
  BalAccordionDetails,
  BalAccordionSummary,
  BalAccordionTrigger,
  BalButton,
  BalButtonGroup,
  BalClose,
  BalContent,
  BalFooter,
  BalLabel,
  BalLogo,
  BalNavbar,
  BalNavbarBrand,
  BalNavbarMenu,
  BalNavbarMenuStart,
  BalPagination,
  BalStack,
  BalStepItem,
  BalSteps,
  BalTabItem,
  BalTabs,
  BalText,
} from '@baloise/ds-react'

import { ShowcaseSection } from '../../components/ShowcaseSection'
import { VariantRow } from '../../components/VariantRow'

export function NavigationSections() {
  return (
    <>
      <ShowcaseSection
        tag="bal-button"
        title="Button"
        omitted="target — Durchreich-Prop ohne visuelle Wirkung, real verbaut im Footer der Shell."
      >
        <VariantRow label="default mit bal-button-group">
          <BalButtonGroup>
            <BalButton>Speichern</BalButton>
            <BalButton>Abbrechen</BalButton>
          </BalButtonGroup>
        </VariantRow>
        <VariantRow label="color=danger">
          <BalButton color="danger">Löschen</BalButton>
        </VariantRow>
        <VariantRow label="elementType=submit">
          <BalButton elementType="submit">Absenden</BalButton>
        </VariantRow>
        <VariantRow label="size=small">
          <BalButton size="small">Klein</BalButton>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-close" title="Close">
        <VariantRow label="default">
          <BalClose />
        </VariantRow>
        <VariantRow label="size=medium">
          <BalClose size="medium" />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-navbar" title="Navbar">
        <VariantRow label="default mit bal-navbar-brand und bal-navbar-menu">
          <BalNavbar>
            <BalNavbarBrand>
              <BalLogo />
            </BalNavbarBrand>
            <BalNavbarMenu>
              <BalNavbarMenuStart>
                <BalText space="none">Übersicht</BalText>
              </BalNavbarMenuStart>
            </BalNavbarMenu>
          </BalNavbar>
        </VariantRow>
        <VariantRow label="container=compact">
          <BalNavbar container="compact">
            <BalNavbarBrand>
              <BalLogo />
            </BalNavbarBrand>
          </BalNavbar>
        </VariantRow>
        <VariantRow label="interface=simple">
          <BalNavbar interface="simple">
            <BalNavbarBrand interface="simple">
              <BalLogo />
            </BalNavbarBrand>
          </BalNavbar>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-footer" title="Footer">
        <VariantRow label="default">
          <BalFooter hideLinks hideLanguageSelection />
        </VariantRow>
        <VariantRow label="logoBrand=helvetia">
          <BalFooter logoBrand="helvetia" hideLinks hideLanguageSelection />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-tabs" title="Tabs">
        <VariantRow label="default mit bal-tab-item">
          <BalTabs value="a">
            <BalTabItem value="a" label="Stammdaten" />
            <BalTabItem value="b" label="Dokumente" />
          </BalTabs>
        </VariantRow>
        <VariantRow label="context=meta">
          <BalTabs value="a" context="meta">
            <BalTabItem value="a" label="Meta" />
          </BalTabs>
        </VariantRow>
        <VariantRow label="float=right">
          <BalTabs value="a" float="right">
            <BalTabItem value="a" label="Rechts" />
          </BalTabs>
        </VariantRow>
        <VariantRow label="iconPosition=vertical">
          <BalTabs value="a" iconPosition="vertical">
            <BalTabItem value="a" label="Oben Icon" icon="account" />
          </BalTabs>
        </VariantRow>
        <VariantRow label="vertical=tablet">
          <BalTabs value="a" vertical="tablet">
            <BalTabItem value="a" label="Ab Tablet vertikal" />
          </BalTabs>
        </VariantRow>
        <VariantRow label="verticalColSize=half">
          <BalTabs value="a" vertical="tablet" verticalColSize="half">
            <BalTabItem value="a" label="Halbe Spalte" />
          </BalTabs>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-steps" title="Steps">
        <VariantRow label="default mit bal-step-item">
          <BalSteps value="a">
            <BalStepItem value="a" label="Person" active />
            <BalStepItem value="b" label="Deckung" />
          </BalSteps>
        </VariantRow>
        <VariantRow label="color=purple">
          <BalSteps value="a" color="purple">
            <BalStepItem value="a" label="Person" active />
            <BalStepItem value="b" label="Deckung" done />
          </BalSteps>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-pagination" title="Pagination">
        <VariantRow label="default">
          <BalPagination value={1} totalPages={5} />
        </VariantRow>
        <VariantRow label="align=start">
          <BalPagination value={2} totalPages={5} align="start" />
        </VariantRow>
        <VariantRow label="interface=small">
          <BalPagination value={2} totalPages={5} interface="small" />
        </VariantRow>
        <VariantRow label="size=small">
          <BalPagination value={3} totalPages={5} size="small" />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-accordion"
        title="Accordion"
        omitted="keine Enum-Props — gezeigt werden Boolean-Zustände. Struktur wie im Doku-Beispiel:
          bal-accordion-trigger ist leer und rendert Icon und Beschriftung selbst."
      >
        <VariantRow label="default mit bal-accordion-summary, -trigger und -details">
          <BalAccordion>
            <BalAccordionSummary>
              <BalStack>
                <BalContent>
                  <BalLabel>Wann kann ich kündigen?</BalLabel>
                </BalContent>
                <BalAccordionTrigger />
              </BalStack>
            </BalAccordionSummary>
            <BalAccordionDetails>
              <p className="py-medium">Auf das Ende der Vertragsdauer, mit drei Monaten Frist.</p>
            </BalAccordionDetails>
          </BalAccordion>
        </VariantRow>
        <VariantRow label="card">
          <BalAccordion card>
            <BalAccordionSummary>
              <BalStack>
                <BalContent>
                  <BalLabel>Als Karte</BalLabel>
                </BalContent>
                <BalAccordionTrigger />
              </BalStack>
            </BalAccordionSummary>
            <BalAccordionDetails>
              <p className="py-medium">Mit Kartenrahmen.</p>
            </BalAccordionDetails>
          </BalAccordion>
        </VariantRow>
        <VariantRow label="active">
          <BalAccordion active>
            <BalAccordionSummary>
              <BalStack>
                <BalContent>
                  <BalLabel>Bereits offen</BalLabel>
                </BalContent>
                <BalAccordionTrigger />
              </BalStack>
            </BalAccordionSummary>
            <BalAccordionDetails>
              <p className="py-medium">Dieser Abschnitt ist ohne Klick geöffnet.</p>
            </BalAccordionDetails>
          </BalAccordion>
        </VariantRow>
      </ShowcaseSection>
    </>
  )
}
