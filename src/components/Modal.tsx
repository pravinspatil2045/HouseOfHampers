import * as Dialog from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import type { ReactNode, RefObject } from 'react'

interface ModalProps {
  title: string
  description: string
  children: ReactNode
  close: () => void
  returnFocus: RefObject<HTMLElement | null>
  className?: string
}
export function Modal({ title, description, children, close, returnFocus, className = '' }: ModalProps) {
  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) close() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content
          className={`modal ${className}`}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            const target = returnFocus.current
            if (target?.isConnected) target.focus()
            else document.querySelector<HTMLButtonElement>('[data-bag-trigger]')?.focus()
          }}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Description className="sr-only">{description}</Dialog.Description>
          <Dialog.Close className="icon-button modal-close" aria-label="Close dialog"><X /></Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
