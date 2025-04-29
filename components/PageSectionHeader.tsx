import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  AlignJustify,
  LayoutGrid,
} from 'lucide-react';
import SearchBar from './SearchBar';
import AppButton from './AppButton';

interface PageSectionHeaderProps {
  title?: string;
  showGrid?: boolean;
  setShowGrid?: Dispatch<SetStateAction<boolean>>;
  actionButtonText?: string;
  actionButtonIcon?: ReactNode;
  actionButtonClick?: () => void;
  hideActionButton?: boolean;
  searchQuery?: string;
  onChangeSearch?: Dispatch<SetStateAction<string>>;
}

function PageSectionHeader({
  title, setShowGrid, showGrid, actionButtonClick, actionButtonIcon, actionButtonText, hideActionButton = false, onChangeSearch, searchQuery
}: PageSectionHeaderProps) {
  return (
    <div className="grid items-center grid-cols-2 mt-2 mb-4 lg:flex lg:gap-3">
      <div className='font-bold text-[30px] flex-1  text-[var(--title-color)]'>{title}</div>
      <div className="flex items-center justify-end gap-2">
        <AlignJustify className={` cursor-pointer ${showGrid ? 'text-[var(--gray-icon)]' : 'text-[var(--primary-color)]'}`} onClick={() => setShowGrid && setShowGrid(false)} />
        <LayoutGrid className={` cursor-pointer ${!showGrid ? 'text-[var(--gray-icon)]' : 'text-[var(--primary-color)]'}`} onClick={() => setShowGrid && setShowGrid(true)} />
      </div>
      {
        searchQuery && onChangeSearch &&
        <div className='w-full lg:w-[400px] lg:px-3 lg:border-x'>
          <SearchBar
            placeholder="Rechercher un dossier ou un fichier..."
            searchQuery={searchQuery}
            onChangeSearch={onChangeSearch}
          />
        </div>
      }
      {
        !hideActionButton && actionButtonClick && actionButtonText &&
        <div className='flex items-center justify-end'>
          <AppButton
            onClick={actionButtonClick}
            icon={actionButtonIcon}
            text={actionButtonText}
          />
        </div>
      }
    </div>
  )
}

export default PageSectionHeader