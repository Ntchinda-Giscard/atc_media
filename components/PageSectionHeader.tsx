import React from 'react'
import {
  AlignJustify,
  LayoutGrid,
  PlusCircle
} from 'lucide-react';
import SearchBar from './SearchBar';
import AppButton from './AppButton';

function PageSectionHeader() {
  return (
    <div className="grid items-center grid-cols-2 mb-2 lg:flex lg:gap-3">
      <div className='font-bold text-[30px] flex-1  text-[var(--title-color)]'>🗂 Dossiers</div>
      <div className="flex items-center justify-end gap-2">
        <AlignJustify className="text-red-500 cursor-pointer" />
        <LayoutGrid className="text-gray-500 cursor-pointer" />
      </div>
      <div className='w-full lg:w-[400px] lg:px-3 lg:border-x'>
        <SearchBar
          placeholder="Rechercher un dossier ou un fichier..."
        />
      </div>
      <div className='flex items-center justify-end'>
        <AppButton
          onClick={() => null}
          icon={
            <PlusCircle size={20} className='text-[var(--white)]' />
          }
          text='Nouveau dossier'
        />
      </div>
    </div>
  )
}

export default PageSectionHeader