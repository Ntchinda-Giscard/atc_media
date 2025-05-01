'use client';

import { app_notification } from "@/app/dashboard/utils/notification-center";
import { IMediaFiles } from "@/constant/interphase";
import useFileService from "@/lib/hooks/useFileService";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


interface FileContextProps {
    isLoadingFiles: boolean;
    hasLoaded: boolean;
    setIsLoadingFiles: Dispatch<SetStateAction<boolean>>;
    files: IMediaFiles[];
    setFiles: Dispatch<SetStateAction<IMediaFiles[]>>;
    fileToPreview: IMediaFiles | null;
    setFileToPreview: Dispatch<SetStateAction<IMediaFiles | null>>;
    getAllProjectFiles: () => void;
}

const FileContext = createContext<FileContextProps | null>(null);

export function FileProvider({ children }: { children: ReactNode }) {
    const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(true);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);
    const [files, setFiles] = useState<IMediaFiles[]>([]);
    const { getFiles } = useFileService();
    const [fileToPreview, setFileToPreview] = useState<IMediaFiles | null>(null);


    const getAllProjectFiles = async () => {
        try {
            setIsLoadingFiles(true);
            const response = await getFiles();
            setIsLoadingFiles(false);
            if (response.data?.status == "success") {
                setHasLoaded(true)
                setFiles(response.data.data as IMediaFiles[]);
            } else {
                app_notification({
                    message: response.data?.raison ?? "An error occure"
                })
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            app_notification({
                message: error?.response?.data?.reason ?? "An error occure"
            })
            return false
        }
    }

    return (
        <FileContext.Provider value={{
            isLoadingFiles,
            hasLoaded,
            setIsLoadingFiles,
            files,
            setFiles,
            getAllProjectFiles, 
            fileToPreview, 
            setFileToPreview
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