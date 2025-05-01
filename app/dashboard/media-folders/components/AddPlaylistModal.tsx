import AppButton from '@/components/AppButton';
import AppCheckbox from '@/components/AppCheckbox';
import AppInput from '@/components/AppInput';
import { AppModalContainer } from '@/components/AppModalContainer';
import AppTextarea from '@/components/AppTextarea';
import { IAddFileToFolderApiProps, IAddPlaylistToFolderApiProps, IMediaFiles, IMediaFolders, IMediaPlaylist } from '@/constant/interphase';
import { useMedia } from '@/contexts/MediaContex';
import React, { useState, DragEvent, useEffect } from 'react';
import { app_notification } from '../../utils/notification-center';
import { CirclePlus } from 'lucide-react';
import SelectMediaFilesModal from './SelectMediaFilesModal';
import { convertBToMb, formatTotalDuration, isValidHttpUrl } from '@/lib/utils';

interface AddPlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
    folder: IMediaFolders;
}

const listDesEcran = [
    { name: "Écran Vitrine Paris" },
    { name: "Écran Accueil Lyon" },
    { name: 'Groupe "Magasins Sud"' },
];

function AddPlaylistModal({
    isOpen,
    onClose,
    folder,
}: AddPlaylistModalProps) {
    const { addPlaylistToFolder, addFileToFolder } = useMedia();
    const [playlistName, setplaylistName] = useState('');
    const [playlistDescription, setplaylistDescription] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [isSelectingMediaFiles, setIsSelectingMediaFiles] = useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<IMediaFiles[]>([])
    const [addingUrl, setAddingUrl] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [playlists, setPlaylists] = useState<IMediaPlaylist[]>([]);

    useEffect(() => {
        if (folder) {
            setPlaylists(folder?.playlists ?? [])
        }
    }, [folder])

    const [formData, setFormData] = useState<IAddFileToFolderApiProps>({
        file: null,
        folder_id: '',
        duration: '',
        url: '',
        name: '',
    });

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };


    const handleDelete = (id: number) => {
        setSelectedFiles(selectedFiles.filter(f => f.id != id));
    };

    const onCreatePlaylist = async () => {
        if (playlistName.trim().length === 0) {
            app_notification({ message: "Vous devriez ajouter un nom de playlist." });
            return;
        }
        if (playlistDescription.trim().length === 0) {
            app_notification({ message: "Vous devriez ajouter une description de playlist." });
            return;
        }
        if (playlists.some(p => p.name === playlistName)) {
            app_notification({ message: "Ce nom de playlist a déjà été utilisé." });
            return;
        }

        try {
            const mediaFileIds: number[] = selectedFiles.reduce((prev: number[], next) => {
                return [...prev, next.id];
            }, []);
            const payload: IAddPlaylistToFolderApiProps = {
                description: playlistDescription,
                folder_id: folder.id,
                media_file_ids: mediaFileIds,
                name: playlistName,
            }
            setIsLoading(true);
            const addResponse = await addPlaylistToFolder(payload);
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
                setplaylistDescription('')
                setplaylistName('')
                onClose();
            } else {
                app_notification({
                    message: "Could not add playlist"
                })
            }

        } catch (error) {
            setIsLoading(false);
            console.error("Error uploading:", error);
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

    const handleFile = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const payload: IAddFileToFolderApiProps = {
                file: !addingUrl ? formData.file : null,
                duration: Number(formData.duration),
                folder_id: folder.id,
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
                setSelectedFiles([addResponse as IMediaFiles, ...selectedFiles])
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

    return (
        <AppModalContainer isOpen={isOpen} onClose={onClose} title="Créer une nouvelle playlist">
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-6 max-h-[70vh] overflow-auto px-2'>
                    <div className='flex flex-col gap-2'>
                        <AppInput
                            label='Nom du dossier'
                            secondary
                            value={playlistName}
                            setValue={(e) => setplaylistName(e)}
                        />
                        <AppTextarea
                            label='Description'
                            secondary
                            value={playlistDescription}
                            setValue={(e) => setplaylistDescription(e)}
                        />
                    </div>

                    {/* File Upload Area */}
                    <div
                        className='border border-[var(--light-gray-background)] rounded-[10px]'
                        onDrop={(e) => !addingUrl && handleDrop(e)}
                        onDragOver={(e) => {
                            if (!addingUrl) {
                                e.preventDefault();
                                setIsDragging(true);
                            }
                        }}
                        onDragLeave={() => !addingUrl && setIsDragging(false)}
                    >
                        <div className='border-b border-[var(--light-gray-background)] px-4 py-2'>📂 Fichiers inclus dans la playlist</div>
                        <div className={`px-4 py-4 flex flex-col gap-3 rounded-b-[10px] ${isDragging ? 'bg-blue-100' : 'bg-[var(--white)]'}`}>
                            {
                                !addingUrl ?
                                    <React.Fragment>
                                        <div className='font-normal text-[16px] text-[var(--title-color)]'>
                                            Glissez et déposez votre fichier ici ou utilisez le bouton ci-dessous :
                                        </div>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            accept=".jpg,.jpeg,.png,.mp4,.webm,.mp3,.pdf,.html,.rss"
                                            hidden
                                            name="file"
                                            onChange={handleChange}
                                        />
                                        <div className='flex items-center gap-3'>
                                            <div
                                                className='border border-[var(--modal-background)] rounded-[12px] flex items-center cursor-pointer w-full'
                                                onClick={() => document.getElementById('fileInput')?.click()}
                                            >
                                                <div className='rounded-l-[12px] bg-[var(--modal-background)] py-2 px-4 font-normal text-[var(--title-color)] text-[16px] flex-shrink-0'
                                                >
                                                    Sélect. fichier
                                                </div>
                                                <div className='font-normal text-[var(--title-color)] text-[16px] px-4  truncate'
                                                >
                                                    {
                                                        formData.file ? (formData.file.name) :
                                                            " Aucun fichier sélectionné"
                                                    }
                                                </div>
                                            </div>
                                            {
                                                formData.file?.name &&
                                                <div className='flex items-center gap-1'>
                                                    <AppInput
                                                        placeholder='File name'
                                                        value={String(formData.name)}
                                                        onChange={handleChange}
                                                        name="name"
                                                    />
                                                    <AppInput
                                                        placeholder='Duree du media'
                                                        name="duration"
                                                        value={String(formData.duration)}
                                                        onChange={handleChange}
                                                        type='number'
                                                    />
                                                    <AppButton onClick={handleFile}
                                                        icon={<CirclePlus />}
                                                        isLoading={isLoading}
                                                    />
                                                </div>
                                            }
                                        </div>
                                        <div className='font-normal text-[14px] text-[var(--title-color)]'>
                                            Formats acceptés : JPEG, PNG, MP4, WebM, MP3, PDF, HTML, RSS
                                        </div>
                                    </React.Fragment>
                                    : <div className='flex gap-5'>
                                        <AppInput
                                            placeholder='File name'
                                            value={String(formData.name)}
                                            onChange={handleChange}
                                            name="name"
                                        />
                                        <AppInput
                                            placeholder='Lien de media'
                                            name="url"
                                            value={String(formData.url)}
                                            onChange={handleChange}
                                            type='url'
                                        />
                                        <AppInput
                                            placeholder='Duree du media'
                                            name="duration"
                                            value={String(formData.duration)}
                                            onChange={handleChange}
                                            type='number'
                                        />
                                        <AppButton onClick={handleFile}
                                            icon={<CirclePlus />}
                                            isLoading={isLoading}
                                        />

                                    </div>
                            }
                            <div className='font-normal text-[14px] text-[var(--secondary-text-color)]'>
                                OU
                            </div>
                            <div className='border border-[var(--modal-background)] rounded-[12px] flex items-center cursor-pointer'
                                onClick={() => setIsSelectingMediaFiles(true)}
                            >
                                <div className='font-normal text-[var(--title-color)] text-[16px] flex-1 px-4  py-2'>
                                    Ajouter depuis mes templates
                                </div>
                                <div className='rounded-r-[12px] bg-[var(--modal-background)] h-11 col-center cursor-pointer px-4 font-normal text-[var(--title-color)] text-[16px]'>
                                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.40189 1.50312e-07L10.9451 4.84356e-08C12.6045 2.86481e-08 13.5421 1.90418 12.5304 3.21942L8.25875 8.77251C7.45816 9.81328 5.88885 9.81328 5.08826 8.77251L0.816647 3.21942C-0.195075 1.90418 0.742548 1.701e-07 2.40189 1.50312e-07Z" fill="#414141" />
                                    </svg>
                                </div>
                            </div>
                            {selectedFiles.length > 0 && (
                                <div className='border border-[var(--modal-background)] rounded-[10px] px-4 py-3 flex flex-col gap-3'>
                                    <div className='font-normal text-[20px] text-[var(--black)]'>
                                        🗂 Fichier sélectionné :
                                    </div>
                                    <div className='border rounded-[10px] w-full'>
                                        {
                                            selectedFiles.map(selectedFile => (
                                                <div key={selectedFile.id} className='flex items-center justify-between px-4 py-2'>
                                                    <div className='font-bold text-[16px] text-[var(--title-color)]'>
                                                        {selectedFile.name} <span className="text-xs text-gray-500">({selectedFile.type}) ({convertBToMb(selectedFile.size ?? 0)}) ({selectedFile.duration} s)</span>
                                                    </div>
                                                    <div
                                                        className='font-normal cursor-pointer text-[14px] text-[var(--action-text-color)]'
                                                        onClick={() => handleDelete(selectedFile.id)}
                                                    >
                                                        ❌ Supprimer
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center justify-start gap-2'>
                        <AppCheckbox isChecked={addingUrl} check={setAddingUrl} />
                        <div onClick={() => setAddingUrl(!addingUrl)} className='cursor-pointer font-light text-[15px]  text-[var(--title-color)]'>Souhaitez-vous ajouter un lien ?</div>
                    </div>

                    {/* Screen/Groupe Selector */}
                    <div className='border border-[var(--light-gray-background)] rounded-[10px]'>
                        <div className='border-b border-[var(--light-gray-background)] px-4 py-2'>📺 Associer la playlist à des écrans / groupes</div>
                        <div className='px-4 py-4 flex flex-col gap-3 rounded-b-[10px] bg-[var(--white)]'>
                            <div className='font-normal text-[16px] text-[var(--title-color)]'>
                                Choisissez les écrans ou groupes où cette playlist sera diffusée :
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {listDesEcran.map(item => (
                                    <div key={item.name} className='flex items-center justify-start gap-3'>
                                        <AppCheckbox isChecked={confirm} check={setConfirm} />
                                        <div className='cursor-pointer font-light text-[15px] text-[var(--title-color)]'>{item.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className='border border-[var(--light-gray-background)] rounded-[10px]'>
                        <div className='border-b border-[var(--light-gray-background)] px-4 py-2'>👁️‍🗨️ Aperçu et validation</div>
                        <div className='px-4 py-4 flex flex-col gap-3 rounded-b-[10px] bg-[var(--white)]'>
                            <div className='font-bold text-[16px] text-[var(--title-color)]'>
                                Durée totale estimée : <span className='text-[var(--primary-color)]'>{formatTotalDuration(selectedFiles)}</span>
                            </div>
                            <div className='px-4 py-2 w-fit border-1 border-[var(--primary-color)] rounded-[10px] col-center gap-2 text-[14px] font-normal text-[var(--title-color)] cursor-pointer'>
                                <span>👁️‍🗨️</span>
                                <div>Aperçu et Validation</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex items-center justify-center'>
                    <AppButton onClick={onCreatePlaylist} text='Créer la playlist' big isLoading={isLoading} />
                </div>
            </div>
            <SelectMediaFilesModal
                isOpen={isSelectingMediaFiles}
                onClose={() => setIsSelectingMediaFiles(false)}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
            />
        </AppModalContainer >
    );
}

export default AddPlaylistModal;
