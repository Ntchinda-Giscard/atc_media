'use client';

import AppBadge from "@/components/AppBadge";
import CustomTable from "@/components/CustomTable";
import PageHeader from "@/components/PageHeader";
import PageSectionHeader from "@/components/PageSectionHeader";
import { mediaFolders } from "@/constant/data";
import { IMediaFolders } from "@/constant/interphase";
import { mediaFolderHeader } from "@/constant/tableHeaders";

export default function MediaFoldersPage() {
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
              <td className="flex items-center justify-center px-2 py-3 whitespace-nowrap">
                <AppBadge
                  title={folder.shared}
                  error={folder.shared == "Non"}
                />
              </td>
              <td className="px-2 py-3 text-[15px] font-medium text-center whitespace-nowrap">
                { }
              </td>
            </>
          )
        }}
      />
    </div>
  );
}
