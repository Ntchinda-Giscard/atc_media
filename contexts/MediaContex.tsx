'use client';
import { IMediaFolders } from '@/constant/interphase';
import { createContext, useState, useContext, SetStateAction, Dispatch, useEffect } from 'react';

interface MediaContextProps {
    folders: IMediaFolders[];
    deletedfolders: IMediaFolders[];
    activefolders: IMediaFolders[];
    sharedfolders: IMediaFolders[];
    setFolders: Dispatch<SetStateAction<IMediaFolders[]>>;
    folderToRename: IMediaFolders | null;
    setFolderToRename: Dispatch<SetStateAction<IMediaFolders | null>>;
    folderToView: IMediaFolders | null;
    setFolderToView: Dispatch<SetStateAction<IMediaFolders | null>>;
    deleteFolder: () => void;
    setFolderToDelete: Dispatch<SetStateAction<IMediaFolders | null>>;
    folderToDelete: IMediaFolders | null;
    renameFolder: (newName: string) => void;
    restoreFolder: (id: string) => void;
    addFolder: (folder: IMediaFolders) => boolean;
    modifyFolder: (folder: IMediaFolders) => boolean;
}

const MediaContext = createContext<MediaContextProps | null>(null);

export function MediaProvider({ children }: { children: React.ReactNode }) {
    const [folders, setFolders] = useState<IMediaFolders[]>([]);
    const [folderToRename, setFolderToRename] = useState<IMediaFolders | null>(null);
    const [folderToView, setFolderToView] = useState<IMediaFolders | null>(null);
    const [folderToDelete, setFolderToDelete] = useState<IMediaFolders | null>(null);
    const [activefolders, setActiveFolders] = useState<IMediaFolders[]>([]);
    const [deletedfolders, setDeletedFolders] = useState<IMediaFolders[]>([]);
    const [sharedfolders, setSharedFolders] = useState<IMediaFolders[]>([]);

    useEffect(() => {
        setActiveFolders(folders.filter(f => f.status == "ACTIVE"))
        setDeletedFolders(folders.filter(f => f.status == "DELETED"))
        setSharedFolders(folders.filter(f => f.shared.length > 0))
    }, [folders]);

    const addFolder = (folder: IMediaFolders): boolean => {
        setFolders([folder, ...folders]);
        return true
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
    const restoreFolder = (id: string) => {
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

    const renameFolder = (newName: string) => {
        if (folderToRename) {
            setFolders(
                folders.reduce((prev: IMediaFolders[], next) => {
                    if (next.id == folderToRename.id) {
                        return [...prev, { ...next, name: newName }]
                    }
                    return [...prev, next];
                }, [])
            );
            alert('Dossier modifié avec succès.');
            setFolderToRename(null);
        }
    }

    return (
        <MediaContext.Provider value={{
            folders,
            activefolders,
            deletedfolders,
            sharedfolders,
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