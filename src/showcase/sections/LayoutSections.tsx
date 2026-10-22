import type { ReactNode } from 'react'
import {
  BalContent,
  BalDivider,
  BalFormCol,
  BalFormGrid,
  BalInput,
  BalSheet,
  BalStack,
  BalTable,
  BalText,
} from '@baloise/ds-react'

import { ShowcaseSection } from '../../components/ShowcaseSection'
import { VariantRow } from '../../components/VariantRow'

/** Eigener Containing Block, damit das fixierte bal-sheet in der Kachel bleibt. */
const SheetFrame = ({ children }: { children: ReactNode }) => (
  <div style={{ transform: 'translateZ(0)', position: 'relative', height: '5rem', width: '100%' }}>
    {children}
  </div>
)

const Box = ({ children }: { children: string }) => (
  <BalText size="small" space="none">
    {children}
  </BalText>
)

export function LayoutSections() {
  return (
    <>
      <ShowcaseSection
        tag="bal-app"
        title="App"
        omitted="keine Enum-Props; bal-app ist die Wurzel der Anwendung und umschliesst in AppShell.tsx die gesamte Oberfläche — hier nicht erneut verschachtelt."
      >
        <VariantRow label="in Verwendung">
          <BalText size="small" space="none">
            Diese Seite läuft innerhalb von bal-app.
          </BalText>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-content" title="Content">
        <VariantRow label="default">
          <BalContent>
            <Box>Inhalt</Box>
          </BalContent>
        </VariantRow>
        <VariantRow label="align=center">
          <BalContent align="center">
            <Box>zentriert</Box>
          </BalContent>
        </VariantRow>
        <VariantRow label="alignment=bottom end">
          <BalContent alignment="bottom end">
            <Box>unten rechts</Box>
          </BalContent>
        </VariantRow>
        <VariantRow label="direction=column">
          <BalContent direction="column">
            <Box>Spalte</Box>
          </BalContent>
        </VariantRow>
        <VariantRow label="layout=horizontal">
          <BalContent layout="horizontal">
            <Box>horizontal</Box>
          </BalContent>
        </VariantRow>
        <VariantRow label="space=small">
          <BalContent space="small">
            <Box>Abstand small</Box>
          </BalContent>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-stack" title="Stack">
        <VariantRow label="default">
          <BalStack>
            <Box>A</Box>
            <Box>B</Box>
          </BalStack>
        </VariantRow>
        <VariantRow label="align=center">
          <BalStack align="center">
            <Box>A</Box>
          </BalStack>
        </VariantRow>
        <VariantRow label="alignment=bottom end">
          <BalStack alignment="bottom end">
            <Box>A</Box>
          </BalStack>
        </VariantRow>
        <VariantRow label="direction=column">
          <BalStack direction="column">
            <Box>A</Box>
          </BalStack>
        </VariantRow>
        <VariantRow label="layout=vertical">
          <BalStack layout="vertical">
            <Box>A</Box>
          </BalStack>
        </VariantRow>
        <VariantRow label="px=large">
          <BalStack px="large">
            <Box>A</Box>
          </BalStack>
        </VariantRow>
        <VariantRow label="py=small">
          <BalStack py="small">
            <Box>A</Box>
          </BalStack>
        </VariantRow>
        <VariantRow label="space=x-large">
          <BalStack space="x-large">
            <Box>A</Box>
            <Box>B</Box>
          </BalStack>
        </VariantRow>
        <VariantRow label="spaceColumn=medium">
          <BalStack spaceColumn="medium">
            <Box>A</Box>
            <Box>B</Box>
          </BalStack>
        </VariantRow>
        <VariantRow label="spaceRow=small">
          <BalStack spaceRow="small">
            <Box>A</Box>
            <Box>B</Box>
          </BalStack>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-form-grid"
        title="Form Grid"
        omitted="keine Props — gezeigt wird stattdessen die Komposition mit bal-form-col."
      >
        <VariantRow label="Komposition mit bal-form-col">
          <BalFormGrid>
            <BalFormCol size="half">
              <BalInput name="showcase-grid-a" placeholder="half" />
            </BalFormCol>
            <BalFormCol size="one-quarter">
              <BalInput name="showcase-grid-b" placeholder="one-quarter" />
            </BalFormCol>
            <BalFormCol size="one-quarter">
              <BalInput name="showcase-grid-c" placeholder="one-quarter" />
            </BalFormCol>
          </BalFormGrid>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-sheet"
        title="Sheet"
        omitted="nichts — bal-sheet ist position:fixed am unteren Viewport-Rand. Die Kacheln stehen
          daher in einem eigenen Containing Block, sonst würden sie über der Seite kleben."
      >
        <VariantRow label="default">
          <SheetFrame>
            <BalSheet>
              <Box>Standardbreite</Box>
            </BalSheet>
          </SheetFrame>
        </VariantRow>
        <VariantRow label="containerSize=compact">
          <SheetFrame>
            <BalSheet containerSize="compact">
              <Box>kompakt</Box>
            </BalSheet>
          </SheetFrame>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-divider" title="Divider">
        <VariantRow label="default">
          <BalDivider />
        </VariantRow>
        <VariantRow label="borderStyle=dashed">
          <BalDivider borderStyle="dashed" />
        </VariantRow>
        <VariantRow label="color=danger">
          <BalDivider color="danger" />
        </VariantRow>
        <VariantRow label="layout=vertical">
          {/*
            Struktur aus der Doku, Components/Layout/Divider: der vertikale Divider
            steht zwischen zwei Textgeschwistern in einem bal-stack. Er streckt sich
            per align-self:stretch auf deren Zeilenhöhe — allein, ohne Geschwister mit
            eigener Höhe, kollabiert er auf 0.
          */}
          <BalStack>
            <Box>Links</Box>
            <BalDivider layout="vertical" />
            <Box>Rechts</Box>
          </BalStack>
        </VariantRow>
        <VariantRow label="space=large">
          <BalDivider space="large" />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-table"
        title="Table"
        omitted="keine Enum-Props — gezeigt wird der Boolean-Zustand expanded. Das Styling sitzt
          laut Doku auf dem nativen table selbst (Klassen table/is-striped/is-hoverable/w-full),
          nicht auf bal-table — das ist nur der äussere Wrapper für dieses Prop."
      >
        <VariantRow label="default">
          <BalTable>
            <table className="table is-striped is-hoverable w-full">
              <thead>
                <tr>
                  <th>Police</th>
                  <th>Prämie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>P-8842-11</td>
                  <td>CHF 412</td>
                </tr>
                <tr>
                  <td>P-9150-04</td>
                  <td>CHF 186</td>
                </tr>
              </tbody>
            </table>
          </BalTable>
        </VariantRow>
        <VariantRow label="expanded">
          <BalTable expanded>
            <table className="table is-striped is-hoverable w-full">
              <thead>
                <tr>
                  <th>Police</th>
                  <th>Prämie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>P-7731-62</td>
                  <td>CHF 1'248</td>
                </tr>
              </tbody>
            </table>
          </BalTable>
        </VariantRow>
      </ShowcaseSection>
    </>
  )
}
