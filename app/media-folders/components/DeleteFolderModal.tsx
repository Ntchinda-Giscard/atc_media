import AppButton from '@/components/AppButton';
import AppCheckbox from '@/components/AppCheckbox';
import AppInput from '@/components/AppInput';
import { AppModalContainer } from '@/components/AppModalContainer'
import React, { useState } from 'react'

interface DeleteFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function DeleteFolderModal({
  isOpen,
  onClose,
}: DeleteFolderModalProps) {
  const [confirm, setConfirm] = useState<boolean>(false);
  return (
    <AppModalContainer isOpen={isOpen} onClose={onClose} title="Supprimer le dossier " subtitle='Promotions Avril'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <div className='font-normal text-[28px] text-[var(--black)]'>⚠️ Cette action est irréversible. Toutes les données liées à ce dossier seront supprimées.</div>
          <div className='font-normal text-[20px] text-[var(--title-color)] mt-2'>📁 Cette action est irréversible et sera immédiatement appliquée à tous les fichiers.</div>
          <div className='flex items-center justify-start gap-3'>
            <AppCheckbox isChecked={confirm} check={setConfirm} />
            <div onClick={() => setConfirm(!confirm)} className='cursor-pointer font-light text-[20px]  text-[var(--title-color)]'>Je confirme vouloir supprimer ce dossier définitivement.</div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <AppButton
            onClick={() => null}
            text='Supprimer'
            big
          />
        </div>
      </div>
    </AppModalContainer>
  )
}

export default DeleteFolderModal