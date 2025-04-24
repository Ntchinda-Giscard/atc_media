import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import { AppModalContainer } from '@/components/AppModalContainer'
import { useMedia } from '@/contexts/MediaContex';
import React, { useEffect, useState } from 'react'

interface RenameFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RenameFolderModal({
  isOpen,
  onClose,
}: RenameFolderModalProps) {
  const { folderToRename, renameFolder } = useMedia();
  const [name, setName] = useState(folderToRename?.name)
  useEffect(() => {
    if (folderToRename?.name) {
      setName(folderToRename?.name)
    }
  }, [folderToRename])
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
            onClick={() => renameFolder(name ?? "")}
            text='enregistrer les modifications'
            big
          />
        </div>
      </div>
    </AppModalContainer>
  )
}

export default RenameFolderModal