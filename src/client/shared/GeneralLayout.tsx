import React, { ReactNode, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import { Poppins } from "next/font/google";
import { MdMenu } from "react-icons/md";
import Modal from "./modal/Modal";
import SideBarModal from "./modal/SideBarModal";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/src/helper/api/getProfile.api";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface GeneralLayoutProps {
  children: ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  const [sideBarState, setSideBarState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const hamburgerFunction = () => {
    setSideBarState(!sideBarState);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const {
    isLoading,
    isError,
    data: username,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });


  return (
    <div
      className={`p-5 w-full h-screen flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-9 ${poppins.className}`}
    >
      <div className="flex flex-col">
        <MdMenu
          onClick={hamburgerFunction}
          className="text-xl block md:hidden"
        />
        <div
          className={`${sideBarState == false ? "hidden" : "block"} md:block`}
        >
          <div className="hidden md:block">
           <p className="text-sm mb-2">{username}</p> 
            <SideBar />
          </div>
          <SideBarModal onClose={closeModal} isOpen={modalOpen}>
            <SideBar />
          </SideBarModal>
        </div>
      </div>
      {children}
    </div>
  );
};

export default GeneralLayout;
