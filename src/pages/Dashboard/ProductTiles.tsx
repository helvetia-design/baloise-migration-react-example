import {
  balBrandIconHomeContentsGreen,
  balBrandIconLiabilityPurple,
  balBrandIconMotorvehicleTangerine,
} from '@baloise/ds-brand-icons'
import { BalCard, BalCardContent, BalCardTitle, BalIcon, BalStack, BalText } from '@baloise/ds-react'

import type { ProductKey } from '../../data/policies'

interface Product {
  key: ProductKey
  label: string
  teaser: string
  svg: string
}

const products: Product[] = [
  {
    key: 'hausrat',
    label: 'Hausrat',
    teaser: 'Möbel, Elektronik und persönliche Gegenstände gegen Wasser, Feuer und Diebstahl.',
    svg: balBrandIconHomeContentsGreen,
  },
  {
    key: 'haftpflicht',
    label: 'Privathaftpflicht',
    teaser: 'Schäden, die Sie oder Ihre Familie Dritten versehentlich zufügen.',
    svg: balBrandIconLiabilityPurple,
  },
  {
    key: 'motorfahrzeug',
    label: 'Motorfahrzeug',
    teaser: 'Kollision, Diebstahl und Naturereignisse für Ihr Fahrzeug.',
    svg: balBrandIconMotorvehicleTangerine,
  },
]

/*
  Markenicons aus @baloise/ds-brand-icons, eingebunden wie von der Doku
  vorgeschrieben: als importierte SVG-Konstante über das svg-Prop von bal-icon,
  mit color="auto" — die Icons sind mehrfarbige Illustrationen und sollen ihre
  eigenen Farben behalten statt von bal-icon auf eine Flächenfarbe reduziert zu
  werden, wie es bei den einfarbigen @baloise/ds-icons der Fall wäre.
*/
export function ProductTiles() {
  return (
    <BalStack layout="horizontal" space="medium" alignment="top start">
      {products.map(product => (
        <BalCard key={product.key} fullheight>
          <BalCardTitle>{product.label}</BalCardTitle>
          <BalCardContent>
            <BalStack layout="vertical" space="small" align="center">
              <BalIcon svg={product.svg} color="auto" size="xx-large" />
              <BalText size="small" space="none">
                {product.teaser}
              </BalText>
            </BalStack>
          </BalCardContent>
        </BalCard>
      ))}
    </BalStack>
  )
}
