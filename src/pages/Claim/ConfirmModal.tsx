import { useEffect, useRef, type ComponentRef } from 'react'
import {
  BalButton,
  BalButtonGroup,
  BalModal,
  BalModalBody,
  BalModalHeader,
  BalText,
} from '@baloise/ds-react'

interface Props {
  open: boolean
  claimKind: string
  fileCount: number
  onDismiss: () => void
  onConfirm: () => void
}

export function ConfirmModal({ open, claimKind, fileCount, onDismiss, onConfirm }: Props) {
  const modalRef = useRef<ComponentRef<typeof BalModal>>(null)

  /**
   * bal-modal kennt kein deklaratives Prop zum Öffnen. open()/close() arbeiten mit den
   * vorhandenen Kindern; present() erwartet dagegen ein component-Prop oder einen
   * Framework-Delegate und wirft sonst «framework delegate is missing».
   */
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) {
      return
    }
    if (open) {
      void modal.open()
    } else {
      void modal.close()
    }
  }, [open])

  return (
    <BalModal
      ref={modalRef}
      space="medium"
      isClosable
      backdropDismiss
      modalWidth={520}
      onBalModalDidDismiss={onDismiss}
    >
      <BalModalHeader>Schaden einreichen</BalModalHeader>
      <BalModalBody>
        <BalText space="bottom">
          Der Schaden vom Typ «{claimKind}» wird mit {fileCount}{' '}
          {fileCount === 1 ? 'Beleg' : 'Belegen'} übermittelt. Nach dem Einreichen sind
          Änderungen nur noch schriftlich möglich.
        </BalText>
        <BalButtonGroup position="right">
          <BalButton color="text" onBalClick={onDismiss}>
            Abbrechen
          </BalButton>
          <BalButton color="danger" onBalClick={onConfirm}>
            Verbindlich einreichen
          </BalButton>
        </BalButtonGroup>
      </BalModalBody>
    </BalModal>
  )
}
