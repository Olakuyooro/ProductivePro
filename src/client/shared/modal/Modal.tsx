import React, { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Check if the click is on the backdrop (overlay)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleCloseModal}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
    >
      <div className="modal-content bg-white p-4 rounded">
        {children}
      </div>
    </div>
  );
};

export default Modal;
