import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import { AppModalContainer } from '@/components/AppModalContainer'
import { useMedia } from '@/contexts/MediaContex';
import React, { useEffect, useState } from 'react'
import { app_notification } from '../../utils/notification-center';

interface RenameFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function RenameFolderModal({
    isOpen,
    onClose,
}: RenameFolderModalProps) {
    const { folderToRename, renameFolder, folders, setFolderToRename } = useMedia();
    const [name, setName] = useState<string>(folderToRename?.name ?? "")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        if (folderToRename?.name) {
            setName(folderToRename?.name)
        }
    }, [folderToRename])

    const onFolderRename = async () => {
        try {
            if (name.length == 0) {
                app_notification({
                    message: "Vous devriez ajouter un nom de dossier."
                })
                return
            }
            if (folders.some(folder => folder.name == name)) {
                app_notification({
                    message: "Ce nom de dossier a déjà été utilisé."
                })
                return
            }
            setIsLoading(true);
            const renameResponse: boolean = await renameFolder(name);
            setIsLoading(false);

            if (renameResponse) {
                setFolderToRename(null);
            } else {
                app_notification({
                    message: "Could not rename folder"
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
        <AppModalContainer isOpen={isOpen} onClose={onClose} title="Renommer le dossier" subtitle="Promotions Avril">
            <div className='flex flex-col gap-6'>
                <AppInput
                    label='Nom du dossier'
                    secondary
                    value={name}
                    setValue={setName}
                />
                <div className='flex items-center justify-center'>
                    <AppButton
                        onClick={onFolderRename}
                        text='enregistrer les modifications'
                        big
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </AppModalContainer>
    )
}

export default RenameFolderModal