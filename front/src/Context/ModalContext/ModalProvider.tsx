import { ReactNode, useState } from "react"
import { ModalContext } from "./ModalContext"

interface Props {
  children: ReactNode
}

export const ModalProvider = ({ children }: Props) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalId: string) => setActiveModal(modalId);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
} 
