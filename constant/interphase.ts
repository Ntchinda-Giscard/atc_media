
export interface ICustomTableHeader {
    title: string;
}

export interface ICustomTableData {
    [key: string]: string | number | boolean | undefined | IMediaFolders;
}

export interface IMediaFolders extends ICustomTableData {
    id: string;
    name: string;
    content: string;
    createdAt: string;
    items: number;
    shared: string;
}

export interface IDropdownItems {
    name?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export interface IPlaylistFile {
    id: string;
    name: string;
    type: 'VIDEO' | 'IMAGE' | 'WEB'
}


export interface IMediaPlaylist {
    id: string;
    name: string;
    files: IPlaylistFile[];
    duration: string;
}