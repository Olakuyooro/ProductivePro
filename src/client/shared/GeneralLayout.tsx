import React, { ReactNode } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

interface GeneralLayoutProps {
  children: ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <div className={`p-5 w-full h-screen flex space-x-9 ${poppins.className}`}>
      <SideBar />
      {children}
    </div>
  );
};

export default GeneralLayout;
