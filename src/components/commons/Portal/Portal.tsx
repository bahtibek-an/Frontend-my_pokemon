import { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

const supportsPortal = typeof ReactDOM.createPortal === "function";
const modalRoot = document.body as HTMLElement;

export default function Portal({ children }: { children: React.ReactNode }) {
  const container = useMemo(() => {
    const elem: HTMLElement = document.createElement("div");
    elem.setAttribute("pokemon-portal", "");
    return elem;
  }, []);

  useEffect(() => {
    modalRoot.appendChild(container);
    return () => {
      modalRoot.removeChild(container);
    };
  }, [container]);

  if (supportsPortal && container) {
    return ReactDOM.createPortal(children, container);
  }

  return null;
}
