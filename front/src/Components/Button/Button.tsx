import { ReactNode } from "react";
import './Button.css';

interface Props {
  children: ReactNode;
  parentMethod: () => void;
}

export const Button = ({ children, parentMethod }: Props) => {
  return (
    <button className="custom-button active" onClick={parentMethod}>
      {children}
    </button>
  )
}
