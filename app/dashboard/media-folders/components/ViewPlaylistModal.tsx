import AppActions from '@/components/AppActions';
import AppBadge from '@/components/AppBadge';
import AppButton from '@/components/AppButton';
import AppCheckbox from '@/components/AppCheckbox';
import { AppModalContainer } from '@/components/AppModalContainer'
import CustomTable from '@/components/CustomTable';
import { IMediaFiles, IDropdownItems, IAddFileToFolderApiProps } from '@/constant/interphase';
import { mediaFileHeader } from '@/constant/tableHeaders';
import { useMedia } from '@/contexts/MediaContex';
import { convertBToMb, formatDate, formatTotalDuration, isValidHttpUrl } from '@/lib/utils';
import React, { useState } from 'react';
import RapidActionButton from './RapidActionButton';
import { ChevronLeft, CirclePlus, Download, Link, PencilLine, Trash2 } from 'lucide-react';
import AppInput from '@/components/AppInput';
import { app_notification } from '../../utils/notification-center';
import { useFile } from '@/contexts/FileContex';


interface ViewPlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const listDesEcran = [
    { name: "Écran Vitrine Paris" },
    { name: "Écran Accueil Lyon" },
    { name: 'Groupe "Magasins Sud"' },
];

function ViewPlaylistModal({
    isOpen,
    onClose,
}: ViewPlaylistModalProps) {
    const { folderToView, addFileToFolder, setFolderToRename, setFolderToDelete, deleteFileFromFolder, setFileToUpdate, playlistToView } = useMedia();
    const { setFileToPreview } = useFile()
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
            const file: IMediaFiles | undefined = folderToView?.files.find(f => f.id == id);
            if (!file) {
                app_notification({
                    message: "this file doesn't exist"
                })
                return
            }
            setFileToPreview(file);
        },
    }, {
        icon: "🖊", name: " Modifier", onClick(id?: number) {
            const file: IMediaFiles | undefined = folderToView?.files.find(f => f.id == id);
            if (!file) {
                app_notification({
                    message: "this file doesn't exist"
                })
                return
            }
            setFileToUpdate(file);
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

    const fileActions: IDropdownItems[] = [{
        icon: "⏱️",
        name: "Modifier durée",
    }, {
        icon: "🗑️", name: "Retirer"
    }];


    return (
        <AppModalContainer isOpen={isOpen} onClose={onClose} title={"🎼 Playlist "} subtitle={playlistToView?.name} big
            iconClick={() => setAddingFile(false)}
            icon={addingFile && <ChevronLeft size={40} />}
        >
            <div className='flex flex-col gap-6'>
                <div>
                    <div className='text-[var(--black)] text-[18px] font-bold mb-2'> 📝 Informations générales</div>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4'>
                        <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0'>
                            <div className='text-[var(--action-text-color)] text-[16px] font-bold'>🎵 Nom</div>
                            <div className='text-[var(--title-color)] text-[15px] font-normal'>{playlistToView?.name}</div>
                        </div>
                        <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0'>
                            <div className='text-[var(--action-text-color)] text-[16px] font-bold'>🖹 Description</div>
                            <div className='text-[var(--title-color)] text-[15px] font-normal'>{playlistToView?.description}</div>
                        </div>
                        <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0' >
                            <div className='text-[var(--action-text-color)] text-[16px] font-bold'>⌛ Durée totale</div>
                            <div className='text-[var(--title-color)] text-[15px] font-normal'>{formatTotalDuration(playlistToView?.media_files ?? [])}</div>
                        </div>
                        <div className='flex flex-col flex-shrink-0 gap-1 border-b-2 md:border-0'>
                            <div className='text-[var(--action-text-color)] text-[16px] font-bold'>📅 Date de création</div>
                            <div className='text-[var(--title-color)] text-[15px] font-normal'>{formatDate(playlistToView?.created_at ?? "")}</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-[var(--black)] text-[18px] font-bold'>📂 Contenu de la playlist (ordre de lecture)</div>
                    <div className='flex justify-between items-center px-5 py-2 bg-[var(--white)] rounded-[10px]'>
                        <div className='flex flex-col'>
                            <div className='text-[16px] font-normal text-[var(--black)]'>promo_avril.mp4</div>
                            <div className='text-[14px] font-normal text-[var(--action-text-color)]'>Vidéo - 1m15s</div>
                        </div>
                        <div>
                            <AppActions actions={fileActions} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-[var(--black)] text-[18px] font-bold'>👀 Aperçu / Simulation</div>
                    <div className='flex flex-col justify-center items-center gap-2 px-5 py-2 bg-[var(--white)] rounded-[10px]'>
                        <div className='text-[16px] font-normal text-[var(--title-color)] text-center'>🎬 Cliquez pour prévisualiser la playlist comme affichée sur un écran</div>
                        <div className='px-4 py-2 w-fit border-1 border-[var(--primary-color)] rounded-[10px] col-center gap-2 text-[14px] font-normal text-[var(--title-color)] cursor-pointer'>
                            <span>▶</span>
                            <div>Lancer la simulation</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-[var(--black)] text-[18px] font-bold'>📺 Écrans associés</div>
                    <div className='flex justify-between items-center px-5 py-2 bg-[var(--white)] rounded-[10px]'>
                        <div className='flex flex-col'>
                            <div className='text-[16px] font-normal text-[var(--black)]'>Cette playlist est diffusée sur :</div>
                            <div>
                                {
                                    listDesEcran.map(list => (
                                        <li key={list.name} className='text-[14px] font-normal text-[var(--primary-color)]'>{list.name}</li>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='cursor-pointer font-normal text-[14px] text-[var(--action-text-color)] flex-shrink-0  px-2 '>
                            🎬 Modifier durée l’association
                        </div>
                    </div>
                </div>
                <div>
                    <div className='text-[var(--black)] text-[18px] font-bold mb-2'>🚀 Actions rapides</div>
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
                            subtitle='Renommer la playlist'
                            title='Renommer'
                        />
                        <RapidActionButton
                            onClick={() => {
                                setFolderToDelete(folderToView);
                            }}
                            primarIcon='❌'
                            secondaryIcon={<Trash2 color='var(--primary-color)' />}
                            subtitle='Supprimer la playlist'
                            title='Supprimer'
                        />
                        <RapidActionButton
                            onClick={() => null}
                            primarIcon='⬇'
                            secondaryIcon={<Download color='var(--primary-color)' />}
                            subtitle='Expoter la playlist'
                            title='Expoter'
                        />
                    </div>

                </div>
            </div>
        </AppModalContainer >
    )
}

export default ViewPlaylistModal