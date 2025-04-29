'use client';

import PageSectionHeader from "@/components/PageSectionHeader";
import { IDropdownItems } from "@/constant/interphase";
import FileGridDisplay from "@/components/FileGridDisplay";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

export default function MediaFolderImports() {

    const [showFilesGrid, setShowFilesGrid] = useState<boolean>(false);

    const fileActions: IDropdownItems[] = [{
        icon: "👁️",
    }, {
        icon: "🖊",
    }, {
        icon: "❌",
    }];

    return (
        <div>
            <PageHeader
                title="Importation"
            />
            <PageSectionHeader
                title="📑 Mes Fichers enregistrés"
                setShowGrid={setShowFilesGrid}
                showGrid={showFilesGrid}
                actionButtonText="Nouveau dossier"
            />
            <FileGridDisplay fileAcation={fileActions} />
        </div>
    );
}
