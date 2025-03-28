'use client';

import { UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Header() {

  return (
    <div className="flex justify-center" >
        <div className="flex bg-[#0D3164] w-screen h-20 items-center justify-between" >
            <Link href="/">
                <img src="logo.png" alt="" className="h-20"/>
            </Link>
            <Link href="/auth">
                <UserIcon className="w-13 text-[#CFDDF4] mr-10"/>
            </Link>                 
        </div>
    </div>
  );
}
