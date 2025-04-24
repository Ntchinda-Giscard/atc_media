
export interface ICustomTableHeader {
    title: string;
}

export type FileType = 'IMAGE' | 'VIDEO' | 'DOC' | 'WEB';
export type FoderStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';
export interface ICustomTableData {
    [key: string]: string | number | boolean | undefined | IMediaFolders | IPlaylistFile[] | string[];
}

export interface IMediaFolders extends ICustomTableData {
    id: string;
    name: string;
    content: IPlaylistFile[];
    createdAt: string;
    status: FoderStatus;
    shared: string[];
}

export interface IDropdownItems {
    name?: string;
    icon?: React.ReactNode;
    onClick?: (id?: string) => void;
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