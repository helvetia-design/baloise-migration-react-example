import {
  BalCard,
  BalCardContent,
  BalCardSubtitle,
  BalCardTitle,
  BalCarousel,
  BalCarouselItem,
  BalData,
  BalDataItem,
  BalDataLabel,
  BalDataValue,
  BalHeading,
  BalIcon,
  BalList,
  BalListItem,
  BalListItemContent,
  BalListItemIcon,
  BalListItemSubtitle,
  BalListItemTitle,
  BalLogo,
  BalShape,
  BalText,
} from '@baloise/ds-react'

import { ShowcaseSection } from '../../components/ShowcaseSection'
import { VariantRow } from '../../components/VariantRow'

export function ContentSections() {
  return (
    <>
      <ShowcaseSection tag="bal-heading" title="Heading">
        <VariantRow label="default">
          <BalHeading>Überschrift</BalHeading>
        </VariantRow>
        <VariantRow label="level=h3">
          <BalHeading level="h3">Überschrift h3</BalHeading>
        </VariantRow>
        <VariantRow label="visualLevel=large">
          <BalHeading visualLevel="large">optisch large</BalHeading>
        </VariantRow>
        <VariantRow label="autoLevel=medium">
          <BalHeading autoLevel="medium">auto medium</BalHeading>
        </VariantRow>
        <VariantRow label="color=danger">
          <BalHeading color="danger">in Danger</BalHeading>
        </VariantRow>
        <VariantRow label="space=all">
          <BalHeading space="all">mit Abstand</BalHeading>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-text" title="Text">
        <VariantRow label="default">
          <BalText>Fliesstext</BalText>
        </VariantRow>
        <VariantRow label="color=success">
          <BalText color="success">in Success</BalText>
        </VariantRow>
        <VariantRow label="color=white auf dunklem Grund" dark>
          <BalText color="white" space="none">
            in Weiss
          </BalText>
        </VariantRow>
        <VariantRow label="size=lead">
          <BalText size="lead">Lead-Text</BalText>
        </VariantRow>
        <VariantRow label="space=all">
          <BalText space="all">mit Abstand</BalText>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-icon" title="Icon">
        <VariantRow label="default">
          <BalIcon name="account" />
        </VariantRow>
        <VariantRow label="size=large">
          <BalIcon name="account" size="large" />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-logo" title="Logo">
        <VariantRow label="default">
          <BalLogo />
        </VariantRow>
        <VariantRow label="brand=helvetia">
          <BalLogo brand="helvetia" />
        </VariantRow>
        <VariantRow label="color=white" dark>
          <BalLogo color="white" />
        </VariantRow>
        <VariantRow label="size=small">
          <BalLogo size="small" />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-shape" title="Shape">
        <VariantRow label="default">
          <BalShape />
        </VariantRow>
        <VariantRow label="color=purple">
          <BalShape color="purple" />
        </VariantRow>
        <VariantRow label="rotation=270">
          <BalShape rotation="270" />
        </VariantRow>
        <VariantRow label="variation=3">
          <BalShape variation="3" />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-card" title="Card">
        <VariantRow label="default mit bal-card-title und bal-card-subtitle">
          <BalCard>
            <BalCardTitle>Hausrat</BalCardTitle>
            <BalCardSubtitle>P-8842-11</BalCardSubtitle>
            <BalCardContent>Police mit Standardwerten.</BalCardContent>
          </BalCard>
        </VariantRow>
        <VariantRow label="color=purple-light">
          <BalCard color="purple-light">
            <BalCardTitle>Purple Light</BalCardTitle>
            <BalCardContent>Karte in Purple Light.</BalCardContent>
          </BalCard>
        </VariantRow>
        <VariantRow label="space=large">
          <BalCard space="large">
            <BalCardTitle>Space large</BalCardTitle>
            <BalCardContent>Karte mit grossem Innenabstand.</BalCardContent>
          </BalCard>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-list" title="List">
        <VariantRow label="default mit bal-list-item">
          <BalList>
            <BalListItem>
              <BalListItemContent>
                <BalListItemTitle>Police</BalListItemTitle>
                <BalListItemSubtitle>P-8842-11</BalListItemSubtitle>
              </BalListItemContent>
            </BalListItem>
          </BalList>
        </VariantRow>
        <VariantRow label="background=dark" dark>
          <BalList background="dark">
            <BalListItem>
              <BalListItemIcon>
                <BalIcon name="document" />
              </BalListItemIcon>
              <BalListItemContent>
                <BalListItemTitle>Dunkel</BalListItemTitle>
              </BalListItemContent>
            </BalListItem>
          </BalList>
        </VariantRow>
        <VariantRow label="size=large">
          <BalList size="large">
            <BalListItem>
              <BalListItemContent>
                <BalListItemTitle>Gross</BalListItemTitle>
              </BalListItemContent>
            </BalListItem>
          </BalList>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-data"
        title="Data"
        omitted="keine Enum-Props — gezeigt werden die Boolean-Zustände border und horizontal."
      >
        <VariantRow label="default mit bal-data-item">
          <BalData>
            <BalDataItem>
              <BalDataLabel>Prämie</BalDataLabel>
              <BalDataValue>CHF 412</BalDataValue>
            </BalDataItem>
          </BalData>
        </VariantRow>
        <VariantRow label="border">
          <BalData border>
            <BalDataItem>
              <BalDataLabel>Selbstbehalt</BalDataLabel>
              <BalDataValue>CHF 500</BalDataValue>
            </BalDataItem>
          </BalData>
        </VariantRow>
        <VariantRow label="horizontal">
          <BalData horizontal>
            <BalDataItem>
              <BalDataLabel>Beginn</BalDataLabel>
              <BalDataValue>01.01.2024</BalDataValue>
            </BalDataItem>
          </BalData>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-carousel" title="Carousel">
        <VariantRow label="default mit bal-carousel-item">
          <BalCarousel>
            <BalCarouselItem value={0}>
              <BalText space="none">Erster Beitrag</BalText>
            </BalCarouselItem>
            <BalCarouselItem value={1}>
              <BalText space="none">Zweiter Beitrag</BalText>
            </BalCarouselItem>
          </BalCarousel>
        </VariantRow>
        <VariantRow label="aspectRatio=4by3">
          <BalCarousel aspectRatio="4by3">
            <BalCarouselItem value={0}>
              <BalText space="none">4 zu 3</BalText>
            </BalCarouselItem>
          </BalCarousel>
        </VariantRow>
        <VariantRow label="controls=dots">
          <BalCarousel controls="dots">
            <BalCarouselItem value={0}>
              <BalText space="none">Punkte</BalText>
            </BalCarouselItem>
            <BalCarouselItem value={1}>
              <BalText space="none">Zweite Seite</BalText>
            </BalCarouselItem>
          </BalCarousel>
        </VariantRow>
        <VariantRow label="interface=product">
          <BalCarousel interface="product">
            <BalCarouselItem value={0}>
              <BalText space="none">Produktkachel</BalText>
            </BalCarouselItem>
          </BalCarousel>
        </VariantRow>
        <VariantRow label="space=medium">
          <BalCarousel space="medium">
            <BalCarouselItem value={0}>
              <BalText space="none">Abstand medium</BalText>
            </BalCarouselItem>
          </BalCarousel>
        </VariantRow>
      </ShowcaseSection>
    </>
  )
}
