'use client';

import PageSectionHeader from "@/components/PageSectionHeader";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

export default function MediaFolderShared() {

    const [showFilesGrid, setShowFilesGrid] = useState<boolean>(false);

    return (
        <div>
            <PageHeader
                title="Partage"
            />
            <PageSectionHeader
                title="📑 Mes Projets Partages"
                setShowGrid={setShowFilesGrid}
                showGrid={showFilesGrid}
            />
        </div>
    );
}
