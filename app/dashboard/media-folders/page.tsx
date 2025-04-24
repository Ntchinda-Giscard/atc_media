'use client';

import AppActions from "@/components/AppActions";
import AppBadge from "@/components/AppBadge";
import CustomTable from "@/components/CustomTable";
import PageHeader from "@/components/PageHeader";
import PageSectionHeader from "@/components/PageSectionHeader";
import { mediaFolders, mediaPlaylist } from "@/constant/data";
import { IDropdownItems, IMediaFolders } from "@/constant/interphase";
import { mediaFolderHeader } from "@/constant/tableHeaders";
import FolderGridItem from "./components/FolderGridItem";
import { useEffect, useState } from "react";
import PlayListGridItem from "./components/PlayListGridItem";
import PlayListListItem from "./components/PlayListListItem";
import AddNewFolderModal from "./components/AddNewFolderModal";
import { ListRestart, PlusCircle } from "lucide-react";
import RenameFolderModal from "./components/RenameFolderModal";
import DeleteFolderModal from "./components/DeleteFolderModal";
import { useSearchParams } from "next/navigation";
import { useMedia } from "@/contexts/MediaContex";
import { convertArrayOfFilesToString } from "@/lib/utils";
import ViewFolderModal from "./components/ViewFolderModal";

export default function MediaFoldersPage() {
  const { activefolders, deletedfolders, sharedfolders, folderToRename, setFolderToRename, folderToDelete, setFolderToDelete, restoreFolder, setFolderToView, folderToView } = useMedia();
  const [folders, setFolders] = useState<IMediaFolders[]>([]);
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  useEffect(() => {
    switch (tab) {
      case "shared":
        setPage("Partager")
        setFolders(sharedfolders);
        break;
      case "trash":
        setPage("Supprimer")
        setFolders(deletedfolders);
        break;
      default:
        setFolders(activefolders);
        setPage("")
        break;
    }

  }, [tab, activefolders, deletedfolders, sharedfolders])


  const filteredFolder = folders.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );


  const folderActions: IDropdownItems[] = [{
    icon: "👁️",
    name: "Aperçu", onClick(id?: string) {
      const folder: IMediaFolders | undefined = folders.find(f => f.id == id);
      if (!folder) {
        alert("Ce dossier n'existe pas.")
        return
      }
      setFolderToView(folder);
    },
  }, {
    icon: "🖊", name: "Renommer", onClick(id?: string) {
      const folder: IMediaFolders | undefined = folders.find(f => f.id == id);
      if (!folder) {
        alert("Ce dossier n'existe pas.")
        return
      }
      setFolderToRename(folder);
    },
  }, {
    icon: "❌", name: "Supprimer", onClick(id?: string) {
      const folder: IMediaFolders | undefined = folders.find(f => f.id == id);
      if (!folder) {
        alert("Ce dossier n'existe pas.")
        return
      }
      setFolderToDelete(folder);
    },
  }];
  const plalistActions: IDropdownItems[] = [{
    icon: "👁️",
    name: "Aperçu"
  }, {
    icon: "🖊", name: "Renommer"
  }, {
    icon: "❌", name: "Supprimer"
  }];

  const [page, setPage] = useState<string>("");
  const [showFolderGrid, setShowFolderGrid] = useState<boolean>(false);
  const [showPlayListGrid, setShowPlayListGrid] = useState<boolean>(false);
  const [addNewFolder, setAddNewFolder] = useState<boolean>(false);

  return (
    <div>
      <PageHeader title={"🗃️ Médiathèque " + page} />
      <PageSectionHeader
        title="🗂 Dossiers"
        setShowGrid={setShowFolderGrid}
        showGrid={showFolderGrid}
        actionButtonText="Nouveau dossier"
        searchQuery={query}
        onChangeSearch={setQuery}
        actionButtonIcon={
          <PlusCircle size={20} className='text-[var(--white)]' />
        }
        actionButtonClick={() => setAddNewFolder(true)}
        hideActionButton={page.length > 0}
      />
      <div className="mb-5">
        {
          showFolderGrid ?
            <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 xl:grid-cols-3">
              {
                filteredFolder.map(folder => (
                  <FolderGridItem key={folder.id} folder={folder} options={folderActions} />
                ))
              }
            </div>
            :
            <CustomTable
              headers={mediaFolderHeader}
              data={filteredFolder}
              renderRow={(item) => {
                const folder = item as IMediaFolders;
                return (
                  <>
                    <td className="px-2 py-2 text-[15px] font-medium text-center">
                      {folder.name}
                    </td>
                    <td className="px-2 py-2 text-[15px] font-normal text-center">
                      {convertArrayOfFilesToString(folder.content)}
                    </td>
                    <td className="px-2 py-2 text-[15px] font-normal text-center whitespace-nowrap">
                      {folder.createdAt}
                    </td>
                    <td className="px-2 py-2 text-[15px] font-normal text-center whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <AppBadge
                          title={folder.shared.length == 0 ? "Non" : "Oui"}
                          error={folder.shared.length == 0}
                        />
                      </div>
                    </td>
                    <td className="px-2 py-3 text-[15px] font-medium text-center whitespace-nowrap">
                      {
                        tab == "trash" ?
                          (
                            <div className="gap-2 cursor-pointer col-center" onClick={() => restoreFolder(folder.id)}>
                              <ListRestart color="var(--primary-color)" />
                              Restorer
                            </div>
                          ) :
                          (
                            <div className="flex items-center justify-center">
                              <AppActions actions={folderActions} id={folder.id} />
                            </div>
                          )
                      }
                    </td>
                  </>
                )
              }}
            />
        }
      </div>
      <PageSectionHeader
        title="🎵 Playlists"
        setShowGrid={setShowPlayListGrid}
        showGrid={showPlayListGrid}
        actionButtonText="Nouvelle playlist"
        actionButtonIcon={
          <PlusCircle size={20} className='text-[var(--white)]' />
        }
        actionButtonClick={() => null}
        hideActionButton={page.length > 0}
      />
      <div>
        {
          showPlayListGrid ?
            mediaPlaylist.map(playlist =>
              <PlayListGridItem key={playlist.id} options={plalistActions} 
              //@ts-ignore
              playlist={playlist} 
              />
            )
            :
            mediaPlaylist.map(playlist =>
              <PlayListListItem key={playlist.id} actions={plalistActions}
              //@ts-ignore
               playlist={playlist} />
            )
        }
      </div>

      <AddNewFolderModal
        isOpen={addNewFolder}
        onClose={() => setAddNewFolder(false)}
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
    </div>
  );
}
