import React, { ReactNode } from 'react'

interface RapidActionButtonProps {
    onClick: () => void;
    primarIcon: string;
    secondaryIcon: ReactNode;
    title: string;
    subtitle: string;
}

const RapidActionButton = ({ onClick, primarIcon, secondaryIcon, title, subtitle }: RapidActionButtonProps) => {
    return (
        <div className='px-4 py-2 border border-[var(--primary-color)] cursor-pointer rounded-[10px] flex gap-2 justify-between items-center' onClick={onClick}>
            <div className='text-[30px]'>
                {primarIcon}
            </div>
            <div>
                <div className='text-[var(--title-color)] font-normal text-[14px]'>{title}</div>
                <div className='text-[var(--action-text-color)] font-normal text-[13px]'>{subtitle}</div>
            </div>
            {secondaryIcon}
        </div>
    )
}

export default RapidActionButton