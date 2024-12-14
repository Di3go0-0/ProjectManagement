import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { useModal } from "../../../Context";
import './Modal.css'

interface Props {
  children: ReactNode;
  modalId: string;
}

export const Modal = ({ children, modalId }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { activeModal, closeModal } = useModal();

  const modalRoot = document.getElementById("modal")

  if (activeModal !== modalId || !modalRoot) return null;

  return createPortal(
    <>
      <div className="overlay" onClick={closeModal}>
        <div className="modal" ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
    , modalRoot)
}
