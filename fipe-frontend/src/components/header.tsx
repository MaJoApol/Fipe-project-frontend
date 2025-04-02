'use client';


import Link from "next/link";
import { FiUser } from "react-icons/fi";

export default function Header() {

  return (
    <div className="flex justify-center" >
        <div className="flex bg-[#0D3164] w-screen items-center justify-between" >
            <Link href="/">
                <img src="logo.png" alt="" className="h-20"/>
            </Link>
            <Link href="/auth">
                <FiUser className="scale-200 text-[#CFDDF4] mr-10"/>
            </Link>                 
        </div>
    </div>
  );
}
