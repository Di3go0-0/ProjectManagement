import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { useModal } from "../../../Context";
import './Modal.css'

interface Props {
  children: ReactNode
}

export const Modal = ({ children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { state, setState } = useModal();

  const modalRoot = document.getElementById("modal")

  const closeModal = () => {
    setState(false);
  }

  if (!state || !modalRoot) return null;

  return createPortal(
    <>
      <div className="overlay" onClick={closeModal}>
        <div className="modal" ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button onClick={closeModal} className="close-button">Close</button>
        </div>
      </div>
    </>
    , modalRoot)
}
