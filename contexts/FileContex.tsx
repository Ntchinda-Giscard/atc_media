'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


interface FileContextProps {
    isLoadingFiles: boolean;
    setIsLoadingFiles: Dispatch<SetStateAction<boolean>>;
}

const FileContext = createContext<FileContextProps | null>(null);

export function FileProvider({ children }: { children: ReactNode }) {
    const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(true);

    return (
        <FileContext.Provider value={{
            isLoadingFiles,
            setIsLoadingFiles
        }}>
            {children}
        </FileContext.Provider>
    )
}


export function useFile() {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error("useFile must be used within an FileProvider, Make sure component is wrapped with FileProvider");
    }
    return { ...context };
}