'use client';

import AppActions from "@/components/AppActions";
import AppBadge from "@/components/AppBadge";
import CustomTable from "@/components/CustomTable";
import PageHeader from "@/components/PageHeader";
import PageSectionHeader from "@/components/PageSectionHeader";
import { mediaFolders } from "@/constant/data";
import { IDropdownItems, IMediaFolders } from "@/constant/interphase";
import { mediaFolderHeader } from "@/constant/tableHeaders";

export default function MediaFoldersPage() {
  const actions: IDropdownItems[] = [{
    icon: "👁️",
    name: "Aperçu"
  }, {
    icon: "🖊", name: "Renommer"
  }, {
    icon: "❌", name: "Supprimer"
  }]
  return (
    <div>
      <PageHeader title="🗃️ Médiathèque" />
      <PageSectionHeader />

      <CustomTable
        headers={mediaFolderHeader}
        data={mediaFolders}
        renderRow={(item, index) => {
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
                  <AppActions actions={actions} />
                </div>
              </td>
            </>
          )
        }}
      />
    </div>
  );
}
