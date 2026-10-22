import type { ReactNode } from 'react'
import {
  BalCard,
  BalCardContent,
  BalCardSubtitle,
  BalCardTitle,
  BalDivider,
  BalStack,
  BalText,
} from '@baloise/ds-react'

interface Props {
  tag: string
  title: string
  /** Begründung, falls Props bewusst keine Kachel bekommen. */
  omitted?: string
  children: ReactNode
}

export function ShowcaseSection({ tag, title, omitted, children }: Props) {
  return (
    <BalCard id={tag} className="mb-large">
      <BalCardTitle>{title}</BalCardTitle>
      <BalCardSubtitle>{tag}</BalCardSubtitle>
      <BalCardContent>
        <BalDivider space="small" color="grey-light" />

        <BalStack layout="vertical" space="small">{children}</BalStack>

        {omitted && (
          <BalText size="small" color="grey" space="top">
            Ohne Kachel: {omitted}
          </BalText>
        )}
      </BalCardContent>
    </BalCard>
  )
}
