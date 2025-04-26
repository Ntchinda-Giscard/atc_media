import AppButton from '@/components/AppButton';
import AppCheckbox from '@/components/AppCheckbox';
import AppInput from '@/components/AppInput';
import { AppModalContainer } from '@/components/AppModalContainer'
import { IMediaFolders, IPlaylistFile } from '@/constant/interphase';
import { useMedia } from '@/contexts/MediaContex';
import { getCurrentDate } from '@/lib/utils';
import React, { useState, KeyboardEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';


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
  const [uploadedFiles, setUploadedFiles] = useState<IPlaylistFile[]>([]);
  const [share, setShare] = useState<boolean>(false);
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

  const onCreateFolder = () => {
    if (folderName.length == 0) {
      alert("Vous devriez ajouter un nom de dossier.");
      return
    }
    if (folders.some(folder => folder.name == folderName)) {
      alert("Ce nom de dossier a déjà été utilisé.");
      return
    }
    const folder: IMediaFolders = {
      id: uuidv4(),
      name: folderName,
      content: uploadedFiles,
      createdAt: getCurrentDate(),
      shared: sharedUsers,
      status: "ACTIVE",
      parentId: currentFolder?.id ?? undefined
    }

    const addResponse: boolean = addFolder(folder);
    if (addResponse) {
      setFolderName('');
      setUploadedFiles([]);
      setSharedUsers([]);
      setShare(false);
      alert("Dossier creer avec succes");
      onClose();
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
          />
        </div>
      </div>
    </AppModalContainer >
  )
}

export default AddNewFolderModal