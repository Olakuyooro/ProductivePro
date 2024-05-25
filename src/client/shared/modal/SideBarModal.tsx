import React, { FC, ReactNode } from 'react';

interface SideBarModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SideBarModal: FC<SideBarModalProps> = ({ isOpen, onClose, children }) => {
  const handleCloseSideBarModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Check if the click is on the backdrop (overlay)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleCloseSideBarModal}
      className="fixed inset-0 flex md:hidden  bg-black bg-opacity-50 z-10"
    >
      <div className="SideBarModal-content bg-white p-4 rounded">
        {children}
      </div>
    </div>
  );
};

export default SideBarModal;
