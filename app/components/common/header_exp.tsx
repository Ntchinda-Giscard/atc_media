"use client"
import React, { useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { home_links } from '../links';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react';
import logo from "@/public/assets/top_bar_logo.svg";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800">
            <Image src={logo} alt="logo" width={100} height={100} />
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex md:hidden block flex-row items-center"> 
            <div>🇫🇷 FR</div>
              <ChevronDown />
            </div>
            <button
              className="md:hidden text-gray-800 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Hamburger icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
        </div>
        
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center flex md:flex-row gap-3 flex-col`}>
            {
                home_links?.map((h) =>(
                    <Link
                        key={h?.route} 
                        className={pathname === h?.route ? "text-red-600 text-sm" : "text-sm hover:text-red-600"}
                        href={h?.route}> 
                        {h?.label} 
                    </Link>
                ))
            }
            <div className={` ${isOpen ? 'block' : 'hidden'} flex flex-col md:flex-row gap-2`} >
          <div className="flex hidden md:block flex-row items-center"> 
              <div>🇫🇷 FR</div>
              <ChevronDown />
          </div>
          <Button asChild className="hover:bg-transparent hover:text-inherit r-2 bg-red-600 px-6 py-1 rounded-xl shadow-lg shadow-red-500/50 hover:shadow-none hover:ring-2"> 
              <Link href={"/auth/login"} > Se Connecter  </Link>
          </Button> 
        </div>
      </div>
          <div className="flex gap-2 hidden md:block flex-row items-center"> 
            <div>🇫🇷 FR</div>
            <ChevronDown />
            <Button asChild className="  hover:bg-transparent hover:text-inherit r-2 bg-red-600 px-6 py-1 rounded-xl shadow-lg shadow-red-500/50 hover:shadow-none hover:ring-2"> 
              <Link href={"/auth/login"} > Se Connecter  </Link>
            </Button> 
          </div>
          
      
       
      
    </nav>
  );
};

export default Header;