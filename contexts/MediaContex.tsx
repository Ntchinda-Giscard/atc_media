'use client';
import { app_notification } from '@/app/dashboard/utils/notification-center';
import { IAddFileToFolderApiProps, IAddPlaylistToFolderApiProps, IMediaFiles, IMediaFolders, IMediaPlaylist } from '@/constant/interphase';
import useMediaService from '@/lib/hooks/useMediaService';
import { createContext, useState, useContext, SetStateAction, Dispatch } from 'react';
import { useFile } from './FileContex';

interface MediaContextProps {
    folders: IMediaFolders[];
    setFolders: Dispatch<SetStateAction<IMediaFolders[]>>;
    currentFolder: IMediaFolders | undefined;
    setCurrentFolder: Dispatch<SetStateAction<IMediaFolders | undefined>>;
    folderToRename: IMediaFolders | null;
    setFolderToRename: Dispatch<SetStateAction<IMediaFolders | null>>;
    fileToUpdate: IMediaFiles | null;
    setFileToUpdate: Dispatch<SetStateAction<IMediaFiles | null>>;
    folderToView: IMediaFolders | null;
    setFolderToView: Dispatch<SetStateAction<IMediaFolders | null>>;
    playlistToView: IMediaPlaylist | null;
    setPlaylistToView: Dispatch<SetStateAction<IMediaPlaylist | null>>;
    deleteFolder: () => Promise<boolean>;
    deletePlaylist: () => Promise<boolean>;
    setFolderToDelete: Dispatch<SetStateAction<IMediaFolders | null>>;
    folderToDelete: IMediaFolders | null;
    setPlaylistToDelete: Dispatch<SetStateAction<IMediaPlaylist | null>>;
    playlistToDelete: IMediaPlaylist | null;
    renameFolder: (newName: string) => Promise<boolean>;
    addFolder: (payload: { name: string, parent_id: number | null }) => Promise<boolean>;
    getAllRootFolders: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFolderById: (id: number) => any;
    setLoadingFolders: (value: boolean) => void;
    loadingFolders: boolean;
    addFileToFolder: (payload: IAddFileToFolderApiProps) => Promise<boolean | IMediaFiles>;
    addPlaylistToFolder: (payload: IAddPlaylistToFolderApiProps) => Promise<boolean>;
    updateFileInFolder: (name: string, duration: number) => Promise<boolean>;
    deleteFileFromFolder: (id: number) => void;
}
const MediaContext = createContext<MediaContextProps | null>(null);

