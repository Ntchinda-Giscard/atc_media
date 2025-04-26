import AppActions from '@/components/AppActions';
import AppBadge from '@/components/AppBadge';
import AppButton from '@/components/AppButton';
import AppCheckbox from '@/components/AppCheckbox';
import { AppModalContainer } from '@/components/AppModalContainer'
import CustomTable from '@/components/CustomTable';
import { IMediaFolders, IMediaFiles, IDropdownItems } from '@/constant/interphase';
import { mediaFileHeader } from '@/constant/tableHeaders';
import { useMedia } from '@/contexts/MediaContex';
import { formatDate, getCurrentDate } from '@/lib/utils';
import React, { useState, DragEvent, KeyboardEvent, useEffect, } from 'react';
import RapidActionButton from './RapidActionButton';
import { ChevronLeft, CirclePlus, Link, PencilLine, Trash2 } from 'lucide-react';
import AppInput from '@/components/AppInput';
import { app_notification } from '../../utils/notification-center';


interface ViewFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function ViewFolderModal({
    isOpen,
    onClose,
}: ViewFolderModalProps) {
    const { folderToView, addFileToFolder, setFolderToView, setFolderToRename, setFolderToDelete, deleteFileFromFolder } = useMedia();
    const [uploadedFiles, setUploadedFiles] = useState<IMediaFiles[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [share, setShare] = useState<boolean>(false);
    const [addingFile, setAddingFile] = useState<boolean>(false);
    const [addingUrl, setAddingUrl] = useState<boolean>(false);
    const [userInput, setUserInput] = useState('');
    const [url, setUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [sharedUsers, setSharedUsers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const fileAction: IDropdownItems[] = [{
        icon: "👁️",
        name: " Aperçu", onClick(id?: number) {
            console.log(id)
        },
    }, {
        icon: "❌", name: " Supprimer", onClick(id?: number) {
            const file = folderToView?.files?.find(f => f.id == id);
            if (!file) {
                alert("Ce ficher n'existe pas.")
                return
            }
            const isConfirmed = confirm("Are you sure you want to delete this?");
            if (isConfirmed) {
                deleteFileFromFolder(id ?? 0);
            }
        },
    }];

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

    const onAddUrl = async () => {

        try {
            if (url.length == 0) {
                app_notification({
                    message: "Vous devriez ajouter un lien."
                })
                return
            }
            if (duration.length == 0) {
                app_notification({
                    message: "Vous devriez ajouter une duree."
                })
                return
            }
            if (folderToView?.files?.some(file => file.name == url)) {
                app_notification({
                    message: "Ce nom de dossier a déjà été utilisé."
                })
                return
            }
            setIsLoading(true);
            const addResponse: boolean = await addFileToFolder({
                duration: Number(duration),
                folder_id: folderToView?.id ?? 1,
                url: url,
                file: null
            });
            setIsLoading(false);
            if (addResponse) {
                setAddingUrl(false);
                setDuration('')
                setUrl('')
                setAddingFile(false);
            } else {
                app_notification({
                    message: "Could not add file"
                })
            }

        } catch (error) {
            console.log(error)
            app_notification({
                message: "An error occure"
            })

        }

    }

    const onAddFile = () => {

    }

    return (
        <AppModalContainer isOpen={isOpen} onClose={onClose} title={"📁 Dossier "} subtitle={folderToView?.name} big
            iconClick={() => setAddingFile(false)}
            icon={addingFile && <ChevronLeft size={40} />}
        >
            {
                addingFile ?
                    <div className='flex flex-col gap-6'>
                        {
                            !addingUrl ?
                                <div
                                    className='border border-[var(--light-gray-background)] rounded-[10px]'
                                    onDrop={handleDrop}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}>
                                    <div className='border-b border-[var(--light-gray-background)] px-4 py-2'>📤 Ajouter un fichier au dossier</div>
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
                                        <AppInput />
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
                                </div> :
                                <div
                                    className='border border-[var(--light-gray-background)] rounded-[10px]'>
                                    <div className='border-b border-[var(--light-gray-background)] px-4 py-2'>📤 Ajouter un lien au dossier</div>
                                    <div className='px-4 py-2  flex flex-col gap-3 rounded-b-[10px] bg-[var(--white)]'>
                                        <AppInput
                                            label='Lien de media'
                                            value={url}
                                            setValue={(e) => setUrl(e)}
                                            type='url'
                                        />
                                        <AppInput
                                            label='Duree de media'
                                            value={duration}
                                            setValue={(e) => setDuration(e)}
                                            type='number'
                                        />
                                    </div>
                                </div>

                        }
                        <div className='flex items-center justify-start gap-2'>
                            <AppCheckbox isChecked={addingUrl} check={setAddingUrl} />
                            <div onClick={() => setAddingUrl(!addingUrl)} className='cursor-pointer font-light text-[15px]  text-[var(--title-color)]'>Souhaitez-vous ajouter un lien ?</div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <AppButton
                                onClick={addingUrl ? onAddUrl : onAddFile}
                                text={addingUrl ? 'Ajouter le lien' : 'Ajouter le ficher'}
                                big
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                    :

                    <div className='flex flex-col gap-6'>
                        <div>
                            <div className='text-[var(--black)] text-[18px] font-bold mb-2'>📝 Informations sur le dossier</div>
                            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4'>
                                <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0'>
                                    <div className='text-[var(--action-text-color)] text-[16px] font-bold'>🗂 Nom</div>
                                    <div className='text-[var(--title-color)] text-[15px] font-normal'>{folderToView?.name}</div>
                                </div>
                                <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0'>
                                    <div className='text-[var(--action-text-color)] text-[16px] font-bold'>📂 Nombre de fichiers</div>
                                    <div className='text-[var(--title-color)] text-[15px] font-normal'>{folderToView?.files?.length ?? 0}</div>
                                </div>
                                <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0' >
                                    <div className='text-[var(--action-text-color)] text-[16px] font-bold'>🔗 Partagé</div>
                                    <div><AppBadge title='oui' /></div>
                                </div>
                                <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0'>
                                    <div className='text-[var(--action-text-color)] text-[16px] font-bold'>📅 Date de création</div>
                                    <div className='text-[var(--title-color)] text-[15px] font-normal'>{folderToView?.created_at}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='text-[var(--black)] text-[18px] font-bold'>📂 Mes fichiers</div>
                            <CustomTable
                                headers={mediaFileHeader}
                                data={folderToView?.files ?? []}
                                // onClick={(id: number) => setFolderToView(folders?.find(f => f.id == id) ?? null)}
                                renderRow={(item) => {
                                    const file = item as IMediaFiles;
                                    return (
                                        <>
                                            <td className="px-2 py-2 text-[15px] font-medium text-center">
                                                {file.name}
                                            </td>
                                            <td className="px-2 py-2 text-[15px] font-normal text-center">
                                                {file.type}
                                            </td>
                                            <td className="px-2 py-2 text-[15px] font-normal text-center">
                                                {(file?.size ?? 0) / 1024} Mo
                                            </td>
                                            <td className="px-2 py-2 text-[15px] font-normal text-center whitespace-nowrap">
                                                {formatDate(file.created_at)}
                                            </td>
                                            <td className="px-2 py-3 text-[15px] font-medium text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center">
                                                    <AppActions actions={fileAction} id={file.id} />
                                                </div>
                                            </td>
                                        </>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <div className='text-[var(--black)] text-[18px] font-bold mb-2'>	🚀 Actions rapides</div>
                            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4'>
                                <RapidActionButton
                                    onClick={() => setAddingFile(true)}
                                    primarIcon='📤'
                                    secondaryIcon={<CirclePlus color='var(--primary-color)' />}
                                    subtitle='Ajouter un fichier'
                                    title='Ajouter'
                                />
                                <RapidActionButton
                                    onClick={() => {
                                        setFolderToRename(folderToView);
                                    }}
                                    primarIcon='🖊'
                                    secondaryIcon={<PencilLine color='var(--primary-color)' />}
                                    subtitle='Renommer le dossier'
                                    title='Renommer'
                                />
                                <RapidActionButton
                                    onClick={() => {
                                        setFolderToDelete(folderToView);
                                    }}
                                    primarIcon='❌'
                                    secondaryIcon={<Trash2 color='var(--primary-color)' />}
                                    subtitle='Supprimer le dossier'
                                    title='Supprimer'
                                />
                                <RapidActionButton
                                    onClick={() => null}
                                    primarIcon='🔗'
                                    secondaryIcon={<Link color='var(--primary-color)' />}
                                    subtitle='Partager le dossier'
                                    title='Partager'
                                />
                            </div>

                        </div>
                    </div>
            }



        </AppModalContainer >
    )
}

export default ViewFolderModal