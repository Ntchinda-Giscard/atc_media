'use client';
import { app_notification } from '@/app/dashboard/utils/notification-center';
import { IMediaFolders } from '@/constant/interphase';
import useMediaService from '@/lib/hooks/useMediaService';
import { createContext, useState, useContext, SetStateAction, Dispatch, useEffect } from 'react';

interface MediaContextProps {
    folders: IMediaFolders[];
    deletedfolders: IMediaFolders[];
    activefolders: IMediaFolders[];
    setFolders: Dispatch<SetStateAction<IMediaFolders[]>>;
    folderToRename: IMediaFolders | null;
    setFolderToRename: Dispatch<SetStateAction<IMediaFolders | null>>;
    folderToView: IMediaFolders | null;
    setFolderToView: Dispatch<SetStateAction<IMediaFolders | null>>;
    deleteFolder: () => void;
    setFolderToDelete: Dispatch<SetStateAction<IMediaFolders | null>>;
    folderToDelete: IMediaFolders | null;
    renameFolder: (newName: string) => void;
    restoreFolder: (id: number) => void;
    addFolder: (folder: IMediaFolders) => boolean;
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
    const [activefolders, setActiveFolders] = useState<IMediaFolders[]>([]);
    const [deletedfolders, setDeletedFolders] = useState<IMediaFolders[]>([]);
    const [loadingFolders, setLoadingFolders] = useState<boolean>(true);
    const { getFolders, getFolder, renameFolderApi } = useMediaService();

    useEffect(() => {
        setActiveFolders(folders.filter(f => f.status == "ACTIVE"))
        setDeletedFolders(folders.filter(f => f.status == "DELETED"))
    }, [folders]);

    const addFolder = (folder: IMediaFolders): boolean => {
        setFolders([folder, ...folders]);
        return true
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

    const deleteFolder = () => {
        if (folderToDelete) {
            setFolders(folders.reduce((prev: IMediaFolders[], next) => {
                if (next.id == folderToDelete.id) {
                    return [...prev, { ...next, status: 'DELETED' }]
                }
                return [...prev, next];
            }, []))
            alert('Dossier supprimé avec succès.');
            setFolderToDelete(null);
        }
    }
    const restoreFolder = (id: number) => {
        const folder: IMediaFolders | undefined = folders.find(f => f.id == id);
        if (!folder) {
            alert("Ce dossier n'existe pas.")
            return
        }
        setFolders(folders.reduce((prev: IMediaFolders[], next) => {
            if (next.id == id) {
                return [...prev, { ...next, status: 'ACTIVE' }]
            }
            return [...prev, next];
        }, []))
        alert('Ce dossier a été restauré avec succès.');
    }

    const renameFolder = async (newName: string) => {
        if (folderToRename) {
            try {
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
                    setFolderToRename(null);
                    app_notification({
                        type: 'success',
                        message: "Folder rename successfully",
                    });
                } else {
                    app_notification({
                        message: "Could not rename folder"
                    })
                }
            } catch (error) {
                console.log(error)
                app_notification({
                    message: "An error occure"
                })
            }
        }
    }

    return (
        <MediaContext.Provider value={{
            folders,
            activefolders,
            deletedfolders,
            setFolders,
            deleteFolder,
            folderToView,
            setFolderToView,
            folderToRename,
            setFolderToRename,
            renameFolder,
            setFolderToDelete,
            folderToDelete,
            restoreFolder,
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