import AppActions from '@/components/AppActions';
import AppBadge from '@/components/AppBadge';
import AppButton from '@/components/AppButton';
import AppCheckbox from '@/components/AppCheckbox';
import { AppModalContainer } from '@/components/AppModalContainer'
import CustomTable from '@/components/CustomTable';
import { IMediaFiles, IDropdownItems, IAddFileToFolderApiProps } from '@/constant/interphase';
import { mediaFileHeader } from '@/constant/tableHeaders';
import { useMedia } from '@/contexts/MediaContex';
import { convertBToMb, formatDate, isValidHttpUrl } from '@/lib/utils';
import React, { useState } from 'react';
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
    const { folderToView, addFileToFolder, setFolderToRename, setFolderToDelete, deleteFileFromFolder } = useMedia();
    const [isDragging] = useState(false);
    const [addingFile, setAddingFile] = useState<boolean>(false);
    const [addingUrl, setAddingUrl] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<IAddFileToFolderApiProps>({
        file: null,
        folder_id: '',
        duration: '',
        url: '',
        name: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "file" && files) {
            setFormData({ ...formData, file: files[0] });
        } else if (name === "duration" || name === "folder_id") {
            setFormData({ ...formData, [name]: value ? Number(value) : "" });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (formData.name === "") {
            newErrors.name = "The name of the file is required";
        }

        if (formData.duration === "" || isNaN(formData.duration)) {
            newErrors.duration = "Duration is required and must be a number.";
        }

        if (addingUrl) {
            if (!formData.url) {
                newErrors.fileOrUrl = "You must provide a URL.";
            }
            if (!isValidHttpUrl(formData.url ?? "")) {
                newErrors.fileOrUrl = "You must a vallid provide a URL.";
            }
        } else {
            if (!formData.file) {
                newErrors.fileOrUrl = "You must upload a file";
            }
        }
        for (const key in newErrors) {
            if (newErrors.hasOwnProperty(key)) {
                app_notification({
                    message: newErrors[key]
                })
            }
        }
        return newErrors;
    };


    const fileAction: IDropdownItems[] = [{
        icon: "👁️",
        name: " Aperçu", onClick(id?: number) {
            console.log(id)
        },
    }, {
        icon: "🖊", name: " Renommer", onClick(id?: number) {
            console.log("id", id)
        },
    }, {
        icon: "❌", name: " Supprimer", onClick(id?: number) {
            const file = folderToView?.files?.find(f => f.id == id);
            if (!file) {
                app_notification({
                    message: "Ce ficher n'existe pas."
                })
                return
            }
            const isConfirmed = confirm("Are you sure you want to delete this?");
            if (isConfirmed) {
                deleteFileFromFolder(id ?? 0);
            }
        },
    }];


    const handleSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const payload: IAddFileToFolderApiProps = {
                file: !addingUrl ? formData.file : null,
                duration: Number(formData.duration),
                folder_id: folderToView?.id ?? 0,
                url: addingUrl ? formData.url : null,
                name: formData.name,
            }
            setIsLoading(true);
            const addResponse = await addFileToFolder(payload);
            setIsLoading(false);

            if (addResponse) {
                // Clear form after successful upload
                setFormData({
                    file: null,
                    folder_id: "",
                    duration: "",
                    url: "",
                    name: "",
                });
                setAddingUrl(false);
                setAddingFile(false);
            } else {
                app_notification({
                    message: "Could not add file"
                })
            }

        } catch (error) {
            setIsLoading(false);
            console.error("Error uploading:", error);
        }
    };


    return (
        <AppModalContainer isOpen={isOpen} onClose={onClose} title={"📁 Dossier "} subtitle={folderToView?.name} big
            iconClick={() => setAddingFile(false)}
            icon={addingFile && <ChevronLeft size={40} />}
        >
            {
                addingFile ?
                    <div className='flex flex-col gap-6'>
                        <AppInput
                            label='File name'
                            value={String(formData.name)}
                            onChange={handleChange}
                            name="name"
                            secondary
                        />
                        {
                            !addingUrl ?
                                <div
                                    className='border border-[var(--light-gray-background)] rounded-[10px]'>
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
                                            hidden
                                            name="file"
                                            onChange={handleChange}
                                        />
                                        <div className='border border-[var(--modal-background)] rounded-[12px] flex items-center cursor-pointer'
                                            onClick={() => document.getElementById('fileInput')?.click()}>
                                            <div className='rounded-l-[12px] bg-[var(--modal-background)] py-2 px-4 font-normal text-[var(--title-color)] text-[16px]'>
                                                Sélection un fichiers
                                            </div>
                                            <div className='font-normal text-[var(--title-color)] text-[16px] flex-1 px-4'>
                                                {
                                                    formData.file ? (formData.file.name) :
                                                        " Aucun fichier sélectionné"
                                                }
                                            </div>
                                        </div>
                                        <div className='font-normal text-[14px] text-[var(--title-color)]'>
                                            Formats acceptés : JPEG, PNG, MP4, WebM, MP3, PDF, HTML, RSS
                                        </div>
                                        <AppInput
                                            label='Duree du media'
                                            value={String(formData.duration)}
                                            onChange={handleChange}
                                            name="duration"
                                            type='number'
                                        />
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
                                    </div>
                                </div> :
                                <div
                                    className='border border-[var(--light-gray-background)] rounded-[10px]'>
                                    <div className='border-b border-[var(--light-gray-background)] px-4 py-2'>📤 Ajouter un lien au dossier</div>
                                    <div className='px-4 py-2  flex flex-col gap-3 rounded-b-[10px] bg-[var(--white)]'>
                                        <AppInput
                                            label='Lien de media'
                                            name="url"
                                            value={String(formData.url)}
                                            onChange={handleChange}
                                            type='url'
                                        />
                                        <AppInput
                                            label='Duree du media'
                                            name="duration"
                                            value={String(formData.duration)}
                                            onChange={handleChange}
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
                                onClick={handleSubmit}
                                text={addingUrl ? 'Ajouter le lien' : 'Ajouter le ficher'}
                                big
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                    :

                    <div className='flex flex-col gap-6'>
                        <div>
                            <div className='text-[var(--black)] text-[18px] font-bold mb-2'> Informations sur le dossier</div>
                            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4'>
                                <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0'>
                                    <div className='text-[var(--action-text-color)] text-[16px] font-bold'>🗂 Nom</div>
                                    <div className='text-[var(--title-color)] text-[15px] font-normal'>{folderToView?.name}</div>
                                </div>
                                <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0'>
                                    <div className='text-[var(--action-text-color)] text-[16px] font-bold'>📝 Nombre de fichiers</div>
                                    <div className='text-[var(--title-color)] text-[15px] font-normal'>{folderToView?.files?.length ?? 0}</div>
                                </div>
                                <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0' >
                                    <div className='text-[var(--action-text-color)] text-[16px] font-bold'>🔗 Partagé</div>
                                    <div><AppBadge title='oui' /></div>
                                </div>
                                <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0'>
                                    <div className='text-[var(--action-text-color)] text-[16px] font-bold'>📅 Date de création</div>
                                    <div className='text-[var(--title-color)] text-[15px] font-normal'>{formatDate(folderToView?.created_at ?? "")}</div>
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
                                                {convertBToMb(file.size ?? 0)}
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