import OptionDropdown from '@/components/OptionDropdown'
import { IDropdownItems, IMediaPlaylist } from '@/constant/interphase'
import React from 'react'

interface PlayListGridItemProps {
  options: IDropdownItems[],
  playlist: IMediaPlaylist,
}

function PlayListGridItem({ options, playlist }: PlayListGridItemProps) {
  return (
    <div className='bg-[var(--card-bg)] rounded-[10px] px-6 py-4 flex mb-4 flex-col items-center justify-between gap-4'>
      <div className='flex items-center justify-between w-full'>
        <div className='font-normal text-[20px] text-[var(--black)]'>{playlist.name}</div>
        <OptionDropdown
          options={options}
        />
      </div>
      <div className='border rounded-[10px] w-full'>
        {
          playlist.files.map((file, index) => {
            let icon = '🎬'
            switch (file.type) {
              case 'IMAGE':
                icon = '🖼️'
                break;
              case 'WEB':
                icon = '🌐'
                break;
              default:
                break;
            }
            return (<div className={`p-4 ${index != playlist.files.length - 1 ? ' border-b' : ''}`}>{icon} {file.name}</div>)
          })
        }
      </div>
    </div>
  )
}

export default PlayListGridItem