import OptionDropdown from '@/components/OptionDropdown'
import { IDropdownItems, IMediaFolders } from '@/constant/interphase'
import React from 'react'

interface FolderGridItemProp {
  folder: IMediaFolders,
  options: IDropdownItems[]
}

function FolderGridItem({ folder, options }: FolderGridItemProp) {
  return (
    <div className='min-h-[150px] bg-[var(--card-bg)] rounded-[10px] px-4 py-4 flex flex-col justify-between'>
      <div>
        <div className='bg-[var(--card-bg)] rounded-[10px] flex items-center justify-between mb-1'>
          <div className='font-normal text-[20px] text-[var(--black)]'>
            📂 {folder.name}
          </div>
          <OptionDropdown
            options={options}
            id={folder.id}
          />
        </div>
        <div className='font-normal text-[13px] text-[var(--title-color)]'>
          {folder.children?.length ?? 0} élément(s)
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