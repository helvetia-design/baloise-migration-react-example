import { useState } from 'react'
import {
  BalCarousel,
  BalCarouselItem,
  BalCard,
  BalCardContent,
  BalCardSubtitle,
  BalCardTitle,
  BalHeading,
  BalShape,
  BalStack,
  BalText,
} from '@baloise/ds-react'

const highlights = [
  {
    value: 0,
    title: 'Wasserschäden vermeiden',
    text: 'Spülmaschine nie unbeaufsichtigt laufen lassen und Zuleitungen jährlich prüfen.',
    color: 'green',
    rotation: '0',
  },
  {
    value: 1,
    title: 'Velo richtig sichern',
    text: 'Ein geprüftes Schloss am Rahmen senkt das Diebstahlrisiko deutlich.',
    color: 'yellow',
    rotation: '90',
  },
  {
    value: 2,
    title: 'Winterreifen',
    text: 'Von Oktober bis Ostern mit Winterreifen fahren — auch ohne gesetzliche Pflicht.',
    color: 'purple',
    rotation: '180',
  },
] as const

export function PreventionHighlights() {
  const [slide, setSlide] = useState(0)
  const active = highlights[slide] ?? highlights[0]

  return (
    <>
      <BalHeading level="h3" space="bottom">
        Prävention
      </BalHeading>

      <BalCarousel
        value={slide}
        controls="dots"
        interface="card"
        htmlRole="list"
        space="normal"
        itemsPerView={1}
        onBalChange={event => setSlide(event.detail ?? 0)}
      >
        {highlights.map(item => (
          <BalCarouselItem key={item.value} value={item.value} label={item.title}>
            {/* width:100% wie im Doku-Beispiel Components/Data Display/Carousel. */}
            <BalCard
              color={item.value === slide ? 'white' : 'grey-light'}
              style={{ width: '100%' }}
            >
              <BalCardTitle>{item.title}</BalCardTitle>
              <BalCardSubtitle>
                Tipp {item.value + 1} von {highlights.length}
              </BalCardSubtitle>
              <BalCardContent>
                <BalStack space="small" alignment="top start">
                  <BalShape
                    color={item.color}
                    rotation={item.rotation}
                    variation={item.value === slide ? '2' : '1'}
                  />
                  <BalText size="small" space="none">
                    {item.text}
                  </BalText>
                </BalStack>
              </BalCardContent>
            </BalCard>
          </BalCarouselItem>
        ))}
      </BalCarousel>

      <BalText size="small" color="grey" space="top">
        Aktueller Tipp: {active.title}
      </BalText>
    </>
  )
}
