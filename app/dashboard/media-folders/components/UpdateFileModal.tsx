import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import { AppModalContainer } from '@/components/AppModalContainer'
import { useMedia } from '@/contexts/MediaContex';
import React, { useEffect, useState } from 'react'
import { app_notification } from '../../utils/notification-center';

interface UpdateFileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function UpdateFileModal({
    isOpen,
    onClose,
}: UpdateFileModalProps) {
    const { updateFileInFolder, fileToUpdate, folderToView } = useMedia();
    const [name, setName] = useState<string>(fileToUpdate?.name ?? "")
    const [duration, setDuration] = useState<string>(fileToUpdate?.duration.toString() ?? "")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        if (fileToUpdate?.name) {
            setName(fileToUpdate?.name)
            setDuration(fileToUpdate?.duration.toString())
        }
    }, [fileToUpdate])

    const onFileUpdate = async () => {
        try {
            if (name.length == 0) {
                app_notification({
                    message: "Vous devriez ajouter un nom du fichier."
                })
                return
            }
            if (duration.length == 0) {
                app_notification({
                    message: "Vous devriez ajouter une duree."
                })
                return
            }
            if (folderToView?.files.some(file => file.name == name)) {
                app_notification({
                    message: "Ce nom de fichier a déjà été utilisé."
                })
                return
            }
            setIsLoading(true);
            const updateResponse: boolean = await updateFileInFolder(name, Number(duration));
            setIsLoading(false);

            if (updateResponse) {

            } else {
                app_notification({
                    message: "Could not update file"
                })
            }
        } catch (error) {
            console.log(error)
            app_notification({
                message: "An error occure"
            })
        }
    }
    return (
        <AppModalContainer isOpen={isOpen} onClose={onClose} title="Modifier le fichier " subtitle={fileToUpdate?.name}>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-6 md:flex-row'>
                    <AppInput
                        label='Nom du fichier'
                        secondary
                        value={name}
                        setValue={setName}
                    />
                    <AppInput
                        label='Duree du fichier'
                        secondary
                        value={duration}
                        setValue={setDuration}
                        type='number'
                    />

                </div>
                <div className='flex items-center justify-center'>
                    <AppButton
                        onClick={onFileUpdate}
                        text='Enregistrer'
                        big
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </AppModalContainer>
    )
}

export default UpdateFileModal