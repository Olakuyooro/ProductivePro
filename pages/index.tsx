import Image from "next/image";
import { Inter } from "next/font/google";
import LandingPage from "@/src/client/components/LandingPage";
import withAuth from "@/src/client/shared/withAuth";


const inter = Inter({ subsets: ["latin"] });

const Home = ()=> {
  return (
    <main>
     <LandingPage/>
    </main>
  );
}

export default withAuth(Home)
