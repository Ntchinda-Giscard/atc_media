import AppActions from '@/components/AppActions'
import { IDropdownItems, IMediaPlaylist } from '@/constant/interphase'
import { formatTotalDuration } from '@/lib/utils'
// import { convertArrayOfFilesToString } from '@/lib/utils'
import React from 'react'

interface PlayListListItemProps {
    actions: IDropdownItems[],
    playlist: IMediaPlaylist,
}

function PlayListListItem({
    actions,
    playlist,
}: PlayListListItemProps) {
    console.log("media_files", playlist)
    return (
        <div className='bg-[var(--card-bg)] rounded-[10px] px-6 py-4 mb-4 flex items-center justify-between'>
            <div className='flex-1'>
                <div className='font-normal text-[20px] text-[var(--black)] cursor-pointer' onClick={() => actions[0]?.onClick && actions[0]?.onClick(playlist.id)}>{playlist.name}</div>
                <div className='font-normal text-[16px] text-[var(--action-text-color)]'>
                    Durée totale :
                    <span className='text-[var(--primary-color)] ml-2'>{formatTotalDuration(playlist.media_files ?? [])}</span>
                </div>
            </div>
            <AppActions actions={actions} id={playlist.id} />
        </div>
    )
}

export default PlayListListItem