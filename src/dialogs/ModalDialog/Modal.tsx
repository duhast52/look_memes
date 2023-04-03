import React, { ReactElement } from "react";
import closeIcon from "src/assets/images/close.svg";
import styles from "./Modal.module.scss";

interface ModalProps {
  visible: boolean;
  content: ReactElement | string;
  onClose: () => void;
  isForgot?: boolean;
  isCloseIcon?: boolean;
}

export function Modal({ isCloseIcon = true, visible = false, content = "", onClose }: ModalProps): JSX.Element | null {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
        break;
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  if (!visible) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modal__dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal__body}>
          {isCloseIcon && (
            <span className={styles.modal__close} onClick={onClose}>
              <img src={closeIcon} alt="close" />
            </span>
          )}
          {content}
        </div>
      </div>
    </div>
  );
}
