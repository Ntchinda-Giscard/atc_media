'use client';

import AppActions from "@/components/AppActions";
import CustomTable from "@/components/CustomTable";
import PageHeader from "@/components/PageHeader";
import PageSectionHeader from "@/components/PageSectionHeader";
import { IDropdownItems, IMediaFolders, IMediaPlaylist } from "@/constant/interphase";
import { mediaFolderHeader } from "@/constant/tableHeaders";
import FolderGridItem from "../../components/FolderGridItem";
import React, { use, useCallback, useEffect, useState } from "react";
import PlayListGridItem from "../../components/PlayListGridItem";
import PlayListListItem from "../../components/PlayListListItem";
import AddNewFolderModal from "../../components/AddNewFolderModal";
import { ChevronLeft, PlusCircle, RefreshCw } from "lucide-react";
import RenameFolderModal from "../../components/RenameFolderModal";
import DeleteFolderModal from "../../components/DeleteFolderModal";
import { useRouter } from "next/navigation";
import { useMedia } from "@/contexts/MediaContex";
import { Skeleton } from "@mantine/core";
import ViewFolderModal from "../../components/ViewFolderModal";
import { convertArrayOfFilesToString, formatDate } from "@/lib/utils";
import AppBadge from "@/components/AppBadge";
import AddPlaylistModal from "../../components/AddPlaylistModal";
import PreviewFileModal from "@/components/PreviewFileModal";
import { useFile } from "@/contexts/FileContex";
import UpdateFileModal from "../../components/UpdateFileModal";
import ViewPlaylistModal from "../../components/ViewPlaylistModal";
import { app_notification } from "@/app/dashboard/utils/notification-center";
import DeletePlaylistModal from "../../components/DeletePlaylistModal";

type MediaFoldersPageProps = {
    params: Promise<{ slug?: string[] }>
};

