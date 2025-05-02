import AppButton from '@/components/AppButton';
import AppCheckbox from '@/components/AppCheckbox';
import { AppModalContainer } from '@/components/AppModalContainer'
import FileGridDisplay from '@/components/FileGridDisplay';
import { IMediaFiles } from '@/constant/interphase';
import { useFile } from '@/contexts/FileContex';
import { Skeleton } from '@mantine/core';
import { RefreshCw } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface SelectMediaFilesModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedFiles: IMediaFiles[];
    setSelectedFiles: Dispatch<SetStateAction<IMediaFiles[]>>
}

function SelectMediaFilesModal({
    isOpen,
    onClose,
    selectedFiles,
    setSelectedFiles,
}: SelectMediaFilesModalProps) {
    const {
        files,
        getAllProjectFiles,
        isLoadingFiles,
        hasLoaded
    } = useFile();


    useEffect(() => {
        if (!hasLoaded && isOpen) {
            getAllProjectFiles();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const selectFile = (file: IMediaFiles) => {
        const isSelected: boolean = selectedFiles.some(f => f.id == file.id)
        if (isSelected) {
            setSelectedFiles(selectedFiles.filter(f => f.id != file.id))
        } else {
            setSelectedFiles([...selectedFiles, file])
        }
    }


    return (
        <AppModalContainer isOpen={isOpen} onClose={onClose} title="Selectioner des projets" big
            iconClick={() => getAllProjectFiles()}
            icon={<RefreshCw size={40} />}
        >
            <div className='flex flex-col max-h-[70vh] gap-6 overflow-auto'>
                {
                    isLoadingFiles ?
                        <>
                            <Skeleton height={300} />
                        </>
                        :
                        <div>
                            <div className="flex flex-wrap justify-around gap-5 mb-5">
                                {
                                    files.map(file => {
                                        const isSelected: boolean = selectedFiles.some(f => f.id == file.id)
                                        return (
                                            <div key={file.id} className='cursor-pointer' onClick={() => selectFile(file)}>
                                                <div className={`${isSelected ? 'opacity-30' : null}`}>
                                                    <FileGridDisplay file={file} />
                                                </div>
                                                <div className='flex'>
                                                    <AppCheckbox
                                                        isChecked={isSelected}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                }
            </div>
            <div className='mt-5 col-center'>
                <AppButton
                    onClick={() => {
                        onClose();
                    }}
                    text='Ajouter'
                    big
                />
            </div>
        </AppModalContainer>
    )
}

export default SelectMediaFilesModal