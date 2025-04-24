'use client';
import { Bell, Globe, Menu, Search } from 'lucide-react'
import React from 'react'
import SearchBar from './SearchBar'
import { useApp } from '@/contexts/AppContext'
import APPIMAGES from '@/assets/images/index'
import Image from 'next/image';

function NavBar() {
  const { setShowSideBar, showSideBar } = useApp();
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[var(--white)] border-b border-[var(--light-gray-background)]">
      <div className='inline cursor-pointer lg:hidden' onClick={() => setShowSideBar(!showSideBar)}>
        <Menu color={showSideBar ? 'var(--primary-color)' : 'var(--black)'} />
      </div>
      <div className='w-full lg:w-[400px] mx-3'>
        <SearchBar
          placeholder="Rechercher"
        />
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-700 lg:gap-6">
        <div className='items-center justify-center hidden gap-2 md:flex'>
          <Image src={APPIMAGES.FRENCH_FLAG} className='w-[20px] h-[20px]' alt='french flag' />
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66671 0.689942L9.54325 0.689941C11.2026 0.689941 12.1402 2.59413 11.1285 3.90937L7.69023 8.37912C6.88964 9.41989 5.32032 9.41989 4.51973 8.37912L1.08146 3.90936C0.0697375 2.59413 1.00736 0.689942 2.66671 0.689942Z" fill="#414141" />
          </svg>
        </div>
        <button className="relative">
          <Bell size={23} />
          <span className="absolute top-[-3px] right-0 w-[15px] h-[15px] bg-[var(--primary-color)] rounded-full" />
        </button>
        <div className="flex-col items-center justify-center hidden md:flex">
          <span className="text-[14px] text-[var(--title-color)] font-bold whitespace-nowrap">GMP TEST</span>
          <span className="text-[8px] text-[var(--primary-color)] font-normal whitespace-nowrap">0.5 Mo / 20 Go (9%)</span>
        </div>
        <div className='gap-1 cursor-pointer col-center'>
          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-[var(--white)] bg-[var(--primary-color)] rounded-full">
            G
          </div>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66671 0.689942L9.54325 0.689941C11.2026 0.689941 12.1402 2.59413 11.1285 3.90937L7.69023 8.37912C6.88964 9.41989 5.32032 9.41989 4.51973 8.37912L1.08146 3.90936C0.0697375 2.59413 1.00736 0.689942 2.66671 0.689942Z" fill="#414141" />
          </svg>
        </div>
      </div>
    </header>
  )
}

export default NavBar