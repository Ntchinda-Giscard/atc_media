import AppActions from '@/components/AppActions'
import { IDropdownItems, IMediaPlaylist } from '@/constant/interphase'
// import { convertArrayOfFilesToString } from '@/lib/utils'
import React from 'react'

interface PlayListListItemProps {
  actions: IDropdownItems[],
  playlist: IMediaPlaylist,
}

function PlayListListItem({
  actions,
  playlist
}: PlayListListItemProps) {
  return (
    <div className='bg-[var(--card-bg)] rounded-[10px] px-6 py-4 mb-4 flex items-center justify-between'>
      <div className='flex-1'>
        <div className='font-normal text-[20px] text-[var(--black)]'>{playlist.name}</div>
        <div className='font-normal text-[16px] text-[var(--action-text-color)]'>
          {/* {convertArrayOfFilesToString(playlist.files)} · Durée totale : */}
           Durée totale :
          <span className='text-[var(--primary-color)] ml-2'>{playlist.duration}</span>
        </div>
      </div>
      <AppActions actions={actions} />
    </div>
  )
}

export default PlayListListItem