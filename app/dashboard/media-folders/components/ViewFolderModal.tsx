import AppButton from '@/components/AppButton';
import AppCheckbox from '@/components/AppCheckbox';
import { AppModalContainer } from '@/components/AppModalContainer'
import { IMediaFolders, IMediaFiles } from '@/constant/interphase';
import { useMedia } from '@/contexts/MediaContex';
import { getCurrentDate } from '@/lib/utils';
import React, { useState, DragEvent, KeyboardEvent, } from 'react';


interface ViewFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ViewFolderModal({
  isOpen,
  onClose,
}: ViewFolderModalProps) {
  const { folderToView, modifyFolder, setFolderToView } = useMedia();
  const [uploadedFiles, setUploadedFiles] = useState<IMediaFiles[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [share, setShare] = useState<boolean>(false);
  const [userInput, setUserInput] = useState('');
  const [sharedUsers, setSharedUsers] = useState<string[]>([]);

  // useEffect(() => {
  //   if (folderToView) {
  //     if (folderToView.shared.length > 0) {
  //       setShare(true);
  //       setSharedUsers(folderToView.shared)
  //     }
  //     setUploadedFiles(folderToView.content);
  //   }
  // }, [folderToView])

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles: IMediaFiles[] = [];
    console.log(files);

    // files.forEach((file) => {
    //   const fileType = getFileType(file);
    //   if (fileType) {
    //     validFiles.push({
    //       id: uuidv4(),
    //       name: file.name,
    //       type: fileType,
    //     });
    //   }
    // });

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDelete = (id: number) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };


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

  const onModifyFolder = () => {
    if (folderToView) {
      const folder: IMediaFolders = {
        ...folderToView,
        content: uploadedFiles,
        createdAt: getCurrentDate(),
        shared: sharedUsers,
      }
      const modifyResponse: boolean = modifyFolder(folder);
      if (modifyResponse) {
        setFolderToView(null);
        alert("Dossier modifier avec succes");
        onClose();
      }
    }
  }

  return (
    <AppModalContainer isOpen={isOpen} onClose={onClose} title={folderToView?.name}>
      <div className='flex flex-col gap-6'>
        <div>
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
        <div
          className='border border-[var(--light-gray-background)] rounded-[10px]'
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}>
          <div className='border-b border-[var(--light-gray-background)] px-4 py-2'>📤 Ajouter des fichiers au dossier</div>
          <div className={`px-4 py-2  flex flex-col gap-3 rounded-b-[10px]
          ${isDragging ? 'bg-blue-100' : 'bg-[var(--white)]'}`}>
            <div className='font-normal text-[16px] text-[var(--title-color)]'>
              Glissez et déposez vos fichiers ici ou utilisez le bouton ci-dessous :
            </div>
            <input
              id="fileInput"
              type="file"
              accept=".jpg,.jpeg,.png,.mp4,.webm,.mp3,.pdf,.html,.rss"
              multiple
              hidden
              onChange={handleFileInputChange}
            />
            <div className='border border-[var(--modal-background)] rounded-[12px] flex items-center cursor-pointer'
              onClick={() => document.getElementById('fileInput')?.click()}>
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
            {
              uploadedFiles.length > 0 && (
                <div className='border border-[var(--modal-background)] rounded-[10px] px-4 py-3 flex flex-col gap-3'>
                  <div className='font-normal text-[20px] text-[var(--black)]'>
                    🗂 Fichiers sélectionnés :
                  </div>
                  <div className='border rounded-[10px] w-full'>
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={file.id}
                        className={`flex items-center justify-between px-4 py-2 
                          ${uploadedFiles.length - 1 != index && 'border-b border-[var(--modal-background)]'}
                          `}
                      >
                        <div className='font-bold text-[16px] text-[var(--title-color)]'>
                          {file.name} <span className="text-xs text-gray-500">({file.type})</span>
                        </div>
                        <div className='font-normal cursor-pointer text-[14px] text-[var(--action-text-color)]'
                          onClick={() => handleDelete(file.id)}>
                          ❌ Supprimer
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <AppButton
            onClick={onModifyFolder}
            text='Modifier le dossier'
            big
          />
        </div>
      </div>
    </AppModalContainer >
  )
}

export default ViewFolderModal