'use client';

import PageSectionHeader from "@/components/PageSectionHeader";
import FileGridDisplay from "@/components/FileGridDisplay";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { useFile } from "@/contexts/FileContex";
import { Skeleton } from "@mantine/core";
import { RefreshCw } from "lucide-react";

export default function MediaFolderImports() {

    const {
        files,
        getAllProjectFiles,
        isLoadingFiles,
        hasLoaded
    } = useFile();
    const [showFilesGrid, setShowFilesGrid] = useState<boolean>(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!hasLoaded) {
            getAllProjectFiles();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    const filteredFiles = files?.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <PageHeader
                title="Importation"
                secondaryIconClick={getAllProjectFiles}
                secondaryIcon={<RefreshCw size={30} />}
            />
            <PageSectionHeader
                title="📑 Mes Fichers enregistrés"
                setShowGrid={setShowFilesGrid}
                showGrid={showFilesGrid}
                searchQuery={query}
                onChangeSearch={setQuery}
                hideGridShow
            />
            {
                isLoadingFiles ?
                    <>
                        <Skeleton height={150} />
                    </>
                    :
                    <div className="mb-5">
                        <div className="flex flex-wrap gap-5 mb-5">
                            {
                                filteredFiles.map(file => {
                                    return (
                                        <FileGridDisplay key={file.id} file={file} />
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </div>
    );
}
