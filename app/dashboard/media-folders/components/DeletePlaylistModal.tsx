import AppButton from '@/components/AppButton';
import AppCheckbox from '@/components/AppCheckbox';
import { AppModalContainer } from '@/components/AppModalContainer'
import { useMedia } from '@/contexts/MediaContex';
import React, { useState } from 'react'
import { app_notification } from '../../utils/notification-center';

interface DeletePlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function DeletePlaylistModal({
    isOpen,
    onClose,
}: DeletePlaylistModalProps) {
    const { deletePlaylist, setFolderToDelete, playlistToDelete } = useMedia();
    const [confirm, setConfirm] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onDelete = async () => {
        try {
            setIsLoading(true)
            const deleteResponse: boolean = await deletePlaylist();
            setIsLoading(false)
            if (deleteResponse) {
                setFolderToDelete(null);
                setConfirm(false)
            } else {
                app_notification({
                    message: "Could not delete playlist"
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
        <AppModalContainer isOpen={isOpen} onClose={onClose} title="Supprimer la playlist " subtitle={playlistToDelete?.name}>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    <div className='font-normal text-[28px] text-[var(--black)]'>⚠️ Cette action est irréversible. Toutes les données liées à cette playlist seront supprimées.</div>
                    <div className='font-normal text-[20px] text-[var(--title-color)] mt-2'>📁 Cette action est irréversible et sera immédiatement appliquée à tous les fichiers.</div>
                    <div className='flex items-center justify-start gap-3'>
                        <AppCheckbox isChecked={confirm} check={setConfirm} />
                        <div onClick={() => setConfirm(!confirm)} className='cursor-pointer font-light text-[20px]  text-[var(--title-color)]'>Je confirme vouloir supprimer ce dossier définitivement.</div>
                    </div>
                </div>
                {
                    confirm &&
                    <div className='flex items-center justify-center'>
                        <AppButton
                            onClick={onDelete}
                            text='Supprimer'
                            big
                            isLoading={isLoading}
                        />
                    </div>
                }
            </div>
        </AppModalContainer>
    )
}

export default DeletePlaylistModal