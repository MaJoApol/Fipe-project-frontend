'use client';


import Image from "next/image";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

export default function Header() {

  const isMobile = useMediaQuery({maxWidth: 768})

  return (
    !isMobile ? (
    <div className="flex justify-center" >
        <div className="flex bg-[#0D3164] w-screen items-center justify-between" >
            <Link href="/">
                <Image width={80} height={80} src="/headerLogin.png" alt="" />
            </Link>
            <Link href="/auth">
                <FiUser className="scale-200 text-[#CFDDF4] mr-10"/>
            </Link>                 
        </div>
    </div>
    ) : (

    <div className="flex justify-center" >
      <div className="flex bg-[#0D3164] w-screen items-center justify-between" >
          <Link href="/">
              <Image width={70} height={70} src="/headerLogin.png" alt="" />
          </Link>
          <Link href="/auth">
              <FiUser className="scale-180 text-[#CFDDF4] mr-10"/>
          </Link>                 
      </div>
  </div>
  ) 
    
  );
}
