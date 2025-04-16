import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import { AppModalContainer } from '@/components/AppModalContainer'
import React from 'react'

interface AddNewFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddNewFolderModal({
  isOpen,
  onClose,
}: AddNewFolderModalProps) {
  return (
    <AppModalContainer isOpen={isOpen} onClose={onClose} title="Créer un nouveau dossier">
      <div className='flex flex-col gap-6'>
        <AppInput
          label='Nom du dossier'
          secondary
        />
        <div className='border border-[var(--light-gray-background)] rounded-[10px]'>
          <div className='border-b border-[var(--light-gray-background)] px-4 py-2'>📤 Ajouter des fichiers au dossier</div>
          <div className='px-4 py-2 bg-[var(--white)] flex flex-col gap-3 rounded-b-[10px]'>
            <div className='font-normal text-[16px] text-[var(--title-color)]'>
              Glissez et déposez vos fichiers ici ou utilisez le bouton ci-dessous :
            </div>
            <div className='border border-[var(--modal-background)] rounded-[12px] flex items-center'>
              <div className='rounded-l-[12px] bg-[var(--modal-background)] py-2 px-4 font-normal text-[var(--title-color)] text-[16px]'>
                Sélect. fichiers
              </div>
              <div className='font-normal text-[var(--title-color)] text-[16px] flex-1 px-4'>
                Aucun fichier sélectionné
              </div>
            </div>
            <div className='font-normal text-[14px] text-[var(--title-color)]'>
              Formats acceptés : JPEG, PNG, MP4, WebM, MP3, PDF, HTML, RSS
            </div>
            <div className='font-normal text-[14px] text-[var(--secondary-text-color)]'>
              OU
            </div>
            <div className='border border-[var(--modal-background)] rounded-[12px] flex items-center'>
              <div className='font-normal text-[var(--title-color)] text-[16px] flex-1 px-4  py-2'>
                Ajouter depuis mes templates
              </div>
              <div className='rounded-r-[12px] bg-[var(--modal-background)] h-11 col-center cursor-pointer px-4 font-normal text-[var(--title-color)] text-[16px]'>
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.40189 1.50312e-07L10.9451 4.84356e-08C12.6045 2.86481e-08 13.5421 1.90418 12.5304 3.21942L8.25875 8.77251C7.45816 9.81328 5.88885 9.81328 5.08826 8.77251L0.816647 3.21942C-0.195075 1.90418 0.742548 1.701e-07 2.40189 1.50312e-07Z" fill="#414141" />
                </svg>
              </div>
            </div>
            <div className='border border-[var(--modal-background)] rounded-[10px] px-4 py-3 flex flex-col gap-3'>
              <div className='font-normal text-[20px] text-[var(--black)]'>
                🗂 Fichiers sélectionnés :
              </div>
              <div className='border rounded-[10px] w-full'>
                <div className='flex items-center justify-between px-4 py-2 border-b border-[var(--modal-background)]  '>
                  <div className='font-bold text-[16px] text-[var(--title-color)]'>
                    promo_banniere.jpg
                  </div>
                  <div className='font-normal cursor-pointer text-[14px] text-[var(--action-text-color)]'>
                    ❌ Supprimer
                  </div>
                </div>
                <div className='flex items-center justify-between px-4 py-2 border-b border-[var(--modal-background)]  '>
                  <div className='font-bold text-[16px] text-[var(--title-colo)]'>
                    promo_banniere.jpg
                  </div>
                  <div className='font-normal cursor-pointer text-[14px] text-[var(--action-text-color)]'>
                    ❌ Supprimer
                  </div>
                </div>
                <div className='flex items-center justify-between px-4 py-2 '>
                  <div className='font-bold text-[16px] text-[var(--title-colo)]'>
                    promo_banniere.jpg
                  </div>
                  <div className='font-normal cursor-pointer text-[14px] text-[var(--action-text-color)]'>
                    ❌ Supprimer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <AppButton
            onClick={() => null}
            text='Créer le dossier'
            big
          />
        </div>
      </div>
    </AppModalContainer>
  )
}

export default AddNewFolderModal