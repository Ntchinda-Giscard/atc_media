import OptionDropdown from '@/components/OptionDropdown'
import { IDropdownItems, IMediaFolders } from '@/constant/interphase'
import { convertArrayOfFilesToString } from '@/lib/utils';
import React from 'react'

interface FolderGridItemProp {
  folder: IMediaFolders,
  options: IDropdownItems[]
  onClick?: () => void;
}

function FolderGridItem({ folder, options, onClick }: FolderGridItemProp) {
  return (
    <div className='min-h-[150px] bg-[var(--card-bg)] rounded-[10px] px-4 py-4 flex flex-col justify-between' >
      <div>
        <div className='bg-[var(--card-bg)] rounded-[10px] flex items-center justify-between mb-1'>
          <div className='font-normal text-[20px] text-[var(--black)] cursor-pointer' onClick={onClick}>
            📂 {folder.name}
          </div>
          <OptionDropdown
            options={options}
            id={folder.id}
          />
        </div>
        <div className='font-normal text-[13px] text-[var(--title-color)]'>
          {convertArrayOfFilesToString(folder)}
        </div>
      </div>
      <div className='font-normal text-[16px] text-[var(--primary-color)]'>
        {/* {folder.shared.length > 0 ? '🔗 Partagé' : '🔒 Privé'} */}
        {'🔒 Privé'}
      </div>
    </div>
  )
}

export default FolderGridItem