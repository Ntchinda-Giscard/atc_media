import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import { AppModalContainer } from '@/components/AppModalContainer'
import { IMediaFolders } from '@/constant/interphase';
import { useMedia } from '@/contexts/MediaContex';
import React, { useState } from 'react';
import { app_notification } from '../../utils/notification-center';


interface AddNewFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentFolder?: IMediaFolders;
}

function AddNewFolderModal({
    isOpen,
    onClose,
    currentFolder,
}: AddNewFolderModalProps) {
    const { folders, addFolder } = useMedia();
    const [folderName, setFolderName] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onCreateFolder = async () => {
        try {
            if (folderName.length == 0) {
                app_notification({
                    message: "Vous devriez ajouter un nom de dossier."
                })
                return
            }
            if (folders.some(folder => folder.name == folderName)) {
                app_notification({
                    message: "Ce nom de dossier a déjà été utilisé."
                })
                return
            }
            setIsLoading(true);
            const addResponse: boolean = await addFolder({
                name: folderName,
                parent_id: currentFolder ? currentFolder.id : null
            });
            setIsLoading(false);
            if (addResponse) {
                setFolderName('');
                onClose();
            } else {
                app_notification({
                    message: "Could not add folder"
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
        <AppModalContainer isOpen={isOpen} onClose={onClose} title={currentFolder ? `Créer un nouveau dossier  ${currentFolder && 'dans'} ${currentFolder?.name} ` : `Créer un nouveau dossier`} >
            <div className='flex flex-col gap-6'>
                <div>
                    <AppInput
                        label='Nom du dossier'
                        secondary
                        value={folderName}
                        setValue={(e) => setFolderName(e)}
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <AppButton
                        onClick={onCreateFolder}
                        text='Créer le dossier'
                        big
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </AppModalContainer >
    )
}

export default AddNewFolderModal