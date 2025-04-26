
export interface ICustomTableHeader {
    title: string;
}

export type FileType = 'IMAGE' | 'VIDEO' | 'DOC' | 'WEB';
export type FolderStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';
export interface ICustomTableData {
    [key: string]: string | number | boolean | undefined | IMediaFolders | IMediaFiles[] | string[] | IMediaFolders[];
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
}

export interface IDropdownItems {
    name?: string;
    icon?: React.ReactNode;
    onClick?: (id?: number) => void;
}

export interface IMediaFiles {
    id: number;
    name: string,
    path: string,
    folder_id: number,
    owner_id: number,
    type: string,
    duration: number,
    url: string,
    metadata: [],
    created_at: string,
    updated_at: string
}


export interface IMediaPlaylist {
    id: string;
    name: string;
    files: IMediaFiles[];
    duration: string;
}