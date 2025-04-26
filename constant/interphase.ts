
export interface ICustomTableHeader {
    title: string;
}

export type FileType = 'IMAGE' | 'VIDEO' | 'DOC' | 'WEB';
export type FolderStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';
export interface ICustomTableData {
    [key: string]: string | number | boolean | undefined | IMediaFolders | IPlaylistFile[] | string[] | IMediaFolders[];
}

export interface IMediaFolders extends ICustomTableData {
    id: number;
    name: string;
    content: IPlaylistFile[];
    created_at: string;
    updated_at: string;
    is_system: number;
    owner_id: number;
    status: FolderStatus;
    shared: string[];
    parent_id?: number;
    children: IMediaFolders[];
}

export interface IDropdownItems {
    name?: string;
    icon?: React.ReactNode;
    onClick?: (id?: number) => void;
}

export interface IPlaylistFile {
    id: string;
    name: string;
    type: FileType
}


export interface IMediaPlaylist {
    id: string;
    name: string;
    files: IPlaylistFile[];
    duration: string;
}