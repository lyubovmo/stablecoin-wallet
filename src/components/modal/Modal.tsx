import React from 'react';
import styles from './styles.module.scss';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <div className={`${styles.modal} ${isOpen && styles.shown}`}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.body}>
        <div className={styles.content}>
          {children}
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