export default function MediaFolderProjects({
    params: paramsPromise
}: MediaFoldersPageProps) {
    const {
        folders,
        getAllRootFolders,
        getFolderById,
        folderToRename,
        setFolderToRename,
        folderToDelete,
        setFolderToDelete,
        setFolderToView,
        folderToView,
        loadingFolders,
        setCurrentFolder,
        currentFolder,
        fileToUpdate,
        setFileToUpdate,
        playlistToView,
        setPlaylistToView,
        playlistToDelete,
        setPlaylistToDelete,
    } = useMedia();
    const {
        fileToPreview,
        setFileToPreview
    } = useFile()
    const [query, setQuery] = useState('');
    const [queryPlaylist, setQueryPlaylist] = useState('');
    const router = useRouter();
    const params = use(paramsPromise);

    const [showFolderGrid, setShowFolderGrid] = useState<boolean>(false);
    const [showPlayListGrid, setShowPlayListGrid] = useState<boolean>(false);
    const [addNewFolder, setAddNewFolder] = useState<boolean>(false);
    const [addPlaylist, setAddPlaylist] = useState<boolean>(false);
    const [playlists, setPlaylists] = useState<IMediaPlaylist[]>([]);
    const filteredFolder = folders?.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    const filteredPlaylist = playlists?.filter((item) =>
        item.name.toLowerCase().includes(queryPlaylist.toLowerCase())
    );

    const goBack = useCallback(() => {
        router.push('/dashboard/media-folders/projects');
    }, [router]);

    const getFolders = async () => {
        if (Array.isArray(params?.slug) && params.slug.length > 0) {
            const slug = params.slug[0];
            const response = await getFolderById(Number(slug));
            if (response) {
                setCurrentFolder(response)
            } else {
                goBack();
            }
        } else {
            getAllRootFolders();
        }
    }

    useEffect(() => {
        getFolders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentFolder) {
            setPlaylists(currentFolder?.playlists ?? [])
        }
    }, [currentFolder])

    const folderActions: IDropdownItems[] = [{
        icon: "👁️",
        name: " Ovrire", onClick(id?: number) {
            const folder: IMediaFolders | undefined = folders.find(f => f.id == id);
            if (!folder) {
                app_notification({
                    message: "Ce dossier n'existe pas."
                })
                return
            }
            router.push('/dashboard/media-folders/projects/' + folder.id)
        },
    }, {
        icon: "🖊", name: " Renommer", onClick(id?: number) {
            const folder: IMediaFolders | undefined = folders.find(f => f.id == id);
            if (!folder) {
                app_notification({
                    message: "Ce dossier n'existe pas."
                })
                return
            }
            setFolderToRename(folder);
        },
    }, {
        icon: "❌", name: " Supprimer", onClick(id?: number) {
            const folder: IMediaFolders | undefined = folders.find(f => f.id == id);
            if (!folder) {
                app_notification({
                    message: "Ce dossier n'existe pas."
                })
                return
            }
            setFolderToDelete(folder);
        },
    }];
    const plalistActions: IDropdownItems[] = [{
        icon: "👁️",
        name: "Aperçu",
        onClick(id?: number) {
            const playlist: IMediaPlaylist | undefined = playlists.find(p => p.id == id);
            if (!playlist) {
                app_notification({
                    message: "Cette playlist n'existe pas."
                })
                return
            }
            setPlaylistToView(playlist)
        },
    }, {
        icon: "🖊", name: "Renommer"
    }, {
        icon: "❌", name: "Supprimer",
        onClick(id?: number) {
            const playlist: IMediaPlaylist | undefined = playlists.find(p => p.id == id);
            if (!playlist) {
                app_notification({
                    message: "Cette playlist n'existe pas."
                })
                return
            }
            setPlaylistToDelete(playlist)
        },
    }];


    return (
        <div>
            <PageHeader
                title={currentFolder ? "📁 " + currentFolder.name : "🗃️ Médiathèque "}
                iconClick={() => router.back()}
                icon={currentFolder && <ChevronLeft size={50} />}
                secondaryIconClick={getFolders}
                secondaryIcon={<RefreshCw size={30} />}
            />
            <PageSectionHeader
                title="📁 Dossiers"
                setShowGrid={setShowFolderGrid}
                showGrid={showFolderGrid}
                actionButtonText="Nouveau dossier"
                searchQuery={query}
                onChangeSearch={setQuery}
                actionButtonIcon={
                    <PlusCircle size={20} className='text-[var(--white)]' />
                }
                actionButtonClick={() => setAddNewFolder(true)}
            // hideActionButton={page.length > 0}
            />
            {
                loadingFolders ?
                    <>
                        <Skeleton height={150} />
                    </>
                    :
                    <div className="mb-5">
                        {
                            showFolderGrid ?
                                <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 xl:grid-cols-3">
                                    {
                                        filteredFolder.map(folder => (
                                            <FolderGridItem key={folder.id} folder={folder} options={folderActions} onClick={() => setFolderToView(folders?.find(f => f.id == folder.id) ?? null)} />
                                        ))
                                    }
                                </div>
                                :
                                <CustomTable
                                    headers={mediaFolderHeader}
                                    data={filteredFolder}
                                    onClick={(id: number) => setFolderToView(folders?.find(f => f.id == id) ?? null)}
                                    renderRow={(item, index, onClick) => {
                                        const folder = item as IMediaFolders;
                                        return (
                                            <>
                                                <td className="px-2 py-2 text-[15px] font-medium text-center" onClick={() => onClick && onClick(folder.id)}>
                                                    {folder.name}
                                                </td>
                                                <td className="px-2 py-2 text-[15px] font-normal text-center" onClick={() => onClick && onClick(folder.id)}>
                                                    {convertArrayOfFilesToString(folder)}
                                                </td>
                                                <td className="px-2 py-2 text-[15px] font-normal text-center whitespace-nowrap" onClick={() => onClick && onClick(folder.id)}>
                                                    {formatDate(folder.created_at)}
                                                </td>
                                                <td className="px-2 py-2 text-[15px] font-normal text-center whitespace-nowrap" onClick={() => onClick && onClick(folder.id)}>
                                                    <div className="flex items-center justify-center">
                                                        <AppBadge
                                                            title={"Non"}
                                                            error
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-2 py-3 text-[15px] font-medium text-center whitespace-nowrap">
                                                    <div className="flex items-center justify-center" onClick={() => null}>
                                                        <AppActions actions={folderActions} id={folder.id} />
                                                    </div>
                                                </td>
                                            </>
                                        )
                                    }}
                                />
                        }
                    </div>
            }

            {
                currentFolder &&
                <React.Fragment>
                    <PageSectionHeader
                        title="🎵 Playlists"
                        setShowGrid={setShowPlayListGrid}
                        showGrid={showPlayListGrid}
                        searchQuery={queryPlaylist}
                        onChangeSearch={setQueryPlaylist}
                        actionButtonText="Nouvelle playlist"
                        actionButtonIcon={
                            <PlusCircle size={20} className='text-[var(--white)]' />
                        }
                        actionButtonClick={() => {
                            setAddPlaylist(true)
                        }}
                    />
                    {
                        loadingFolders ?
                            <>
                                <Skeleton height={150} />
                            </>
                            :
                            <div>
                                {
                                    showPlayListGrid ?
                                        filteredPlaylist.map(playlist =>
                                            <PlayListGridItem key={playlist.id} options={plalistActions}
                                                playlist={playlist}
                                            />
                                        )
                                        :
                                        filteredPlaylist.map(playlist =>
                                            <PlayListListItem key={playlist.id} actions={plalistActions}
                                                playlist={playlist} />
                                        )
                                }
                            </div>
                    }
                </React.Fragment>
            }

            <AddNewFolderModal
                isOpen={addNewFolder}
                onClose={() => setAddNewFolder(false)}
                currentFolder={currentFolder}
            />
            <ViewFolderModal
                isOpen={!!folderToView}
                onClose={() => setFolderToView(null)}
            />
            <RenameFolderModal
                isOpen={!!folderToRename}
                onClose={() => setFolderToRename(null)}
            />
            <DeleteFolderModal
                isOpen={!!folderToDelete}
                onClose={() => setFolderToDelete(null)}
            />
            {
                currentFolder &&
                <AddPlaylistModal
                    isOpen={addPlaylist}
                    onClose={() => setAddPlaylist(false)}
                    folder={currentFolder}
                />
            }

            {
                fileToPreview &&
                <PreviewFileModal
                    file={fileToPreview}
                    isOpen={!!fileToPreview}
                    onClose={() => setFileToPreview(null)}
                />
            }

            {
                fileToUpdate &&
                <UpdateFileModal
                    isOpen={!!fileToUpdate}
                    onClose={() => setFileToUpdate(null)}
                />
            }
            {
                playlistToView &&
                <ViewPlaylistModal
                    isOpen={!!playlistToView}
                    onClose={() => setPlaylistToView(null)}
                />
            }
            {
                playlistToDelete &&
                <DeletePlaylistModal
                    isOpen={!!playlistToDelete}
                    onClose={() => setPlaylistToDelete(null)}
                />
            }
        </div>
    );
}
