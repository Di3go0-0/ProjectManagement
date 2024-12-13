import { ReactNode, useState } from "react"
import { ModalContext } from "./ModalContext"

interface Props {
  children: ReactNode
}

export const ModalProvider = ({ children }: Props) => {
  const [state, setState] = useState(false)


  return (
    <ModalContext.Provider value={{ state, setState }}>
      {children}
    </ModalContext.Provider>
  )
} 
