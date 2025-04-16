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
import { useState } from "react";
import PlayListGridItem from "./components/PlayListGridItem";
import PlayListListItem from "./components/PlayListListItem";
import AddNewFolderModal from "./components/AddNewFolderModal";
import { PlusCircle } from "lucide-react";
import RenameFolderModal from "./components/RenameFolderModal";
import DeleteFolderModal from "./components/DeleteFolderModal";

export default function MediaFoldersPage() {
  const folderActions: IDropdownItems[] = [{
    icon: "👁️",
    name: "Aperçu"
  }, {
    icon: "🖊", name: "Renommer", onClick() {
      setRenameFolder(true)
    },
  }, {
    icon: "❌", name: "Supprimer", onClick() {
      setDeleteFolder(true)
    }
  }];
  const plalistActions: IDropdownItems[] = [{
    icon: "👁️",
    name: "Aperçu"
  }, {
    icon: "🖊", name: "Renommer"
  }, {
    icon: "❌", name: "Supprimer"
  }];

  const [showFolderGrid, setShowFolderGrid] = useState<boolean>(false);
  const [showPlayListGrid, setShowPlayListGrid] = useState<boolean>(false);
  const [addNewFolder, setAddNewFolder] = useState<boolean>(false);
  const [renameFolder, setRenameFolder] = useState<boolean>(false);
  const [deleteFolder, setDeleteFolder] = useState<boolean>(false);
  return (
    <div>
      <PageHeader title="🗃️ Médiathèque" />
      <PageSectionHeader
        title="🗂 Dossiers"
        setShowGrid={setShowFolderGrid}
        showGrid={showFolderGrid}
        actionButtonText="Nouveau dossier"
        actionButtonIcon={
          <PlusCircle size={20} className='text-[var(--white)]' />
        }
        actionButtonClick={() => setAddNewFolder(true)}
      />
      <div className="mb-5">
        {
          showFolderGrid ?
            <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 xl:grid-cols-3">
              {
                mediaFolders.map(folder => (
                  <FolderGridItem key={folder.id} folder={folder} options={folderActions} />
                ))
              }
            </div>
            :
            <CustomTable
              headers={mediaFolderHeader}
              data={mediaFolders}
              renderRow={(item) => {
                const folder = item as IMediaFolders;
                return (
                  <>
                    <td className="px-2 py-2 text-[15px] font-medium text-center whitespace-nowrap">
                      {folder.name}
                    </td>
                    <td className="px-2 py-2 text-[15px] font-normal text-center whitespace-nowrap">
                      {folder.content}
                    </td>
                    <td className="px-2 py-2 text-[15px] font-normal text-center whitespace-nowrap">
                      {folder.name}
                    </td>
                    <td className="px-2 py-2 text-[15px] font-normal text-center whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <AppBadge
                          title={folder.shared}
                          error={folder.shared == "Non"}
                        />

                      </div>
                    </td>
                    <td className="px-2 py-3 text-[15px] font-medium text-center whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <AppActions actions={folderActions} />
                      </div>
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
        actionButtonClick={() => null} />
      <div>
        {
          showPlayListGrid ?
            mediaPlaylist.map(playlist =>
              <PlayListGridItem options={plalistActions} playlist={playlist} />
            )
            :
            mediaPlaylist.map(playlist =>
              <PlayListListItem actions={plalistActions} playlist={playlist} />
            )
        }
      </div>

      <AddNewFolderModal
        isOpen={addNewFolder}
        onClose={() => setAddNewFolder(false)}
      />
      <RenameFolderModal
        isOpen={renameFolder}
        onClose={() => setRenameFolder(false)}
      />
      <DeleteFolderModal
        isOpen={deleteFolder}
        onClose={() => setDeleteFolder(false)}
      />
    </div>
  );
}
