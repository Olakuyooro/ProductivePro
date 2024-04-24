import React, { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Check if the click event originated from the backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div onClick={handleCloseModal} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
