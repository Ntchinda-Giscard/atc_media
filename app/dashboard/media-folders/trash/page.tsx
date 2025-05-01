'use client';

import PageHeader from "@/components/PageHeader";
import PageSectionHeader from "@/components/PageSectionHeader";
import { useState } from "react";

export default function MediaFolderTrash() {

    const [showFilesGrid, setShowFilesGrid] = useState<boolean>(false);

    return (
        <div>
            <PageHeader
                title="Corbeille"
            />
            <PageSectionHeader
                title="📑 Mes Projets suprimer"
                setShowGrid={setShowFilesGrid}
                showGrid={showFilesGrid}
            />
        </div>
    );
}
