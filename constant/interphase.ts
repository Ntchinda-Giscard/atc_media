
export interface ICustomTableHeader {
    title: string;
}

export type FileType = 'IMAGE' | 'VIDEO' | 'DOC' | 'WEB';
export type FolderStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';
export interface ICustomTableData {
    [key: string]: string | number | boolean | undefined | null | IMediaFolders | IMediaFiles[] | string[] | IMediaFolders[] | IMediaFileMetadata | IMediaPlaylist[] | [];
}

export interface IMediaFolders extends ICustomTableData {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    parent_id?: number;
    owner_id: number;
    is_system: number;
    children: IMediaFolders[];
    files: IMediaFiles[];
    playlists: IMediaPlaylist[]
}

export interface IDropdownItems {
    name?: string;
    icon?: React.ReactNode;
    onClick?: (id?: number) => void;
}

export interface IMediaFiles extends ICustomTableData {
    id: number;
    name: string,
    path?: string,
    folder_id?: number,
    owner_id: number,
    type: string,
    duration: number,
    url: string,
    size?: number,
    metadata: IMediaFileMetadata | null,
    created_at: string,
    updated_at: string
}

export interface IMediaPlaylist {
    id: number,
    name: string,
    folder_id: number,
    owner_id: number,
    description: string,
    total_duration: number,
    created_at: string,
    updated_at: string,
    media_files: IMediaFiles[],
}

export interface IMediaFileMetadata {
    original_name: string;
    size: number;
    mime_type: string;
    extension: string;
    entered_name: string;
}

export interface IAddFileToFolderApiProps {
    file: File | null;
    folder_id: number | '';
    name: string | '';
    duration: number | '';
    url: string | null;
}

export interface IAddPlaylistToFolderApiProps {
    name: string, 
    folder_id: number, 
    description: string,
    media_file_ids: number[] 
}

export interface IUpdateFileInFolderApiProps {
    name: string, 
    file_id: number, 
    duration: number,
    url: string 
}