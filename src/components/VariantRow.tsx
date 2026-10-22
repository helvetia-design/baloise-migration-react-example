import type { ReactNode } from 'react'
import { BalStack, BalText } from '@baloise/ds-react'

interface Props {
  label: string
  /** Dunkler Grund, damit weisse Varianten überhaupt sichtbar sind. */
  dark?: boolean
  children: ReactNode
}

export function VariantRow({ label, dark, children }: Props) {
  return (
    <BalStack layout="vertical" space="xx-small">
      <BalText size="small" color="grey" space="none">
        {label}
      </BalText>
      <BalStack
        layout="horizontal"
        space="small"
        alignment="top start"
        className={dark ? 'bg-primary p-small' : undefined}
      >
        {children}
      </BalStack>
    </BalStack>
  )
}
