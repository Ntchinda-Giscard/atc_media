"use client"
import React, { useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { home_links } from '../links';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react';
import logo from "@/public/assets/top_bar_logo.svg";
import Image from "next/image";
import { useCombobox, Combobox, Group } from '@mantine/core';
import { IconTriangleFilled } from '@tabler/icons-react';

const language = [
  '🇫🇷 FR',
  '🇬🇧 EN'
]

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
          {/* <div className="flex md:hidden block flex-row items-center"> 
            <div>🇫🇷 FR</div>
              <ChevronDown />
          </div> */}
            <LangaugePicker  c='md:hidden block' />
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
      <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center flex md:flex-row gap-8 flex-col`}>
            {
                home_links?.map((h) =>(
                    <Link
                        key={h?.route} 
                        className={pathname === h?.route ? "font-[700] text-[18px] text-red-600 text-base" : "text-[18px] font-[700] text-base hover:text-red-600"}
                        href={h?.route}> 
                        {h?.label} 
                    </Link>
                ))
            }
            <div className={` ${isOpen ? 'block' : 'hidden'} flex flex-col md:flex-row gap-2`} >
          {/* <div className="flex hidden md:block flex-row items-center"> 
              <div>🇫🇷 FR</div>
              <ChevronDown />
          </div> */}
          <LangaugePicker c={'hidden md:block'} />
          <Button asChild className="hover:bg-transparent hover:text-inherit r-2 bg-red-600 px-6 py-1 rounded-xl shadow-lg shadow-red-500/50 hover:shadow-none hover:ring-2"> 
              <Link href={"/auth/login"} > Se Connecter  </Link>
          </Button> 
        </div>
      </div>
      <div className='flex flex-row gap-5'>
        <div className="flex flex-row items-center"> 
              {/* <div className='hidden md:block '>🇫🇷 FR</div>
              <ChevronDown className='hidden md:block ' /> */}
              <LangaugePicker c={'hidden md:block'} />
          </div>
          <Button asChild className=" hidden md:block hover:bg-transparent hover:text-inherit r-2 bg-red-600 px-6 py-1 rounded-xl shadow-lg shadow-red-500/50 hover:shadow-none hover:ring-2"> 
              <Link href={"/auth/login"} > Se Connecter  </Link>
          </Button> 
      </div>
          
      
       
      
    </nav>
  );
};

export default Header;

export function LangaugePicker({c}:{c: string}){
  const [selectedItem, setSelectedItem] = useState<string | null>(language[0])
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = language.map((item) =>(
    <Combobox.Option value={item} key={item}>{item}</Combobox.Option>
  ))
  return(
    <Group className={`flex flex-row ${c}`}>
      <p  className={`text-[18px] font-[400] ${c}`} > {selectedItem} </p>
      <Combobox
        store={combobox}
        width={50}
        onOptionSubmit={(val) =>{
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <IconTriangleFilled className={c} size={12} rotate={'90'}  onClick={() => combobox.toggleDropdown()} />
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options> {options} </Combobox.Options>
        </Combobox.Dropdown>

      </Combobox>

    </Group>
  )

}