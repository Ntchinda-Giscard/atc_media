import AppButton from '@/components/AppButton';
import AppCheckbox from '@/components/AppCheckbox';
import AppInput from '@/components/AppInput';
import { AppModalContainer } from '@/components/AppModalContainer'
import { IMediaFolders } from '@/constant/interphase';
import { useMedia } from '@/contexts/MediaContex';
import React, { useState, KeyboardEvent } from 'react';
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
    const [share, setShare] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userInput, setUserInput] = useState('');
    const [sharedUsers, setSharedUsers] = useState<string[]>([]);

    const addTag = () => {
        const trimmed = userInput.trim();
        if (trimmed && !sharedUsers.includes(trimmed)) {
            setSharedUsers([...sharedUsers, trimmed]);
        }
        setUserInput('');
    };

    const removeTag = (indexToRemove: number) => {
        setSharedUsers(sharedUsers.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

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
                setSharedUsers([]);
                setShare(false);
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
        <AppModalContainer isOpen={isOpen} onClose={onClose} title={`Créer un nouveau dossier  ${currentFolder && 'dans'} ${currentFolder?.name}`} >
            <div className='flex flex-col gap-6'>
                <div>
                    <AppInput
                        label='Nom du dossier'
                        secondary
                        value={folderName}
                        setValue={(e) => setFolderName(e)}
                    />
                    <div className='flex flex-col items-start justify-center mt-2'>
                        <div className='flex items-center justify-start gap-2'>
                            <AppCheckbox isChecked={share} check={setShare} />
                            <div onClick={() => setShare(!share)} className='cursor-pointer font-light text-[15px]  text-[var(--title-color)]'>Souhaitez-vous partager cela avec un ou plusieurs utilisateurs ?</div>
                        </div>
                        {
                            share &&
                            <div className="flex flex-wrap gap-1 mt-2">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="px-2 border rounded outline-none h-9"
                                    placeholder="Login de l'utilisateur"
                                />
                                <AppButton
                                    onClick={addTag}
                                    text='Ajouter un partage'
                                />

                                {sharedUsers.map((user, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center px-3 text-[var(--title-color)] bg-[var(--fadded-red)] rounded h-9"
                                    >
                                        {user}
                                        <button
                                            onClick={() => removeTag(index)}
                                            className="ml-2 text-[var(--primary-color)] text-md hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        }
                    </div>

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