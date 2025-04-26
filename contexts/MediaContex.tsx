'use client';
import { app_notification } from '@/app/dashboard/utils/notification-center';
import { IMediaFolders } from '@/constant/interphase';
import useMediaService from '@/lib/hooks/useMediaService';
import { createContext, useState, useContext, SetStateAction, Dispatch } from 'react';

interface MediaContextProps {
    folders: IMediaFolders[];
    setFolders: Dispatch<SetStateAction<IMediaFolders[]>>;
    folderToRename: IMediaFolders | null;
    setFolderToRename: Dispatch<SetStateAction<IMediaFolders | null>>;
    folderToView: IMediaFolders | null;
    setFolderToView: Dispatch<SetStateAction<IMediaFolders | null>>;
    deleteFolder: () => Promise<boolean>;
    setFolderToDelete: Dispatch<SetStateAction<IMediaFolders | null>>;
    folderToDelete: IMediaFolders | null;
    renameFolder: (newName: string) => Promise<boolean>;
    addFolder: (payload: { name: string, parent_id: number | null }) => Promise<boolean>;
    modifyFolder: (folder: IMediaFolders) => boolean;
    getAllRootFolders: () => void;
    getFolderById: (id: number) => any;
    setLoadingFolders: (value: boolean) => void;
    loadingFolders: boolean;
}

const MediaContext = createContext<MediaContextProps | null>(null);

export function MediaProvider({ children }: { children: React.ReactNode }) {
    const [folders, setFolders] = useState<IMediaFolders[]>([]);
    const [folderToRename, setFolderToRename] = useState<IMediaFolders | null>(null);
    const [folderToView, setFolderToView] = useState<IMediaFolders | null>(null);
    const [folderToDelete, setFolderToDelete] = useState<IMediaFolders | null>(null);
    const [loadingFolders, setLoadingFolders] = useState<boolean>(true);
    const { getFolders, getFolder, renameFolderApi, addFolderApi, deleteFolderApi } = useMediaService();

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
                    files: []
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
        } catch (error) {
            console.log(error)
            app_notification({
                message: "An error occure"
            })
            return false
        }
    }

    const getAllRootFolders = async () => {
        try {
            setLoadingFolders(true);
            const response = await getFolders();
            setLoadingFolders(false);
            if (response.data?.status == "success") {
                setFolders(response.data.data as IMediaFolders[]);
            } else {
                app_notification({
                    message: response.data?.raison ?? "An error occure"
                })
            }
        } catch (error) {
            console.log(error)
            app_notification({
                message: "An error occure"
            })
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
        } catch (error) {
            console.log(error)
            app_notification({
                message: "An error occure"
            })
        }
    }

    const modifyFolder = (folder: IMediaFolders): boolean => {
        setFolders(
            folders.reduce((prev: IMediaFolders[], next) => {
                if (next.id == folder.id) {
                    return [...prev, folder]
                }
                return [...prev, next];
            }, [])
        );
        setFolderToView(null);
        return true;
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
                    return true
                } else {
                    app_notification({
                        message: response.data?.raison ?? "Could not delete folder"
                    })
                }
            }
            return false
        } catch (error) {
            console.log(error)
            app_notification({
                message: "An error occure"
            })
            return false
        }
    }
    // const restoreFolder = (id: number) => {
    //     const folder: IMediaFolders | undefined = folders.find(f => f.id == id);
    //     if (!folder) {
    //         alert("Ce dossier n'existe pas.")
    //         return
    //     }
    //     setFolders(folders.reduce((prev: IMediaFolders[], next) => {
    //         if (next.id == id) {
    //             return [...prev, { ...next, status: 'ACTIVE' }]
    //         }
    //         return [...prev, next];
    //     }, []))
    //     alert('Ce dossier a été restauré avec succès.');
    // }

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
        } catch (error) {
            console.log(error)
            app_notification({
                message: "An error occure"
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
            addFolder,
            modifyFolder,
            getAllRootFolders,
            getFolderById,
            loadingFolders,
            setLoadingFolders,
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