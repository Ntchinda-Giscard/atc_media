import { ChevronDown, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import React from 'react'
import AppActions from './AppActions'
import { IDropdownItems } from '@/constant/interphase'
import Image from 'next/image'
import { AppImage } from '@/assets/images'

interface FileGridDisplayProps {
    fileAcation: IDropdownItems[]
}

const FileGridDisplay = ({ fileAcation }: FileGridDisplayProps) => {
    return (
        <div>
            <div className='flex w-full gap-4 pb-2 mb-2 overflow-x-auto'>
                {[...Array(7)].map((_, index) => (
                    <div
                        key={index}
                        className='w-[250px] h-[210px] bg-[var(--card-bg)] rounded-[40px] relative col-center flex-shrink-0'
                    >
                        {/* <Link size={100} /> */}
                        <Play size={100} />
                        <Image
                            src={AppImage.TestImage}
                            alt=''
                            className='w-full h-full rounded-[40px]'
                        />
                        <div className='absolute bottom-0 w-full bg-[#ffffff90] rounded-b-[40px] p-2'>
                            <AppActions actions={fileAcation} id={1} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative">
                <div className="absolute gap-3 col-center">
                    <div className="text-[var(--title-color)] font-normal text-[13px]">
                        Montrer
                    </div>
                    <div className="text-[var(--title-color)] border border-[var(--fadded-border)] rounded-[5px] col-center gap-2 font-medium text-[15px] py-2 px-3">
                        3
                        <ChevronDown color="var(--title-color)" size={18} />
                    </div>
                </div>
                <div className="flex gap-3 h-14 col-center">
                    <div className="bg-[var(--secondary-background)] h-[34px] w-[34px] rounded-[5px] col-center cursor-pointer">
                        <ChevronLeft size={15} color="var(--fadded-icon)" />
                    </div>
                    <div className="bg-[var(--primary-color)] h-[34px] w-[34px] rounded-[5px] text-[13px] text-[var(--white)] col-center">
                        1
                    </div>
                    <div className="bg-[var(--secondary-background)] h-[34px] w-[34px] rounded-[5px] col-center cursor-pointer">
                        <ChevronRight size={15} color="var(--fadded-icon)" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileGridDisplay