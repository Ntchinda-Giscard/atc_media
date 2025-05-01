import { AppImage } from '@/assets/images';
import { AppModalContainer } from '@/components/AppModalContainer'
import { IMediaFiles } from '@/constant/interphase';
import Image from 'next/image';
import React from 'react'

interface PreviewFileModalProps {
    isOpen: boolean;
    onClose: () => void;
    file: IMediaFiles
}

function PreviewFileModal({
    isOpen,
    onClose,
    file,
}: PreviewFileModalProps) {
    const fileUrl = encodeURIComponent(file.path ?? "");

    return (
        <AppModalContainer isOpen={isOpen} onClose={onClose} title={file.name} >
            {
                file.type == "image" &&
                <div className='col-center h-[70vh]'>
                    <Image
                        src={file.path ? file.path : AppImage.TestImage}
                        alt=''
                        width={800}
                        height={600}
                        layout="intrinsic"
                    />
                </div>
            }
            {
                (file.type == "url" || file.type == "document") &&
                <div className='col-center h-[70vh]'>
                    <iframe
                        src={file.type == "document" ? `https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}` : file.url}
                        title={file.name}
                        width="100%"
                        height="600px"
                        style={{ border: '1px solid #ccc' }}
                    />
                </div>
            }
            {
                file.type == "video" &&
                <div className='col-center h-[70vh]'>
                    <video
                        width="100%"
                        height="auto"
                        controls
                        autoPlay
                        muted
                        loop
                    >
                        <source src={file.path} type={file.metadata?.mime_type} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            }
        </AppModalContainer>
    )
}

export default PreviewFileModal