export function MediaProvider({ children }: { children: React.ReactNode }) {
    const [folders, setFolders] = useState<IMediaFolders[]>([]);
    const [folderToRename, setFolderToRename] = useState<IMediaFolders | null>(null);
    const [fileToUpdate, setFileToUpdate] = useState<IMediaFiles | null>(null);
    const [folderToView, setFolderToView] = useState<IMediaFolders | null>(null);
    const [playlistToView, setPlaylistToView] = useState<IMediaPlaylist | null>(null);
    const [folderToDelete, setFolderToDelete] = useState<IMediaFolders | null>(null);
    const [playlistToDelete, setPlaylistToDelete] = useState<IMediaPlaylist | null>(null);
    const [loadingFolders, setLoadingFolders] = useState<boolean>(true);
    const [currentFolder, setCurrentFolder] = useState<IMediaFolders | undefined>(undefined);
    const { getFolders, getFolder, renameFolderApi, addFolderApi, deleteFolderApi, deletePlaylistApi, addFileToFolderApi, removeFileFromFolderApi, addPlaylistToFolderApi, updateFileInFolderApi } = useMediaService();
    const { setFiles, files } = useFile();

    const addFolder = async (payload: { name: string, parent_id: number | null }): Promise<boolean> => {
        try {
            const response = await addFolderApi(payload);
            if (response.data?.status == "success" && response.data.data) {
                setFolders(response.data.data as IMediaFolders[]);
                const newFolder: IMediaFolders = {
                    name: response.data.data?.name,
                    parent_id: response.data.data?.parent_id,
                    owner_id: response.data.data?.owner_id,
                    updated_at: response.data.data?.updated_at,
                    is_system: response.data.data?.is_system ?? 0,
                    created_at: response.data.data?.created_at,
                    id: response.data.data?.id,
                    children: [],
                    files: [],
                    playlists: []
                }
                setFolders([newFolder, ...folders])
                app_notification({
                    type: 'success',
                    message: "Folder added successfuly"
                })
                return true
            } else {
                app_notification({
                    message: response.data?.raison ?? "An error occure"
                })
                return false
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }

    const getAllRootFolders = async () => {
        try {
            setLoadingFolders(true);
            setCurrentFolder(undefined);
            const response = await getFolders();
            setLoadingFolders(false);
            if (response.data?.status == "success") {
                setFolders(response.data.data as IMediaFolders[]);
            } else {
                app_notification({
                    message: response.data?.raison ?? "An error occure"
                })
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }
    const getFolderById = async (id: number) => {
        try {
            setLoadingFolders(true);
            const response = await getFolder(id);
            setLoadingFolders(false);
            if (response.data?.data) {
                setFolders(response.data?.data?.children);
                return response.data?.data
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }

    const deleteFolder = async () => {
        try {
            if (folderToDelete) {
                const response = await deleteFolderApi(folderToDelete.id);
                if (response.data?.status == "success") {
                    setFolders(folders.filter(f => f.id != folderToDelete.id))
                    app_notification({
                        type: 'success',
                        message: "Folder deleted successfully",
                    });
                    setFolderToView(null);
                    return true
                } else {
                    app_notification({
                        message: response.data?.raison ?? "Could not delete folder"
                    })
                }
            }
            return false
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }

    const renameFolder = async (newName: string) => {
        try {
            if (folderToRename) {
                const response = await renameFolderApi(folderToRename.id, newName);
                if (response.data?.status == "success") {
                    setFolders(
                        folders.reduce((prev: IMediaFolders[], next) => {
                            if (next.id == folderToRename.id) {
                                return [...prev, { ...next, name: newName }]
                            }
                            return [...prev, next];
                        }, [])
                    );
                    app_notification({
                        type: 'success',
                        message: "Folder rename successfully",
                    });
                    return true
                } else {
                    app_notification({
                        message: response.data?.raison ?? "Could not rename folder"
                    })
                }
            }
            return false
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }

    const addFileToFolder = async (payload: IAddFileToFolderApiProps) => {
        try {
            const response = await addFileToFolderApi(payload);
            if (response.data?.status == "success") {
                const newFile: IMediaFiles = response.data?.data;
                setFolders(
                    folders.reduce((prev: IMediaFolders[], next) => {
                        if (next.id == payload.folder_id) {
                            const newFolder: IMediaFolders = {
                                ...next,
                                files: [
                                    newFile, ...next.files
                                ]
                            }
                            setFolderToView(newFolder);
                            return [...prev, newFolder]
                        }
                        return [...prev, next];
                    }, [])
                );
                setFiles((prevFiles) => [newFile, ...prevFiles])
                app_notification({
                    type: 'success',
                    message: "File added successfully successfully",
                });
                return newFile
            } else {
                app_notification({
                    message: response.data?.raison ?? "Could not add file"
                })
            }
            return false
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }


    const addPlaylistToFolder = async (payload: IAddPlaylistToFolderApiProps) => {
        try {
            const response = await addPlaylistToFolderApi(payload);
            if (response.data?.status == "success") {
                const newPlaylist: IMediaPlaylist = response.data?.data;
                if (currentFolder?.id == payload.folder_id) {
                    setCurrentFolder(
                        {
                            ...currentFolder,
                            playlists: [
                                newPlaylist, ...currentFolder.playlists
                            ]
                        }
                    )
                }
                app_notification({
                    type: 'success',
                    message: "Playlist added successfully successfully",
                });
                return true
            } else {
                app_notification({
                    message: response.data?.raison ?? "Could not add playlist"
                })
            }
            return false
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }

    const deleteFileFromFolder = async (id: number) => {
        try {
            const response = await removeFileFromFolderApi(id);
            if (response.data?.status == "success") {
                const updatedFolders = folders.map((folder) => {
                    if (folder.id === folderToView?.id) {
                        const updatedFiles = folder.files.filter((f) => f.id !== id);
                        const updatedFolder = { ...folder, files: updatedFiles };

                        setFolderToView(updatedFolder);
                        return updatedFolder;
                    }
                    return folder;
                });

                setFolders(updatedFolders);
                app_notification({
                    type: 'success',
                    message: "File deleted successfully",
                });
                return true
            } else {
                app_notification({
                    message: response.data?.raison ?? "Could not delete File"
                })
            }
            return false
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }


    const updateFileInFolder = async (name: string, duration: number) => {
        try {
            const response = await updateFileInFolderApi({
                duration: duration,
                file_id: fileToUpdate?.id ?? 0,
                name: name,
                url: ""
            });
            if (response.data?.status == "success") {
                // Update the global files list
                setFiles(
                    files.map((f) =>
                        f.id === fileToUpdate?.id ? { ...f, name, duration } : f
                    )
                );

                // Update folderToView (if it exists)
                if (folderToView) {
                    const updatedFolderFiles = folderToView.files.map((f) =>
                        f.id === fileToUpdate?.id ? { ...f, name, duration } : f
                    );

                    setFolderToView({ ...folderToView, files: updatedFolderFiles });

                    // Update folders list with updated folder files
                    setFolders(
                        folders.map((folder) =>
                            folder.id === folderToView.id
                                ? { ...folder, files: updatedFolderFiles }
                                : folder
                        )
                    );
                }

                setFileToUpdate(null);
                app_notification({
                    type: 'success',
                    message: "File added successfully successfully",
                });
                return true
            } else {
                app_notification({
                    message: response.data?.raison ?? "Could not add file"
                })
            }
            return false
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }


    const deletePlaylist = async () => {
        try {
            if (playlistToDelete && currentFolder) {
                const response = await deletePlaylistApi(playlistToDelete.id);
                if (response.data?.status == "success") {
                    const updatedPlaylist: IMediaPlaylist[] = currentFolder?.playlists.filter((f) => f.id !== playlistToDelete.id);


                    setCurrentFolder({ ...currentFolder, playlists: updatedPlaylist });
                    setPlaylistToView(null);
                    setPlaylistToDelete(null);
                    app_notification({
                        type: 'success',
                        message: "Playlist deleted successfully",
                    });
                    return true
                } else {
                    app_notification({
                        message: response.data?.raison ?? "Could not delete folder"
                    })
                }
            }
            return false
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }

    return (
        <MediaContext.Provider value={{
            folders,
            setFolders,
            deleteFolder,
            folderToView,
            setFolderToView,
            folderToRename,
            setFolderToRename,
            renameFolder,
            setFolderToDelete,
            folderToDelete,
            setPlaylistToDelete,
            playlistToDelete,
            addFolder,
            getAllRootFolders,
            getFolderById,
            loadingFolders,
            setLoadingFolders,
            addFileToFolder,
            deleteFileFromFolder,
            addPlaylistToFolder,
            setCurrentFolder,
            currentFolder,
            fileToUpdate,
            setFileToUpdate,
            updateFileInFolder,
            playlistToView,
            setPlaylistToView,
            deletePlaylist
        }}>
            {children}
        </MediaContext.Provider>
    );
}

export function useMedia() {
    const context = useContext(MediaContext);
    if (!context) {
        throw new Error("useMedia must be used within an MediaProvider, Make sure component is wrapped with MediaProvider");
    }
    return { ...context };
}