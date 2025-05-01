import { Ban, BookText, Link, Play } from 'lucide-react'
import React from 'react'
import AppActions from './AppActions'
import { IDropdownItems, IMediaFiles } from '@/constant/interphase'
import Image from 'next/image'
import { AppImage } from '@/assets/images'
import { useFile } from '@/contexts/FileContex'
import { app_notification } from '@/app/dashboard/utils/notification-center'

interface FileGridDisplayProps {
    file: IMediaFiles;
}

const FileGridDisplay = ({ file }: FileGridDisplayProps) => {
    const {
        files,
        setFileToPreview
    } = useFile()
    const fileAction: IDropdownItems[] = [{
        icon: "👁️",
        onClick: (id?: number) => {
            const file: IMediaFiles | undefined = files.find(f => f.id == id);
            if (!file) {
                app_notification({
                    message: "this file doesn't exist"
                })
                return
            }
            setFileToPreview(file);
        }
    }];

    return (
        <div
            className='w-[250px] h-[210px] bg-[var(--card-bg)] rounded-[40px] relative col-center flex-shrink-0 border'
        >
            {
                file?.type == "url" ?
                    <Link size={100} />
                    :
                    file?.type == "video" ?
                        <Play size={100} />
                        :
                        file?.type == "image" ?
                            <Image
                                src={file.path ? file.path : AppImage.TestImage}
                                alt=''
                                className='w-full h-full rounded-[40px]'
                                fill
                            />
                            :
                            file?.type == "document" ?
                                <BookText size={100} />
                                :
                                <Ban size={100} />
            }
            <div className='absolute bottom-0 w-full bg-[#ffffff90] rounded-b-[40px] p-2'>
                <AppActions actions={fileAction} id={file.id} />
            </div>
            <div className='absolute top-0 w-full bg-[#ffffff90] rounded-t-[40px] p-2 text-center'>
                {file.name}
            </div>
        </div>

    )
}

export default FileGridDisplay